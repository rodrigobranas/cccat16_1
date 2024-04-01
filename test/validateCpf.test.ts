import { validate } from "../src/validateCpf";

test.each([
	"97456321558",
	"71428793860",
	"87748248800"
])("Deve testar se o cpf é válido: %s", function (cpf: string) {
	const isValid = validate(cpf);
	expect(isValid).toBe(true);
});

test.each([
	"8774824880",
	null,
	undefined,
	"11111111111"
])("Deve testar se o cpf é inválido: %s", function (cpf: any) {
	const isValid = validate(cpf);
	expect(isValid).toBe(false);
});
