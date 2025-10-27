export function onlyDigits(str: string) {
  return str.replace(/\D/g, "");
}

// Validação simples de CNPJ (algoritmo tradicional)
export function isValidCNPJ(cnpj: string) {
  cnpj = onlyDigits(cnpj);
  if (cnpj.length !== 14) return false;
  if (/^(\d)\1+$/.test(cnpj)) return false;

  const calc = (t: number) => {
    const slice = cnpj.slice(0, t);
    let sum = 0;
    let pos = t - 7;
    for (let i = t; i >= 1; i--) {
      sum += Number(slice[t - i]) * pos--;
      if (pos < 2) pos = 9;
    }
    const res = sum % 11;
    return res < 2 ? 0 : 11 - res;
  };

  const v1 = calc(12);
  const v2 = calc(13);
  return v1 === Number(cnpj[12]) && v2 === Number(cnpj[13]);
}
