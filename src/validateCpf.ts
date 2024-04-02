const FACTOR_FIRST_DIGIT = 10;
const FACTOR_SECOND_DIGIT = 11;

export function validate (rawCpf: string) {
	if (!rawCpf) return false;
	const cpf = removeNonDigits(rawCpf);
	if (!isValidLength(cpf)) return false;
	if (allDigitsEqual(cpf)) return false;
	const firstDigit = calculateDigit(cpf, FACTOR_FIRST_DIGIT);
	const secondDigit = calculateDigit(cpf, FACTOR_SECOND_DIGIT);
	return extractDigit(cpf) === `${firstDigit}${secondDigit}`;
}

function removeNonDigits (cpf: string) {
	return cpf.replace(/\D/g,"");
}

function isValidLength (cpf: string) {
	return cpf.length === 11;
}

function allDigitsEqual (cpf: string) {
	const [firstDigit] = cpf;
	return cpf.split("").every(digit => digit === firstDigit);
}

function calculateDigit (cpf: string, factor: number) {
	let total = 0;
	for (const digit of cpf) {
		if (factor > 1) total += parseInt(digit) * factor--;
	}
	const remainder = total%11;
	return (remainder < 2) ? 0 : 11 - remainder;
}

function extractDigit (cpf: string) {
	return cpf.slice(9);
}
