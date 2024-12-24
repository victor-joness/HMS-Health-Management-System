const stringMask = {
    phone: /^\(\d{2}\) \d{4}-\d{4}$/,
    cellphone: /^\(\d{2}\) \d{5}-\d{4}$/,
    cnpj: /^\d{14}$/,
    cpf: /^\d{11}$/,
    cep: /^\d{8}$/,
    cnpjWithMask: /^\d{2}\.\d{3}\.\d{3}\/\d{4}-\d{2}$/,
    cpfWithMask: /^\d{3}\.\d{3}\.\d{3}-\d{2}$/,
    cepWithMask: /^\d{5}-\d{3}$/,
    date: /^\d{2}\/\d{2}\/\d{4}$/,
    time: /^\d{2}:\d{2}:\d{2}$/,
    dateTime: /^\d{2}\/\d{2}\/\d{4} \d{2}:\d{2}:\d{2}$/
};

type StringMaskType = keyof typeof stringMask;

export const MaskValidation = (value: string, mask: StringMaskType): boolean => {
    const regex = stringMask[mask];
    return regex.test(value);
}