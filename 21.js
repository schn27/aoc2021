"use strict";

function calc() {
	const positions = input.split('\n').map(e => e.match(/\d+/g).map(Number)[1] - 1);

	const part1 = getPart1([...positions]);
	const part2 = Math.max(...getPart2([...positions]));

	return part1 + ' ' + part2;
}

function getPart1(pos) {
	const score = pos.map(e => 0);
	let dice = 1;

	for (let i = 0; Math.max(...score) < 1000; ++i) {
		i = i % pos.length;
		pos[i] += 3 * dice + 3;
		dice += 3;
		score[i] += (pos[i] % 10) + 1;
	}

	return (dice - 1) * Math.min(...score);
}

function getPart2(pos, score = pos.map(e => 0), turn = 0, paths = 1) {
	const combinations = [
		[3, 1],
		[4, 3],
		[5, 6],
		[6, 7],
		[7, 6],
		[8, 3],
		[9, 1]
	];

	let wins = pos.map(e => 0);

	const newTurn = (turn + 1) % pos.length;

	combinations.forEach(([steps, forks]) => {
		const newPaths = paths * forks;

		const newPos = [...pos];
		const newScore = [...score];

		newPos[turn] = (newPos[turn] + steps) % 10;
		newScore[turn] += newPos[turn] + 1;

		if (newScore[turn] >= 21) {
			wins[turn] += newPaths;
		} else {
			const newWins = getPart2(newPos, newScore, newTurn, newPaths);
			wins = wins.map((w, i) => w + newWins[i]);
		}
	});

	return wins;
}

const input = `Player 1 starting position: 4
Player 2 starting position: 10`;
