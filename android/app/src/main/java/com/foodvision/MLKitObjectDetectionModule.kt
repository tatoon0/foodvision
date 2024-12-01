package com.foodvision

import android.util.Log
import android.graphics.Bitmap
import android.graphics.BitmapFactory
import android.util.Base64
import com.facebook.react.bridge.*
import com.google.mlkit.vision.common.InputImage
import com.google.mlkit.vision.objects.ObjectDetection
import com.google.mlkit.vision.objects.ObjectDetector
import com.google.mlkit.vision.objects.defaults.ObjectDetectorOptions

class MLKitObjectDetectionModule(reactContext: ReactApplicationContext) :
    ReactContextBaseJavaModule(reactContext) {

    private val objectDetector: ObjectDetector

    init {
        Log.d("MLKitObjectDetection", "MLKitObjectDetectionModule initialized")
        val options = ObjectDetectorOptions.Builder()
            .setDetectorMode(ObjectDetectorOptions.SINGLE_IMAGE_MODE) // SINGLE_IMAGE_MODE 또는 STREAM_MODE 설정 가능
            .enableClassification()
            .build()

        objectDetector = ObjectDetection.getClient(options)
    }

    override fun getName(): String {
        return "MLKitObjectDetection"
    }

    @ReactMethod
    fun detectObjects(base64Image: String, promise: Promise) {
        try {
            Log.d("MLKitObjectDetection", "detectObjects called")

            val decodedBytes = Base64.decode(base64Image, Base64.DEFAULT)
            val bitmap = BitmapFactory.decodeByteArray(decodedBytes, 0, decodedBytes.size)
            Log.d("MLKitObjectDetection", "Bitmap created successfully")

            val resizedBitmap = Bitmap.createScaledBitmap(bitmap, 640, 480, true)
            Log.d("MLKitObjectDetection", "Bitmap resized to 640x480")

            val image = InputImage.fromBitmap(resizedBitmap, 0)
            Log.d("MLKitObjectDetection", "InputImage created successfully")

            objectDetector.process(image)
                .addOnSuccessListener { detectedObjects ->
                    Log.d("MLKitObjectDetection", "Object detection succeeded")

                    // React Native가 처리할 수 있도록 WritableArray로 변환
                    val resultArray: WritableArray = Arguments.createArray()
                    detectedObjects.forEach { obj ->
                        val objMap: WritableMap = Arguments.createMap()

                        // Bounding box
                        val boundingBox = Arguments.createMap()
                        boundingBox.putInt("left", obj.boundingBox.left)
                        boundingBox.putInt("top", obj.boundingBox.top)
                        boundingBox.putInt("right", obj.boundingBox.right)
                        boundingBox.putInt("bottom", obj.boundingBox.bottom)
                        objMap.putMap("boundingBox", boundingBox)

                        // Tracking ID
                        objMap.putString("trackingId", obj.trackingId?.toString() ?: "N/A")

                        // Labels
                        val labelsArray: WritableArray = Arguments.createArray()
                        obj.labels.forEach { label ->
                            val labelMap: WritableMap = Arguments.createMap()
                            labelMap.putString("text", label.text)
                            labelMap.putDouble("confidence", label.confidence.toDouble())
                            labelsArray.pushMap(labelMap)
                        }
                        objMap.putArray("labels", labelsArray)

                        resultArray.pushMap(objMap)
                    }

                    // 결과를 Promise로 반환
                    promise.resolve(resultArray)
                }
                .addOnFailureListener { e ->
                    Log.e("MLKitObjectDetection", "Object detection failed", e)
                    promise.reject("DetectionError", e)
                }
        } catch (e: Exception) {
            Log.e("MLKitObjectDetection", "Processing error", e)
            promise.reject("ProcessingError", e)
        }
    }
}
