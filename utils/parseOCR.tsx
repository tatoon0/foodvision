const parseOCRText = (text: string): ParsedData => {
  const preprocessedText = text.replace(/\s+/g, ' ').trim();

  const data: ParsedData = {
    영양정보: '정보 없음',
    보관방법: '정보 없음',
    알레르기정보: '정보 없음',
    식품유형: '정보 없음',
  };

  // 영양정보
  const nutritionMatch = preprocessedText.match(/(나트륨|탄수화물|당류|지방|트랜스지방|포화지방|콜레스테롤|단백질)\s([\d.]+(?:g|mg|%))\s?(\d+%?)/g);
  if (nutritionMatch) {
    data.영양정보 = nutritionMatch.map(item => {
      const parts = item.split(/\s+/);
      return { [parts[0]]: parts.slice(1).join(' ') };
    });
  }

  // 보관방법
  const storageMatch = preprocessedText.match(/(직사광선.*?보관|서들한 곳.*?진열)/);
  if (storageMatch) {
    data.보관방법 = storageMatch[0].trim();
  }

  // 알레르기정보
  const allergyMatch = preprocessedText.match(/(?:함유|알레르기).*?(밀|우유|대두|땅콩|계란|갑각류|아황산류)/g);
  if (allergyMatch) {
    data.알레르기정보 = allergyMatch.map(item => item.replace(/.*?(밀|우유|대두|땅콩|계란|갑각류|아황산류).*/, '$1')).join(', ');
  }

  // 식품유형
  const productTypeMatch = preprocessedText.match(/(식품유형|품유형|제품유형)[:：]?\s?(.+?)(\n|$)/);
  if (productTypeMatch) {
    data.식품유형 = productTypeMatch[2].trim().split(/[.|,|;]/)[0];
  }

  console.log('Parsed Data:', data);
  return data;
};





export default parseOCRText;