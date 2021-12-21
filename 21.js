"use strict";

function calc() {
	const players = input.split('\n').map(e => e.match(/\d+/g).map(Number)[1]);

	const part1 = getPart1(players);

	const part2 = Math.max(...getPart2({
		pos: players.map(e => e - 1),
		score: players.map(e => 0),
		paths: 1,
		turn: 0
	}));

	return part1 + ' ' + part2;
}

function getPart1(players) {
	const pos = players.map(e => e - 1);
	const score = players.map(e => 0);
	let dice = 1;

	for (let i = 0; Math.max(...score) < 1000; ++i) {
		i = i % players.length;
		pos[i] += 3 * dice + 3;
		dice += 3;
		score[i] += (pos[i] % 10) + 1;
	}

	return (dice - 1) * Math.min(...score);
}

function getPart2(state) {
	const combinations = [
		[3, 1],
		[4, 3],
		[5, 6],
		[6, 7],
		[7, 6],
		[8, 3],
		[9, 1]
	];

	const wins = state.pos.map(e => 0);

	const player = state.turn % state.pos.length;

	combinations.forEach(c => {
		const newState = {
			pos: [...state.pos],
			score: [...state.score],
			paths: state.paths * c[1],
			turn: state.turn + 1
		};

		newState.pos[player] = (newState.pos[player] + c[0]) % 10;
		newState.score[player] += newState.pos[player] + 1;

		if (newState.score[player] >= 21) {
			wins[player] += newState.paths;
		} else {
			getPart2(newState).forEach((w, i) => wins[i] += w);
		}
	});

	return wins;
}

const input = `Player 1 starting position: 4
Player 2 starting position: 10`;
