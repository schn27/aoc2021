"use strict";

function calc() {
	const target = input.match(/-?\d+/g).map(Number);

	// non brute force for part1
	// const vy = Math.abs(target[2]) - 1;
	// const part1 = (vy * vy + vy) / 2;

	let part1 = 0;
	let part2 = 0;

	for (let vx = 1; vx < target[1] + 1; ++vx) {
		for (let vy = target[2]; vy < Math.abs(target[2]); ++vy) {
			const top = simulate([vx, vy], target);
			if (top != undefined) {
				part1 = Math.max(part1, top);
				++part2;
			}
		}
	}

	return part1 + ' ' + part2;
}

function simulate(v, target) {
	let [x, y] = [0, 0];
	let [vx, vy] = v;

	let maxY = y;

	while (vy >= target[2]) {
		x += vx;
		y += vy;
		vx = vx > 0 ? vx - 1 : 0;
		vy -= 1;

		maxY = Math.max(y, maxY);

		if (x >= target[0] && x <= target[1] && y >= target[2] && y <= target[3]) {
			return maxY;
		}
	}

	return undefined;
}

const input = `target area: x=265..287, y=-103..-58`;
