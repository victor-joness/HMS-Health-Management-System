/* 
    const phoneMask = '(99) 99999-9999';
    const cpfMask = '999.999.999-99';
    */

export const MaskValidation = (value: string, mask: string): string => {
  // Remove qualquer caractere não numérico
  const numbers = value.replace(/\D/g, '')
  let maskedValue = ''
  let maskIndex = 0
  let numberIndex = 0

  // Loop para aplicar a máscara
  while (maskIndex < mask.length && numberIndex < numbers.length) {
    const maskChar = mask[maskIndex]

    // Verifica se o caractere da máscara é um placeholder (no caso '9' para números)
    if (maskChar === '9') {
      maskedValue += numbers[numberIndex] // Adiciona o número à máscara
      numberIndex++ // Avança para o próximo número
    } else {
      maskedValue += maskChar // Adiciona o caractere literal da máscara (exemplo: "(" ou "-")
    }

    maskIndex++ // Avança na máscara
  }

  return maskedValue
}
