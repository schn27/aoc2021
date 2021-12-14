"use strict";

function calc() {
	const [poly, rules] = input.split('\n\n');

	const pairMap = {};
	let pairCount = {};

	rules.split('\n').map(e => e.split(' -> ')).forEach(([l, r]) => {
		pairMap[l] = [[l[0], r].join(''), [r, l[1]].join('')];
		pairCount[l] = 0;
	});

	for (let i = 0; i < poly.length - 1; ++i) {
		++pairCount[poly.substr(i, 2)];
	}

	let part1 = 0;
	let part2 = 0;

	for (let step = 1; step <= 40; ++step) {
		const newPairCount = {...pairCount};

		Object.keys(pairCount).forEach(k => {
			newPairCount[k] -= pairCount[k];
			newPairCount[pairMap[k][0]] += pairCount[k];
			newPairCount[pairMap[k][1]] += pairCount[k];
		});

		pairCount = newPairCount;

		if (step == 10) {
			part1 = getDiff(pairCount, poly);
		} else if (step == 40) {
			part2 = getDiff(pairCount, poly);
		}
	}

	return part1 + ' ' + part2;
}

function getDiff(pairCount, poly) {
	let freqs = {};

	Object.keys(pairCount).forEach(k => {
		freqs[k[0]] = (freqs[k[0]] || 0) + pairCount[k];
		freqs[k[1]] = (freqs[k[1]] || 0) + pairCount[k];
	});

	++freqs[poly[0]];
	++freqs[poly[poly.length - 1]];

	freqs = Object.values(freqs).map(e => Math.floor(e / 2));
	freqs.sort((a, b) => b - a);

	return freqs[0] - freqs[freqs.length - 1];
}

const input = `SNVVKOBFKOPBFFFCPBSF

HH -> P
CH -> P
HK -> N
OS -> N
HV -> S
VC -> C
VO -> K
OC -> C
FB -> S
NP -> S
OK -> H
OO -> N
PP -> B
VK -> B
BV -> N
PN -> K
HC -> C
NS -> K
BO -> C
BN -> O
SP -> H
FK -> K
KF -> N
VP -> H
NO -> N
OH -> N
CC -> O
PK -> P
BF -> K
CP -> N
SH -> V
VS -> P
BH -> B
KS -> H
HB -> K
BK -> S
KV -> C
SF -> B
BB -> O
PC -> S
HN -> S
FP -> S
PH -> C
OB -> O
FH -> K
CS -> P
OF -> N
FF -> V
PV -> B
PF -> C
FC -> S
KC -> O
PS -> V
CO -> F
CK -> O
KH -> H
OP -> O
SK -> S
VB -> P
FN -> H
FS -> P
FV -> N
HP -> O
SB -> N
VN -> V
KK -> P
KO -> V
BC -> B
FO -> H
OV -> H
CF -> H
HF -> K
SS -> V
SC -> N
CB -> B
SV -> C
SN -> P
PB -> B
KP -> S
PO -> B
CN -> F
ON -> B
CV -> S
HO -> O
NF -> F
VH -> P
NN -> S
HS -> S
NV -> V
NH -> C
NB -> B
SO -> K
NC -> C
VF -> B
BS -> V
VV -> N
BP -> P
KN -> C
NK -> O
KB -> F`;
