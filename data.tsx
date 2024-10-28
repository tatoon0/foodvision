export interface productInfo {
    // 기본정보 : 제품명, 상품분류명, 식품유형, 제조사, 유통사
    basicInfo: {
        name: string,
        category: string,
        type: string,
        manufacturer: string,
        distributor: string,
    },
    // 상세정보 : 포장단위, 제품용량, 조리방법, 조리 시 주의사항, 제품특징
    detailedInfo: {
        packagingUnit: string,
        capacity: string,
        cookingInstructions?: string,
        cookingcaution?: string,
        features?: string,
    },
    // 영양정보 : 원재료, 영양성분, 알레르기, 제조시설알레르기
    nutritionInfo: {
        ingredients: string,
        nutritionalContent: string,
        allergens?: string,
        manufacturingAllergens: string,
    },
    // 기타정보 : 제조국, 재활용, 보관방법, 주의사항, 연락처
    additionalInfo: {
        countryOfManufacture: string,
        recyclingInstructions: string,
        storageInstructions: string,
        caution: string,
        contactNumber: string,
    }
}
    
  
export const productData: { [barcode: string]: productInfo } = {
"8809111699897": {
    basicInfo: {
        name: "황성주 박사의 국산콩 두유 검은콩 고칼슘",
        category: "두유",
        type: "가공두유",
        manufacturer: "한미사이언스",
        distributor: "이롬",
    },
    detailedInfo: {
        packagingUnit: "단일",
        capacity: "190ml",
    },
    nutritionInfo: {
        ingredients: "원액두유70%(대두-국산,두류고형분7%), 정제수, 갈색설탕, 옥배유(스페인산), 메이플시럽혼합페이스트, 검은콩추출물0.4%(검은콩-국산,고형분30%), 해조분말0.35%(칼슘 함량 32% 이상, 영국산), 천일염, 대두레시틴, 견과혼합페이스트(땅콩, 호두, 잣), 향료, 흑미추출물, 호밀농축액, 검은참깨페이스트, 카라기난, 미배아추출물, 탄산수소나트륨",
        nutritionalContent: "열량 105kcal, 나트륨 160mg, 탄수화물 10g, 당류 8g, 지방 5.5g, 트랜스지방 0g, 포화지방 0.8g, 콜레스테롤 0mg, 단백질 4g, 칼슘 200mg",
        allergens: "대두, 땅콩, 호두, 잣 함유",
        manufacturingAllergens: "토마토, 메밀, 밀, 우유",
    },
    additionalInfo: {
        countryOfManufacture: "국산",
        recyclingInstructions: "멸균팩",
        storageInstructions: "직사광선을 피해 서늘한 곳에 보관하십시오",
        caution: "용기가 변형, 팽창, 손상되었거나 내용물에 이상이 있을 경우 섭취하지 마십시오. 개봉 후에는 바로 섭취하시기 바랍니다. 원료성분이 뜨거나 가라앉을 수 있으니 잘 흔들어 드십시오. 전자레인지에 직접 가열하지 마십시오.",
        contactNumber: "080-345-1111",
    }
},
"8801043014809": {
    basicInfo: {
        name: "신라면 봉지라면",
        category: "봉지라면",
        type: "유탕면",
        manufacturer: "농심",
        distributor: "농심",
    },
    detailedInfo: {
        packagingUnit: "단일",
        capacity: "120g",
        cookingInstructions: "물 500ml(3컵정도)를 끓인 후, 면과 분말스프, 후레이크를 같이 넣고 4분 30초간 더 끓이면 얼큰한 소고기국물 맛의 신라면이 됩니다.",
        cookingcaution: "나트륨(식염)섭취를 조절하기 위하여 기호에 따라 적정량의 스프를 첨가하여 조리하십시오. 조리 시 안전사고에 주의하세요. 끓는 물에 스프를 먼저 넣을 시 끓어오름 현상으로 화상의 위험이 있으니 면을 먼저 넣고 조리하세요.",
    },
    nutritionInfo: {
        ingredients: "면/소맥분(밀:미국산, 호주산), 감자전분(독일산), 팜유(말레이시아산), 변성전분, 난각칼슘, 정제소금, 야채조미추출물, 면류첨가알칼리제(탄산칼륨, 탄산나트륨, 제이인산나트륨), 혼합제제(메타인산나트륨, 폴리인산나트륨, 제일인산나트륨, 피로인산나트륨), 올리고녹차풍미액, 비타민B2. 스프류/소고기맛베이스, 정제소금, 매콤양념분말, 간장양념분말, 설탕, 조미아미노산간장분말, 볶음양념분, 조미소고기분말, 후추가루, 마늘베이스, 간장분말, 조미양념분, 조미홍고추분말, 5'-리보뉴클레오티드이나트륨, 매운맛조미분, 호박산이나트륨, 대두단백, 건파, 건청경채, 건표고버섯, 건당근, 건고추, 고추맛후레이크",
        nutritionalContent: "열량 500kcal, 나트륨 1790mg, 탄수화물 79g, 당류 4g, 지방 16g, 트랜스지방 0g, 포화지방 8g, 콜레스테롤 0mg, 단백질 10g, 칼슘 143mg",
        allergens: "밀, 대두, 돼지고기, 계란, 쇠고기 함유",
        manufacturingAllergens: "우유, 메밀, 땅콩, 고등어, 게, 새우, 토마토, 호두, 닭고기, 오징어, 잣, 조개류(굴, 전복, 홍합 포함)",
    },
    additionalInfo: {
        countryOfManufacture: "국산",
        recyclingInstructions: "비닐류",
        storageInstructions: "직사광선을 피하고 서늘하고 건조한 곳에 보관하십시오.",
        caution: "농산물 원료를 주로 사용하여 벌레의 영향을 받기 쉬우니 포장이 파손되지 않도록 보관에 유의해 주시고 개봉 후에는 즉시 조리해 드십시오.",
        contactNumber: "080-023-5181",
    }
},
"8801047111849": {
    basicInfo: {
        name: "동원참치 살코기",
        category: "참치",
        type: "기타 수산물가공품",
        manufacturer: "동원",
        distributor: "동원"
    },
    detailedInfo: {
        packagingUnit: "단일",
        capacity: "150g",
    },
    nutritionInfo: {
        ingredients: "가다랑어79%(원양산), 카놀라유(외국산:캐나다, 호주, 이탈리아 등), 정제수, 야채즙{양파(국산), 당근(국산)}",
        nutritionalContent: "나트륨 615mg, 탄수화물 0g, 당류 0g, 지방 23g, 트랜스지방 0g, 포화지방 2g, 콜레스테롤 68mg, 단백질 29g",
        manufacturingAllergens: "쇠고기, 닭고기, 돼지고기, 우유, 호두, 토마토, 대두, 밀, 게, 조개류(굴, 홍합 포함)",
    },
    additionalInfo: {
        countryOfManufacture: "국산",
        recyclingInstructions: "캔류",
        storageInstructions: "서늘한 곳에 보관하고 개봉 후에는 변질의 우려가 있으니 바로 드시기 바랍니다.",
        caution: "캔 절단 부분이 날카로우므로 개봉, 보관 및 폐기시 주의하십시오. 유통 중 개봉부위에 흠이 생겨 변질된 제품은 즉시 교환하여 주시기 바랍니다. 제품 특성상 참치 껍질이나 뼈가 들어갈 수 있으니 주의하여 드시기 바랍니다.",
        contactNumber: "080-589-3223, 080-589-3224"
    }
}
};
