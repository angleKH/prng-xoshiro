import splitMix64Next from "./splitmix64.js";
import { xoShiRoToString, IteratorPrototype } from "./xoshirocommon.js";

const UINT64_MAX = 0xFFFFFFFFFFFFFFFFn;

function rotl(x, k) {
	return BigInt.asUintN(64, (x << k)) | (x >> (64n - k));
};

const next = function(n) {
	return { value: this.nextBigInt(n) };
};

const genericJump = (type, o) => {
	let s0 = 0n;
	let s1 = 0n;
	let s2 = 0n;
	let s3 = 0n;
	const s = o.s;
	for (let i = 0; i < type.length; ++i) {
		for(let b = 0n; b < 64; ++b) {
			if (type[i] & (1n << b)) {
				s0 ^= s[0];
				s1 ^= s[1];
				s2 ^= s[2];
				s3 ^= s[3];
			}
			o.nextBigInt();
		}
	}
	s[0] = s0;
	s[1] = s1;
	s[2] = s2;
	s[3] = s3;
};

const jump = (() => {
	const JUMP = [0x180EC6D33CFD0ABAn, 0xD5A61266F0C9392Cn, 0xA9582618E03FC9AAn, 0x39ABDC4529B1661Cn];
	return function() {
		return genericJump(JUMP, this);
	}
})();

const longJump = (() => {
	const JUMP = [0x76E15D3EFEFDCBBFn, 0xC5004E441C522FB3n, 0x77710069854EE241n, 0x39109BB02ACBE635n];
	return function() {
		return genericJump(JUMP, this);
	}
})();

const nextFloat = function() {
	const dv = new DataView(new ArrayBuffer(8));
	dv.setBigUint64(0, this.nextBigInt());
	return dv.getFloat64();
};

const nextBigInt = function(n = UINT64_MAX) {
	if (n > UINT64_MAX) {
		throw new RangeError("Illegal bound; must be less than or equal to 0xFFFFFFFFFFFFFFFF (18446744073709551615); bound given: "+n);
	}

	const s = this.s;
	let result;
	do {
		result = this.peek();
		const t = BigInt.asUintN(64, s[1] << 17n);
	
		s[2] ^= s[0];
		s[3] ^= s[1];
		s[1] ^= s[2];
		s[0] ^= s[3];
	
		s[2] ^= t;
		s[3] = rotl(s[3], 45n);
		
	} while(result >= (UINT64_MAX - (UINT64_MAX % n)));
	return result % n;
};

function splitMix64NextBigInt(x1, x2) {
	const [lo, hi] = splitMix64Next(x1, x2);
	return BigInt("0x"+hi.toString(16)+lo.toString(16).padStart(8,"0"));
}

const xoshiro256Maker = (peek) => {
	const XoShiRo256Generator = function(arg1, arg2, arg3, arg4) {
		Object.defineProperty(this, "s", {
			configurable: false,
			value: new BigUint64Array(4),
			writable: false
		});
		
		if (arguments.length >= 4) {
			this.s[0] = arg1;
			this.s[1] = arg2;
			this.s[2] = arg3;
			this.s[3] = arg4;
		} else {
			this.s[0] = arguments.length === 0 ? splitMix64NextBigInt() : splitMix64NextBigInt(Number(arg1 & 0x0000FFFFn), Number(arg1 & 0xFFFF0000n));
			this.s[1] = splitMix64NextBigInt();
			this.s[2] = splitMix64NextBigInt();
			this.s[3] = splitMix64NextBigInt();
		}
		
		if (this.s[0] == 0 && this.s[1] == 0 && this.s[2] == 0 && this.s[3] == 0) {
			console.warn("The state for xoshiro was seeded with all zeroes, so the generator may not function as expected.");
		}
	};
	XoShiRo256Generator.prototype = Object.create(IteratorPrototype);
	XoShiRo256Generator.prototype.peek = peek;
	XoShiRo256Generator.prototype.valueOf = peek;
	
	XoShiRo256Generator.prototype.toString = xoShiRoToString;
	XoShiRo256Generator.prototype.nextBigInt = nextBigInt;
	XoShiRo256Generator.prototype.longJump = longJump;
	XoShiRo256Generator.prototype.jump = jump;
	XoShiRo256Generator.prototype.next = next;
	XoShiRo256Generator.prototype.nextFloat = nextFloat;
	Object.defineProperty(XoShiRo256Generator.prototype, "constructor", {
		value: XoShiRo256Generator,
		enumerable: false
	});
	return XoShiRo256Generator;
};

export const XoShiRo256PlusPlus = xoshiro256Maker(function() {
	const s = this.s;
	return BigInt.asUintN(64, rotl(BigInt.asUintN(64, s[0] + s[3]), 23n) + s[0]);
});

export const XoShiRo256StarStar = xoshiro256Maker(function() {
	const s = this.s;
	return BigInt.asUintN(64, rotl(BigInt.asUintN(64, s[1] * 5n), 7n) * 9n);
});

export const XoShiRo256Plus = xoshiro256Maker(function() {
	const s = this.s;
	return BigInt.asUintN(64,  s[0] + s[3]);
});
