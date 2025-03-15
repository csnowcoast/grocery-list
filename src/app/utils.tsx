export function validatePrice(price: string) {
    let validPrice = parseFloat(price);
    if(Number.isNaN(validPrice)) {
      validPrice = 0;
    }
    return validPrice;
};
  
export function validateText(text: string) {
    let validText = text;
    if(text.length > 50) {
      validText = "";
    }
    return validText;
};