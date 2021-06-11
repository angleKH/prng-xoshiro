export default (function(x1, x2) { // x1: least significant bits, x2: most significant bits
	return function(state1, state2) {
		if (state1 !== null && state1 !== undefined) {
			x1 = state1;
			x2 = state2;
		}
		
		// z = x += 0x9E3779B97F4A7C15
		var z1 = (x1+0x7F4A7C15) >>> 0;
		x2 = (x2 + 0x9E3779B9 + (z1 < x1)) >>> 0;
		x1 = z1;
		var z2 = x2;
		
		// (z ^ (z >> 30))
		z1 ^= (z1 >>> 30) | (z2 << 2);
		z2 ^= z2 >>> 30;
		
		// Multiplication algorithm in JS for 64 bits numbers as 2 32 bit numbers from Google closure library
		// z * 0xBF58476D1CE4E5B9
		var lo2 = 0x1CE4E5B9;
		var hi2 = 0xBF58476D;
		var a32 = z2 & 0xFFFF;
		var a16 = z1 >>> 16;
		var a00 = z1 & 0xFFFF;
		var b32 = hi2 & 0xFFFF;
		var b16 = lo2 >>> 16;
		var b00 = lo2 & 0xFFFF;
		var c00 = a00 * b00;
		var c16 = c00 >>> 16;
		c00 &= 0xFFFF;
		c16 += a16 * b00;
		var c32 = c16 >>> 16;
		c16 &= 0xFFFF;
		c16 += a00 * b16;
		c32 += c16 >>> 16;
		c16 &= 0xFFFF;
		c32 += a32 * b00;
		var c48 = c32 >>> 16;
		c32 &= 0xFFFF;
		c32 += a16 * b16;
		c48 += c32 >>> 16;
		c32 &= 0xFFFF;
		c32 += a00 * b32;
		c48 += c32 >>> 16;
		c32 &= 0xFFFF;
		c48 += (z2 >>> 16) * b00 + a32 * b16 + a16 * b32 + a00 * (hi2 >>> 16);
		c48 &= 0xFFFF;
		z1 = (c16 << 16) | c00;
		z2 = (c48 << 16) | c32;
		
		// (z ^ (z >> 27)
		z1 ^= (z1 >>> 27) | (z2 << 5);
		z2 ^= z2 >>> 27;
		
		// z * 0x94D049BB133111EB
		lo2 = 0x133111EB;
		hi2 = 0x94D049BB;
		a32 = z2 & 0xFFFF;
		a16 = z1 >>> 16;
		a00 = z1 & 0xFFFF;
		b32 = hi2 & 0xFFFF;
		b16 = lo2 >>> 16;
		b00 = lo2 & 0xFFFF;
		c00 = a00 * b00;
		c16 = c00 >>> 16;
		c00 &= 0xFFFF;
		c16 += a16 * b00;
		c32 = c16 >>> 16;
		c16 &= 0xFFFF;
		c16 += a00 * b16;
		c32 += c16 >>> 16;
		c16 &= 0xFFFF;
		c32 += a32 * b00;
		c48 = c32 >>> 16;
		c32 &= 0xFFFF;
		c32 += a16 * b16;
		c48 += c32 >>> 16;
		c32 &= 0xFFFF;
		c32 += a00 * b32;
		c48 += c32 >>> 16;
		c32 &= 0xFFFF;
		c48 += (z2 >>> 16) * b00 + a32 * b16 + a16 * b32 + a00 * (hi2 >>> 16);
		c48 &= 0xFFFF;
		z1 = (c16 << 16) | c00;
		z2 = (c48 << 16) | c32;
		
		// z ^ (z >> 31n)
		return [(z1 ^ ((z1 >>> 31) | (z2 << 1))) >>> 0, (z2 ^ (z2 >>> 31)) >>> 0];
		// The result is returned as two uint32_t integers
	};
})(0, 0);
