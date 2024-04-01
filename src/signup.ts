import crypto from "crypto";
import pgp from "pg-promise";
import { validate } from "./validateCpf";

export async function signup (input: any): Promise<any> {
	const connection = pgp()("postgres://postgres:123456@localhost:5432/app");
	try {
		const id = crypto.randomUUID();

		const [acc] = await connection.query("select * from cccat15.account where email = $1", [input.email]);
		if (!acc) {

			if (input.name.match(/[a-zA-Z] [a-zA-Z]+/)) {
				if (input.email.match(/^(.+)@(.+)$/)) {

					if (validate(input.cpf)) {
						if (input.isDriver) {
							if (input.carPlate.match(/[A-Z]{3}[0-9]{4}/)) {
								await connection.query("insert into cccat15.account (account_id, name, email, cpf, car_plate, is_passenger, is_driver) values ($1, $2, $3, $4, $5, $6, $7)", [id, input.name, input.email, input.cpf, input.carPlate, !!input.isPassenger, !!input.isDriver]);
								
								const obj = {
									accountId: id
								};
								return obj;
							} else {
								// invalid car plate
								return -5;
							}
						} else {
							await connection.query("insert into cccat15.account (account_id, name, email, cpf, car_plate, is_passenger, is_driver) values ($1, $2, $3, $4, $5, $6, $7)", [id, input.name, input.email, input.cpf, input.carPlate, !!input.isPassenger, !!input.isDriver]);

							const obj = {
								accountId: id
							};
							return obj;
						}
					} else {
						// invalid cpf
						return -1;
					}
				} else {
					// invalid email
					return -2;
				}

			} else {
				// invalid name
				return -3;
			}

		} else {
			// already exists
			return -4;
		}

	} finally {
		await connection.$pool.end();
	}
}
