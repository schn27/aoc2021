"use strict";

function calc() {
	const hex2bin = (hex) => {
		const binStr = parseInt(hex, 16).toString(2);
		return "00000000".substr(binStr.length) + binStr;
	}

	const data = input.match(/[A-F\d]{2}/g).map(e => hex2bin(e)).join('').split('');

	const packets = parsePackets(data);

	const part1 = getVersionSum(packets);

	const part2 = getEvalResult(packets[0]);

	return part1 + ' ' + part2;
}

function parsePackets(data, subPacket = false, limit = Infinity) {
	const packets = [];

	for (let i = 0; i < data.length && packets.length < limit;) {
		const packet = {length: 0};

		packet.version = parseInt(data.slice(i, i + 3).join(''), 2);
		i += 3;
		packet.length += 3;

		packet.type = parseInt(data.slice(i, i + 3).join(''), 2);
		i += 3;
		packet.length += 3;

		if (packet.type == 4) {
			for (let last = false; !last;) {
				last = data[i] == '0';
				const v = parseInt(data.slice(i + 1, i + 5).join(''), 2);
				packet.literal = (packet.literal || 0) * 16 + v;
				i += 5;
				packet.length += 5;
			}

		} else {
			const lengthId = +data[i];
			i += 1;
			packet.length += 1;

			if (lengthId == 0) {
				const length = parseInt(data.slice(i, i + 15).join(''), 2);
				i += 15;
				packet.length += 15;

				packet.subPackets = parsePackets(data.slice(i, i + length), true);
				i += length;
				packet.length += length;
			} else {
				const length = parseInt(data.slice(i, i + 11).join(''), 2);
				i += 11;
				packet.length += 11;

				packet.subPackets = parsePackets(data.slice(i), true, length);
				const subLength = packet.subPackets.reduce((a, e) => a + e.length, 0)
				i += subLength;
				packet.length += subLength;
			}
		}

		packets.push(packet);

		if (!subPacket) {
			i += i % 8;
		}
	}

	return packets;
}

function getVersionSum(packets) {
	return !packets ? 0 : packets.reduce((a, e) => a + e.version + getVersionSum(e.subPackets), 0);
}

function getEvalResult(packet) {
	switch (packet.type) {
	case 0:
		return packet.subPackets.reduce((a, e) => a + getEvalResult(e), 0);
	case 1:
		return packet.subPackets.reduce((a, e) => a * getEvalResult(e), 1);
	case 2:
		return Math.min(...packet.subPackets.map(e => getEvalResult(e)));
	case 3:
		return Math.max(...packet.subPackets.map(e => getEvalResult(e)));
	case 4:
		return packet.literal;
	case 5:
		return getEvalResult(packet.subPackets[0]) > getEvalResult(packet.subPackets[1]) ? 1 : 0;
	case 6:
		return getEvalResult(packet.subPackets[0]) < getEvalResult(packet.subPackets[1]) ? 1 : 0;
	case 7:
		return getEvalResult(packet.subPackets[0]) == getEvalResult(packet.subPackets[1]) ? 1 : 0;
	}

	throw new Error('unknown type');
}

const input = `00569F4A0488043262D30B333FCE6938EC5E5228F2C78A017CD78C269921249F2C69256C559CC01083BA00A4C5730FF12A56B1C49A480283C0055A532CF2996197653005FC01093BC4CE6F5AE49E27A7532200AB25A653800A8CAE5DE572EC40080CD26CA01CAD578803CBB004E67C573F000958CAF5FC6D59BC8803D1967E0953C68401034A24CB3ACD934E311004C5A00A4AB9CAE99E52648401F5CC4E91B6C76801F59DA63C1F3B4C78298014F91BCA1BAA9CBA99006093BFF916802923D8CC7A7A09CA010CD62DF8C2439332A58BA1E495A5B8FA846C00814A511A0B9004C52F9EF41EC0128BF306E4021FD005CD23E8D7F393F48FA35FCE4F53191920096674F66D1215C98C49850803A600D4468790748010F8430A60E1002150B20C4273005F8012D95EC09E2A4E4AF7041004A7F2FB3FCDFA93E4578C0099C52201166C01600042E1444F8FA00087C178AF15E179802F377EC695C6B7213F005267E3D33F189ABD2B46B30042655F0035300042A0F47B87A200EC1E84306C801819B45917F9B29700AA66BDC7656A0C49DB7CAEF726C9CEC71EC5F8BB2F2F37C9C743A600A442B004A7D2279125B73127009218C97A73C4D1E6EF64A9EFDE5AF4241F3FA94278E0D9005A32D9C0DD002AB2B7C69B23CCF5B6C280094CE12CDD4D0803CF9F96D1F4012929DA895290FF6F5E2A9009F33D796063803551006E3941A8340008743B8D90ACC015C00DDC0010B873052320002130563A4359CF968000B10258024C8DF2783F9AD6356FB6280312EBB394AC6FE9014AF2F8C381008CB600880021B0AA28463100762FC1983122D2A005CBD11A4F7B9DADFD110805B2E012B1F4249129DA184768912D90B2013A4001098391661E8803D05612C731007216C768566007280126005101656E0062013D64049F10111E6006100E90E004100C1620048009900020E0006DA0015C000418000AF80015B3D938`;
