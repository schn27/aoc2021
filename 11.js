"use strict";

function calc() {
	const map = input.split('\n').map(e => e.split('').map(Number));

	let part1 = 0;
	let part2 = 0;

	for (let step = 1;; ++step) {
		map.forEach((r, y) => r.forEach((_, x) => ++map[y][x]));

		for (let any = true; any;) {
			any = false;

			map.forEach((r, y) => r.forEach((c, x) => {
				if (c >= 10) {
					any = true;
					map[y][x] = 0;

					const neighbors = [
						[y - 1, x - 1], [y - 1, x], [y - 1, x + 1],
						[y, x - 1], [y, x + 1],
						[y + 1, x - 1], [y + 1, x], [y + 1, x + 1]];

					neighbors.filter(yx => (map[yx[0]] || [])[yx[1]] > 0)
						.forEach(yx => ++map[yx[0]][yx[1]]);
				}
			}));
		}

		if (step <= 100) {
			part1 += map.flatMap(e => e).filter(e => !e).length;
		}

		if (map.flatMap(e => e).filter(e => e).length == 0) {
			part2 = step;
			break;
		}
	}

	return part1 + ' ' + part2;
}

const input = `4871252763
8533428173
7182186813
2128441541
3722272272
8751683443
3135571153
5816321572
2651347271
7788154252`;
