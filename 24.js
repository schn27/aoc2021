"use strict";

function calc() {
	const program = input.split('inp w').slice(1).map(e => e.match(/-?\d+/g).map(Number));

	const monad = (serial) => {
		let good = [];
		let z = 0;

		for (let i = 0; i < serial.length; ++i) {
			const x = (z % program[i][1]) + program[i][3];
			z = Math.floor(z / program[i][2]);

			if (program[i][2] > 1) {
				if (x >= 1 && x <= 9) {
					good.push(x);
				} else {
					return null;
				}
			} else {
				good.push(serial[i]);
			}

			if (x != good[i]) {
				z = z * (program[i][6] + program[i][7]) + good[i] + program[i][9];
			}
		}

		return z == 0 ? good : null;
	};

	const getSerial = (mode) => {
		const max = mode == 'max';
		const serial = program.map(e => e[2] > 1 ? 0 : (max ? 9 : 1));

		for (;;) {
			const good = monad(serial);

			if (good) {
				return good;
			}

			for (let i = serial.length - 1; i >= 0; --i) {
				if (serial[i] != 0) {
					if (max) {
						if (--serial[i] != 0) {
							break;
						}

						serial[i] = 9;

					} else {
						if (++serial[i] != 10) {
							break;
						}

						serial[i] = 1;
					}
				}
			}
		}
	};

	const part1 = getSerial('max').join('');
	const part2 = getSerial('min').join('');

	return part1 + ' ' + part2;
}

const input = `inp w
mul x 0
add x z
mod x 26
div z 1
add x 12
eql x w
eql x 0
mul y 0
add y 25
mul y x
add y 1
mul z y
mul y 0
add y w
add y 9
mul y x
add z y
inp w
mul x 0
add x z
mod x 26
div z 1
add x 12
eql x w
eql x 0
mul y 0
add y 25
mul y x
add y 1
mul z y
mul y 0
add y w
add y 4
mul y x
add z y
inp w
mul x 0
add x z
mod x 26
div z 1
add x 12
eql x w
eql x 0
mul y 0
add y 25
mul y x
add y 1
mul z y
mul y 0
add y w
add y 2
mul y x
add z y
inp w
mul x 0
add x z
mod x 26
div z 26
add x -9
eql x w
eql x 0
mul y 0
add y 25
mul y x
add y 1
mul z y
mul y 0
add y w
add y 5
mul y x
add z y
inp w
mul x 0
add x z
mod x 26
div z 26
add x -9
eql x w
eql x 0
mul y 0
add y 25
mul y x
add y 1
mul z y
mul y 0
add y w
add y 1
mul y x
add z y
inp w
mul x 0
add x z
mod x 26
div z 1
add x 14
eql x w
eql x 0
mul y 0
add y 25
mul y x
add y 1
mul z y
mul y 0
add y w
add y 6
mul y x
add z y
inp w
mul x 0
add x z
mod x 26
div z 1
add x 14
eql x w
eql x 0
mul y 0
add y 25
mul y x
add y 1
mul z y
mul y 0
add y w
add y 11
mul y x
add z y
inp w
mul x 0
add x z
mod x 26
div z 26
add x -10
eql x w
eql x 0
mul y 0
add y 25
mul y x
add y 1
mul z y
mul y 0
add y w
add y 15
mul y x
add z y
inp w
mul x 0
add x z
mod x 26
div z 1
add x 15
eql x w
eql x 0
mul y 0
add y 25
mul y x
add y 1
mul z y
mul y 0
add y w
add y 7
mul y x
add z y
inp w
mul x 0
add x z
mod x 26
div z 26
add x -2
eql x w
eql x 0
mul y 0
add y 25
mul y x
add y 1
mul z y
mul y 0
add y w
add y 12
mul y x
add z y
inp w
mul x 0
add x z
mod x 26
div z 1
add x 11
eql x w
eql x 0
mul y 0
add y 25
mul y x
add y 1
mul z y
mul y 0
add y w
add y 15
mul y x
add z y
inp w
mul x 0
add x z
mod x 26
div z 26
add x -15
eql x w
eql x 0
mul y 0
add y 25
mul y x
add y 1
mul z y
mul y 0
add y w
add y 9
mul y x
add z y
inp w
mul x 0
add x z
mod x 26
div z 26
add x -9
eql x w
eql x 0
mul y 0
add y 25
mul y x
add y 1
mul z y
mul y 0
add y w
add y 12
mul y x
add z y
inp w
mul x 0
add x z
mod x 26
div z 26
add x -3
eql x w
eql x 0
mul y 0
add y 25
mul y x
add y 1
mul z y
mul y 0
add y w
add y 12
mul y x
add z y`;
