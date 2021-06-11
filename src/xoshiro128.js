import splitMix64Next from "./splitmix64.js";
import { xoShiRoToString, IteratorPrototype } from "./xoshirocommon.js";

function rotl(x, k) {
	return (x << k) | (x >>> (32 - k));
};

var next = function(n) {
	return { value: this.nextNumber(n) };
};

var genericJump = function(type, o) {
	var s0 = 0;
	var s1 = 0;
	var s2 = 0;
	var s3 = 0;
	var s = o.s;
	for (var i = 0; i < type.length; ++i) {
		for (var b = 0; b < 32; ++b) {
			if (type[i] & (1 << b)) {
				s0 ^= s[0];
				s1 ^= s[1];
				s2 ^= s[2];
				s3 ^= s[3];
			}
			o.nextNumber();
		}
	}
	s[0] = s0;
	s[1] = s1;
	s[2] = s2;
	s[3] = s3;
};

var jump = (function() {
	var JUMP = [0x8764000b, 0xf542d2d3, 0x6fa035c3, 0x77f2db5b];
	return function() {
		return genericJump(JUMP, this);
	}
})();

var longJump = (function() {
	var JUMP = [0xb523952e, 0x0b6f099f, 0xccf5a0ef, 0x1c580662];
	return function() {
		return genericJump(JUMP, this);
	}
})();

var nextNumber = function(n = 0xFFFFFFFF) {
	if (n > 0xFFFFFFFF) {
		throw new RangeError("Illegal bound; must be less than or equal to 0xFFFFFFFF (4294967295); bound given: "+n);
	}
	
	var s = this.s;
	var result;
	do {
		result = this.peek();
		var t = s[1] << 9;
	
		s[2] ^= s[0];
		s[3] ^= s[1];
		s[1] ^= s[2];
		s[0] ^= s[3];
	
		s[2] ^= t;
		s[3] = rotl(s[3], 11);
		
	} while(result >= (0xFFFFFFFF - (0xFFFFFFFF % n)));
	return result % n;
};

function xoshiro128Maker(peek) {
	function XoShiRo128Generator(arg1, arg2, arg3, arg4) {
		var s = [,,,,];
		
		if (arguments.length >= 4) {
			s[0] = arg1;
			s[1] = arg2;
			s[2] = arg3;
			s[3] = arg4;
		} else {
			var r = arguments.length === 0 ? splitMix64Next() : splitMix64Next(arg1, arg2);
			s[0] = r[0];
			s[1] = r[1];
			r = splitMix64Next();
			s[2] = r[0];
			s[3] = r[1];
		}
		
		Object.defineProperty(this, "s", {
			configurable: false,
			value: Object.seal(s),
			writable: false
		});
		
		if (s[0] == 0 && s[1] == 0 && s[2] == 0 && s[3] == 0) {
			console.warn("The state for xoshiro was seeded with all zeroes, so the generator may not function as expected.");
		}
	};
	if (IteratorPrototype) {
		XoShiRo128Generator.prototype = Object.create(IteratorPrototype);
	}
	XoShiRo128Generator.prototype.peek = peek;
	XoShiRo128Generator.prototype.valueOf = peek;
	
	XoShiRo128Generator.prototype.toString = xoShiRoToString;
	XoShiRo128Generator.prototype.nextNumber = nextNumber;
	XoShiRo128Generator.prototype.longJump = longJump;
	XoShiRo128Generator.prototype.jump = jump;
	XoShiRo128Generator.prototype.next = next;
	Object.defineProperty(XoShiRo128Generator.prototype, "constructor", {
		value: XoShiRo128Generator,
		enumerable: false
	});
	return XoShiRo128Generator;
};

export var XoShiRo128Plus = xoshiro128Maker(function() {
	var s = this.s;
	return (s[0] + s[3]) >>> 0;
});

export var XoShiRo128StarStar = xoshiro128Maker(function() {
	var s = this.s;
	return (rotl(s[1] * 5, 7) * 9) >>> 0;
});

export var XoShiRo128PlusPlus = xoshiro128Maker(function() {
	var s = this.s;
	return (rotl(s[0] + s[3], 7) + s[0]) >>> 0;
});
