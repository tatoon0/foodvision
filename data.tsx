export interface productInfo {
    name: string;
    type: string;
  }
  
export const productData: { [barcode: string]: productInfo } = {
"2221234567895": {
    name: "바코드1",
    type: "음료",
},
"0036000291452": {
    name: "바코드2",
    type: "과자",
},
};
