function extractDigit (cpf: string, factor: number) {
	let total = 0;
	for (const digit of cpf) {
		if (factor > 1) total += parseInt(digit) * factor--;
	}
	const rest = total%11;
	return (rest < 2) ? 0 : 11 - rest;
}

export function validate (cpf: string) {
	if (!cpf) return false;
	cpf=cpf.replace('.','').replace('.','').replace('-','').replace(" ","");  
	if (cpf.length !== 11) return false;
	if (cpf.split("").every(c => c === cpf[0])) return false; 
	const dg1 = extractDigit(cpf, 10);
	const dg2 = extractDigit(cpf, 11);
	let nDigVerific = cpf.slice(9);
	const nDigResult = `${dg1}${dg2}`;  
	return nDigVerific == nDigResult;
}
