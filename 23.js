"use strict";

function calc() {
	const part1 = solveAmphipods(input);

	const input2 = [
		...input.split('\n').slice(0, 3),
		'  #D#C#B#A#',
		'  #D#B#A#C#',
		...input.split('\n').slice(3)].join('\n');

	const part2 = solveAmphipods(input2);

	return part1 + ' ' + part2;
}

function solveAmphipods(input) {
	const amphipods = input.split('\n')
		.map(e => e.match(/[A-D]/g)).filter(e => e);

	const rooms = [];

	for (let i = 0; i < amphipods[0].length; ++i) {
		rooms.push([...amphipods.map(a => a[i])]);
	}

	const hallway = input.match(/\.+/)[0].split('');

	let visited = {};

	const getMinEnergy = (state) => {
		const stateStr = [...state.rooms.flatMap(e => e), ...state.hallway].join('');

		if ((visited[stateStr] || Infinity) <= state.energy) {
			return Infinity;
		}

		visited[stateStr] = state.energy;

		if (state.rooms.every((r, i) => isRoomOk(r, i))) {
			return state.energy;
		}

		const moves = getMoves(state);

		if (moves.length == 0) {
			return Infinity;
		}

		return Math.min(...moves.map(m => getMinEnergy(m)));
	}

	return getMinEnergy({rooms: rooms, hallway: hallway, energy: 0});
}

function isRoomOk(r, i) {
	return r.every(e => e == 'ABCD'[i]);
}

function getMoves(state) {
	const energy = {A: 1, B: 10, C: 100, D: 1000};

	const moves = [];

	state.hallway.forEach((c, i) => {
		if (c != '.') {
			const roomIndex = 'ABCD'.indexOf(c);
			const roomPos = (roomIndex + 1) * 2;
			const isWayFree = state.hallway
				.slice(Math.min(roomPos, i) + 1, Math.max(roomPos, i))
				.every(e => e == '.');
			const isRoomFree = state.rooms[roomIndex].every(e => e == '.' || e == c);
			
			if (isWayFree && isRoomFree) {
				const newHallway = [...state.hallway];
				newHallway[i] = '.';

				const roomSteps = state.rooms[roomIndex].lastIndexOf('.');

				const newRooms = [...state.rooms].map(r => [...r]);
				newRooms[roomIndex][roomSteps] = c;

				moves.push({
					rooms: newRooms,
					hallway: newHallway,
					energy: state.energy + (Math.abs(roomPos - i) + roomSteps + 1) * energy[c]
				});
			}
		}
	});

	state.rooms.forEach((r, i) => {
		const pos = (i + 1) * 2;

		if (!isRoomOk(r, i) && !r.every(e => e == '.') && 
				(state.hallway[pos - 1] == '.' || state.hallway[pos + 1] == '.')) {
			let moving = undefined;
			let movingPos = -1;
			let steps = 0;

			for (let j = 0; j < r.length; ++j) {
				if (r[j] != '.' && !isRoomOk(r.slice(j), i)) {
					moving = r[j];
					movingPos = j;
					break;
				}
			}

			if (movingPos >= 0) {
				for (let p = 1; state.hallway[pos - p] == '.'; ++p) {
					if (pos - p < 2 || (pos - p) % 2 != 0) {
						const newHallway = [...state.hallway];
						newHallway[pos - p] = moving;

						const newRooms = [...state.rooms].map(r => [...r]);
						newRooms[i][movingPos] = '.';

						moves.push({
							rooms: newRooms,
							hallway: newHallway,
							energy: state.energy + (movingPos + p + 1) * energy[moving]
						});
					}
				}

				for (let p = 1; state.hallway[pos + p] == '.'; ++p) {
					if (pos + p > 8 || (pos + p) % 2 != 0) {
						const newHallway = [...state.hallway];
						newHallway[pos + p] = moving;

						const newRooms = [...state.rooms].map(r => [...r]);
						newRooms[i][movingPos] = '.';

						moves.push({
							rooms: newRooms,
							hallway: newHallway,
							energy: state.energy + (movingPos + p + 1) * energy[moving]
						});
					}
				}
			}
		}
	});

	return moves;
}

const input = `#############
#...........#
###B#C#C#B###
  #D#D#A#A#
  #########`;
