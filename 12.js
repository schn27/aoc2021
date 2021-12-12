"use strict";

function calc() {
	const list = input.split('\n').map(e => e.split('-'));

	const links = {};

	list.forEach(([from, to]) => {
		if (!links[from]) {
			links[from] = [];
		}

		if (!links[to]) {
			links[to] = [];
		}

		links[from].push(to);
		links[to].push(from);
	});

	const part1 = getPaths(links)
	const part2 = getPaths(links, true)

	return part1 + ' ' + part2;
}

function getPaths(links, allowTwice = false) {
	const queue = new Queue();
	queue.put(['start']);

	let paths = 0;

	while (queue.getLength() != 0) {
		const path = queue.get();

		const cave = path[path.length - 1];

		links[cave].forEach(e => {
			if (e == 'end') {
				++paths;
			} else if (e != 'start') {
				if (e.match(/[a-z]+/) && path.indexOf(e) >= 0) {
					if (allowTwice && path[0] != '+') {
						queue.put(['+', ...path, e]);
					}
				} else {
					queue.put([...path, e]);
				}
			}
		});
	}

	return paths;
}

class Queue {
	constructor() {
		this.head = null;
		this.tail = null;
		this.length = 0;
	}

	put(value) {
		const node = {value: value, next: null};

		if (this.head) {
			this.tail.next = node;
			this.tail = node;
		} else {
			this.head = node;
			this.tail = node;
		}

		++this.length;
	}

	get() {
		const current = this.head;
		this.head = this.head.next;
		--this.length;
		return current.value;
	}

	getLength() {
		return this.length;
	}
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
