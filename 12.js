"use strict";

function calc() {
	const list = input.split('\n').map(e => e.split('-'));

	const links = {};

	list.forEach(([from, to]) => {
		links[from] = links[from] || [];
		links[from].push(to);
		links[to] = links[to] || [];
		links[to].push(from);
	});

	const part1 = getPaths(['start'], links);
	const part2 = getPaths(['start'], links, true);

	return part1 + ' ' + part2;
}

function getPaths(path, links, allowTwice = false) {
	let n = 0;
	const cave = path[path.length - 1];

	links[cave].forEach(e => {
		if (e == 'end') {
			++n;
		} else if (e != 'start') {
			if (!e.match(/[a-z]+/) || path.indexOf(e) < 0) {
				n += getPaths([...path, e], links, allowTwice);
			} else if (allowTwice) {
				n += getPaths([...path, e], links, false);
			}
		}
	});

	return n;
}

const input = `yb-start
de-vd
rj-yb
rj-VP
OC-de
MU-de
end-DN
vd-end
WK-vd
rj-de
DN-vd
start-VP
DN-yb
vd-MU
DN-rj
de-VP
yb-OC
start-rj
oa-MU
yb-de
oa-VP
jv-MU
yb-MU
end-OC`;
