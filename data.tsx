export interface productInfo {
    // 기본정보 : 제품명, 상품분류명, 식품유형, 제조사, 유통사
    basicInfo: {
        name: string,
        category: string,
        type: string,
        manufacturer: string,
        distributor: string,
    },
    // 상세정보 : 포장단위, 제품용량, 조리방법, 조리 시 주의사항, 제품특징, 알콜도수
    detailedInfo: {
        packagingUnit: string,
        capacity: string,
        cookingInstructions?: string,
        cookingcaution?: string,
        features?: string,
        abv? : string,
    },
    // 영양정보 : 원재료, 영양성분, 알레르기, 제조시설알레르기
    nutritionInfo: {
        ingredients: string,
        nutritionalContent?: string,
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
        manufacturingAllergens: "토마토, 메밀, 밀, 우유 혼입가능",
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
        name: "신라면",
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
        manufacturingAllergens: "우유, 메밀, 땅콩, 고등어, 게, 새우, 토마토, 호두, 닭고기, 오징어, 잣, 조개류(굴, 전복, 홍합 포함) 혼입가능",
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
        manufacturingAllergens: "쇠고기, 닭고기, 돼지고기, 우유, 호두, 토마토, 대두, 밀, 게, 조개류(굴, 홍합 포함) 혼입가능",
    },
    additionalInfo: {
        countryOfManufacture: "국산",
        recyclingInstructions: "캔류",
        storageInstructions: "서늘한 곳에 보관하고 개봉 후에는 변질의 우려가 있으니 바로 드시기 바랍니다.",
        caution: "캔 절단 부분이 날카로우므로 개봉, 보관 및 폐기시 주의하십시오. 유통 중 개봉부위에 흠이 생겨 변질된 제품은 즉시 교환하여 주시기 바랍니다. 제품 특성상 참치 껍질이나 뼈가 들어갈 수 있으니 주의하여 드시기 바랍니다.",
        contactNumber: "080-589-3223, 080-589-3224"
    }
},
"8809813750322": {
    basicInfo: {
        name: "빽쿡 빽라면",
        category: "봉지라면",
        type: "유탕면",
        manufacturer: "팔도",
        distributor: "더본코리아"
    },
    detailedInfo: {
        packagingUnit: "단일",
        capacity: "115g",
        cookingInstructions: "물 500ml를 끓인 후, 면과 분말 스프, 건더기스프를 넣고 3분 30초간 더 끓이면 매콤하고 진한 빽라면이 완성됩니다.",
        cookingcaution: "나트륨(식염, 조미료 등) 섭취를 조절하기 위하여 기호에 따라 적정량의 분말스프를 넣어 드십시오.",
    },
    nutritionInfo: {
        ingredients: "면: 소맥분(밀:미국산, 호주산), 팜유(말레이시아산), 감자전분(덴마크산, 독일산), 변성전분, 정제소금, 글루텐, 감미유S, 마늘시즈닝분말, 면류첨가알칼리제(탄산칼륨, 탄산나르륨, 피로인산나트륨), 시즈닝조미액, 구아검, 혼합제제(폴리인산나트륨, 메타인산나트륨, 메타인산칼륨), 녹차풍미액, 비타민B2 / 스프:정제소금, L-글루탐산나트륨(향미증진제), 계란후레이크, 설탕, 고춧가루, 건파, 감칫말베이스, 쇠고기맛분, 장육베이스, 조미분에이, 간장조미분말, 조미양념분, 육수풍미분말, 치킨스톡분말, 고추장양념분말, 사골설렁탕분말, 쇠고기조미분말, 고추입자, 건미역, 우마미베이스, 매운조미고추맛분, 풍미베이스, 매운맛베이스, 흑후추분말, 파프리카추출색소, 향미증진제2종, 산도조절제, 조미맛분, 매운양념분말",
        nutritionalContent: "열량 485kcal, 나트륨 1790mg, 탄수화물 77g, 당류 4g, 지방 15g, 트랜스지방 0g, 포화지망 8g, 콜레스테롤 2mg, 단백질 10g",
        allergens: "계란, 우유, 대두, 밀, 돼지고기, 닭고기, 쇠고기 함유",
        manufacturingAllergens: "메밀, 땅콩, 게, 새우, 복숭아, 토마토, 오징어, 조개류(굴, 홍합 포함) 혼입가능"
    },
    additionalInfo: {
        countryOfManufacture: "국산",
        recyclingInstructions: "비닐류",
        storageInstructions: "직사광선을 피하고 서늘하고 건조한 곳에 보관하십시오.",
        caution: "소비기한이 지난 제품은 드시지 마십시오. 어린이 취급주의. 조리시, 취식시 국물이 뜨거우니 화상에 주의하십시오. 본 제품은 농산물 원료를 사용하여 벌레의 영향을 받기 쉬우니 보관에 유의해 주시고, 개봉후에는 즉시 조리해 드십시오. 생산 공정상 개별 건더기 중량의 편차가 있을 수 있습니다.",
        contactNumber: "070-4192-3888"
    }
},
"8801105911299": {
    basicInfo: {
        name: "포도 봉봉",
        category: "혼합주스음료",
        type: "과채음료",
        manufacturer: "해태",
        distributor: "해태"
    },
    detailedInfo: {
        packagingUnit: "단일",
        capacity: "340ml",
    },
    nutritionInfo: {
        ingredients: "정제수, 당시럽, 포도과립5%(중국산), 포도농축액0.8167%(이탈리안산, 배합합량:포도99.9%, 포도과즙으로 환원기준 5%),구연산, 합성향료(포도향), 구연산삼나트륨, 비타민C",
        nutritionalContent: "열량 180kcal, 나트륨 60mg, 탄수화물 45g, 당류 45g, 지방 0g, 트랜스지방 0g, 포화지방 0g, 콜레스테롤 0mg, 단백질 0g",
        manufacturingAllergens: "우유, 대두, 복숭아, 토마토, 메밀, 땅콩, 밀, 아황산류",
    },
    additionalInfo: {
        countryOfManufacture: "국산",
        recyclingInstructions: "캔류",
        storageInstructions: "직사광선을 피하고 서늘한 곳에 얼지 않게 보관하십시오.",
        caution: "용기가 변형, 팽창, 손상되었거나 내용물이 변질되었을 경우 음용하지 마십시오. 개봉 후에는 반드시 냉장 보관하시고 빨리 드시기 바랍니다. 제품 고유성분으로 인해 침전물이나 부유물이 생길 수 있으나 품질에는 이상이 없으니 안심하고 드십시오.",
        contactNumber: "080-023-3449"
    }
},
"8801119240415" : {
    basicInfo: {
        name: "필라이트",
        category: "기타주류",
        type: "기타주류",
        manufacturer: "하이트진로",
        distributor: "하이트진로",
    },
    detailedInfo: {
        packagingUnit: "단일",
        capacity: "355ml",
        abv: "4.5%",
    },
    nutritionInfo: {
        ingredients: "정제수, 전분(외국산(러시아, 헝가리, 세르비아 등)), 보리(호주산), 맥아(외국산(독일, 호주, 덴마크 등)), 효모추출물, 호프펠렛, 이산화탄소, 효소제 7종, 산도조절제 2종, 비타민C, 영양강화제",
        manufacturingAllergens: "대두 혼입가능",
    },
    additionalInfo: {
        countryOfManufacture: "국산",
        recyclingInstructions: "캔류",
        storageInstructions: "결빙, 충격, 직사광선 피하여 취급",
        caution: "지나친 음주는 뇌졸중, 기억력 손상이나 치매를 유발합니다. 임신 중 음주는 기형아 출생 위험을 높입니다. 19세 미만 청소년에게 판매금지.",
        contactNumber: "080-210-0150",
    }
},
"270003885995021401": {
    basicInfo: {
        name: "삼각)전주비빔",
        category: "즉석식품류",
        type: "즉석섭취식품",
        manufacturer: "후레쉬퍼스트",
        distributor: "GS25",
    },
    detailedInfo: {
        packagingUnit: "단일",
        capacity: "107g",
        cookingInstructions: "1000W 20초, 700W 30초",
    },
    nutritionInfo: {
        ingredients: "쌀, 소스1(고추장, 절임식품, 콩기름, 양조간장, 설탕), 소스2(고추장, D-소비톨액, 돼지고기, 설탕, 혼합간장), 분쇄가공육제품, 콩나물, 김치, 도라지, 콩기름, 참기름, 시금치, 조미김, 당근, 볶음참깨, 설탕, 소스3, 마늘, 소스4, 정제소금, 복합조미식품, 정제수",
        nutritionalContent: "열량 138kcal, 나트륨 596mg, 탄수화물 18g, 당류 4g, 지방 6g, 트랜스지방 0g, 포화지방 0.8g, 콜레스테롤 0mg, 단백질 3g",
        allergens: "우유, 대두, 밀, 새우, 돼지고기, 닭고기, 쇠고기, 조개류(굴) 함유",
        manufacturingAllergens: "알류, 메밀, 땅콩, 고등어, 게, 복숭아, 토마토, 아황산류, 호두, 오징어, 조개류(전복, 홍합포함), 잣 혼입가능)",
    },
    additionalInfo: {
        countryOfManufacture: "국산",
        recyclingInstructions: "비닐류",
        storageInstructions: "냉장보관",
        caution: "구입후 즉시 드세요",
        contactNumber: "1566-1305"
    }
},
"8801117694906": {
    basicInfo: {
        name: "꼬북칩 초코츄러스맛",
        category: "스낵",
        type: "과자(유탕처리제품)",
        manufacturer: "오리온",
        distributor: "오리온",
    },
    detailedInfo: {
        packagingUnit: "단일",
        capacity: "80g",
    },
    nutritionInfo: {
        ingredients: "밀가루(미국산), 다이제초콜릿[백설탕, 식물성유지(말레이시아산), 코코아프리퍼레이션(프랑스산), 코코아매스, 초코크럼], 츄러스맛시즈닝[백설탕, 빵가루(미국산, 캐나다산), 포도당, 코코아분말(네덜란드산), 가공소금], 식물성유지1, 백설탕, 코코아분말2, 빵가루, 식염, 코코아분말2, 곡류가공품, 식물성유지2, 언하이드로밀크팻",
        nutritionalContent: "426 kcal, 나트륨 200mg, 탄수화물 52g, 당류 9g, 지방 8g, 트랜스지방 0g, 포화지방 5g, 콜레스테롤 5mg미만, 단백질 2g",
        allergens: "밀, 우유, 대두 함유",
        manufacturingAllergens: "달걀, 땅콩, 호두, 복숭아, 토마토, 돼지고기, 쇠고기 ,닭고기, 오징어, 새우, 게, 고등어, 조개류(굴, 홍합) 혼입가능",
    },
    additionalInfo: {
        countryOfManufacture: "국산",
        recyclingInstructions: "비닐류",
        storageInstructions: "직사광선을 피해 온습도가 낮은 곳에 보관",
        caution: "개봉 후 가급적 빨리 드세요",
        contactNumber: "080-023-5700"
    },
},
"8801043071253" : {
    basicInfo: {
        name: "포테토칩 먹태청양마요맛",
        category: "스낵",
        type: "과자(유탕처리제품)",
        manufacturer: "농심",
        distributor: "농심",
    },
    detailedInfo: {
        packagingUnit: "단일",
        capacity: "50g",
    },
    nutritionInfo: {
        ingredients: "생감자(국산), 카놀라유(호주산), 팜유(말레이시아산), 먹태청양마요맛시즈닝",
        nutritionalContent: "열량 280kcal, 나트륨 270mg, 탄수화물 27g, 당류 2g, 지방 18g, 트랜스지방 0g, 포화지방 6g, 콜레스테롤 5mg미만, 단백질 3.1g",
        allergens: "대두, 밀, 우유, 쇠고기, 새우 함유",
        manufacturingAllergens: "계란, 땅콩, 잣, 게, 오징어, 돼지고기, 토마토, 닭고기, 조개류(굴, 전복, 홍합 포함) 혼입가능",
    },
    additionalInfo: {
        countryOfManufacture: "국산",
        recyclingInstructions: "비닐류",
        storageInstructions: "직사광선을 피하고 서늘하고 건조한 곳에 보관하십시오.",
        caution: "개봉 후 바로 드십시오. 간혹 제품에 보이는 짙은 갈색이나 검은색 부분은 원료의 일부분으로 인체에 무해하오니 안심하고 드셔도 됩니다. 초록색 입자는 파슬리입니다.",
        contactNumber: "080-023-5181"
    },
},
"8801128503211": {
    basicInfo: {
        name: "팔도 왕뚜껑",
        category: "용기라면",
        type: "유탕면",
        manufacturer: "팔도",
        distributor: "팔도",
    },
    detailedInfo: {
        packagingUnit: "단일",
        capacity: "110g",
        cookingInstructions: "1. 뚜껑을 열고 면 위에 분말스프, 건더기스프를 넣고 끓는 물을 용기 안쪽 표시선까지 붓습니다. 2. 뚜껑을 닫고 약 3분간 기다린 후 잘 저어 드십시오.",
        cookingcaution: "나트륨(식염 등) 섭취를 조절하기 위하여 기호에 따라 적정량의 스프를 넣어 드십시오.",
    },
    nutritionInfo: {
        ingredients: "면:소맥분(밀:미국산, 호주산), 팜유(말레이시아산), 변성전분, 감자전분(덴마크산, 독일산), 감미유S, 정제소금, 글루텐, 야채풍미액, 면류첨가알칼리제(탄산칼륨, 탄산나트륨, 피로인산나트륨), 구아검, 혼합제제(폴리인산나트륨, 메타인산나트륨, 메타인산칼륨), 알긴산프로필렌글리콜, 녹차풍미액, 비타민B2 / 스프:정제소금, 소고기맛조미후레이크, 설탕, 고춧가루, 건당근, 맛베이스, 볶음소금, 간장조미분말, 복합간장조미분말, 건청경채, 쇠고기맛분, 핫베이스분말, 계란지단, 양념간장액분말, 조미분에이, 매운양념분말, 건파, 돈골농축분말, 포도당, 고풍미쇠고기맛분말, 다대기베이스분, 매운탕분말, 사골엑기스분말, 쇠고기엑기스분말, 진국쇠고기분말, 감칠맛베이스, 세이보리분말, 향미증진제2종, 감칫맛조미분, 우마미베이스, 건홍피망, 흑후추분말, 건표고버섯, 산도조절제, 파프리카추출색소, 생강풍미분말, 혼합제제(잔탄검, 덱스트린)",
        nutritionalContent: "열량 515kcal, 나트륨 1690mg, 탄수화물 73g, 당류 3g, 지방 21g, 트랜스지방 0g, 포화지방 11g, 콜레스테롤 2mg, 단백질 8g",
        allergens: "계란, 우유, 대두, 밀, 돼지고기, 닭고기, 쇠고기, 오징어 함유",
        manufacturingAllergens: "메밀, 땅콩, 게, 새우, 복숭아, 토마토, 조개류(굴, 홍합 포함) 혼입가능",
    },
    additionalInfo: {
        countryOfManufacture: "국산",
        recyclingInstructions: "포장재-비닐류, 뚜껑 및 용기-플라스틱류",
        storageInstructions: "고온, 직사광선을 피하고 서늘하고 건조한 곳에 보관하십시오",
        caution: "어린이 취급 주의. 조리시, 시식시 국물이 뜨거우니 화상에 주의하십시오. 본 제품은 농산물 원료를 주로 사용하여 벌레의 영향을 받기 쉬우니 포장이 파손되지 않도록 보관에 유의해주시고, 개봉 후에는 즉시 조리해 드십시오.",
        contactNumber: "080-023-8593"
    }
}
}