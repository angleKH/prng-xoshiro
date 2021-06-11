#include <stdio.h>
#include <stdint.h>
#include <inttypes.h>

static void seed_and_print_opening_256(uint64_t (* const restrict s)[4], uint64_t const s0, uint64_t const s1, uint64_t const s2, uint64_t const s3, char const * const restrict name) {
	(*s)[0] = s0;
	(*s)[1] = s1;
	(*s)[2] = s2;
	(*s)[3] = s3;
	printf("	var xorng = new %s(%#"PRIx64"n, %#"PRIx64"n, %#"PRIx64"n, %#"PRIx64"n);\n", name, s0, s1, s2, s3);
}

static void check_default_seed_256(uint64_t (* const restrict s)[4], char const * const restrict name) {
	(*s)[0] = 16294208416658607535u;
	(*s)[1] = 7960286522194355700u;
	(*s)[2] = 487617019471545679u;
	(*s)[3] = 17909611376780542444u;
	printf("	var xorng = new %s(0n);\n", name);
	puts("	expect(xorng.s[0]).toBe(16294208416658607535n);");
	puts("	expect(xorng.s[1]).toBe(7960286522194355700n);");
	puts("	expect(xorng.s[2]).toBe(487617019471545679n);");
	puts("	expect(xorng.s[3]).toBe(17909611376780542444n);");
}

static void print_jump(void (* const jump)()) {
	jump();
	puts("	xorng.jump();");
}

static void print_long_jump(void (* const long_jump)()) {
	long_jump();
	puts("	xorng.longJump();");
}

static void print_generator_tests_256(uint64_t (* const next)(), void (* const jump)(), void (* const long_jump)(), uint64_t (* const restrict s_pointer)[4], char const * const restrict name) {
	printf("test('%s', () => {\n",name);
	
	seed_and_print_opening_256(s_pointer, 0x96a1743c36ed852fu, 0x8c0ac25732c50c9fu, 0xec65ea85c2947a21u, 0x6cd5a2d6fe9971f9u, name);
	
	for (uint_fast16_t i = 0; i < 1000u; ++i) {
		printf("	expect(xorng.nextBigInt()).toBe(%#" PRIx64 "n);\n", next());
	}
	
	print_jump(jump);
	
	for (uint_fast16_t i = 0; i < 1000u; ++i) {
		printf("	expect(xorng.nextBigInt()).toBe(%#" PRIx64 "n);\n", next());
	}
	
	print_long_jump(long_jump);
	
	for (uint_fast16_t i = 0; i < 1000u; ++i) {
		printf("	expect(xorng.nextBigInt()).toBe(%#" PRIx64 "n);\n", next());
	}
	
	print_jump(jump);
	
	for (uint_fast16_t i = 0; i < 1600u; ++i) {
		printf("	expect(xorng.nextBigInt()).toBe(%#" PRIx64 "n);\n", next());
	}
	
	check_default_seed_256(s_pointer, name);
	
	for (uint_fast16_t i = 0; i < 1000u; ++i) {
		printf("	expect(xorng.nextBigInt()).toBe(%#" PRIx64 "n);\n", next());
	}
	
	puts("	for (const rn of xorng) { break; }");
	printf("	expect(xorng.constructor).toBe(%s);\n", name);
	puts("	expect(xorng.propertyIsEnumerable('constructor')).toBe(false);");
	printf("	expect(() => %s()).toThrow();\n", name);
	puts(	"	expect(xorng.nextBigInt(1n)).toBe(0n);");
	puts(	"	expect(() => xorng.nextBigInt(0xFFFFFFFFFFFFFFFFFFFn)).toThrow(); // Should not infinite loop");
	puts(	"	expect(() => xorng.s[4] = 0).toThrow();");
	
}


static void seed_and_print_opening_128(uint32_t (* const restrict s)[4], uint32_t const s0, uint32_t const s1, uint32_t const s2, uint32_t const s3, char const * const restrict name) {
	(*s)[0] = s0;
	(*s)[1] = s1;
	(*s)[2] = s2;
	(*s)[3] = s3;
	printf("	var xorng = new %s(%#"PRIx32", %#"PRIx32", %#"PRIx32", %#"PRIx32");\n", name, s0, s1, s2, s3);
}


static void print_generator_tests_128(uint32_t (* const next)(), void (* const jump)(), void (* const long_jump)(), uint32_t (* const restrict s_pointer)[4], char const * const restrict name) {
	printf("test('%s', () => {\n",name);
	
	seed_and_print_opening_128(s_pointer, 0x9652fu, 0x8c0ac2u, 0xe47a21u, 0xfe9971f9u, name);
	
	for (uint_fast16_t i = 0; i < 1000u; ++i) {
		printf("	expect(xorng.nextNumber()).toBe(%#" PRIx32 ");\n", next());
	}
	
	print_jump(jump);
	
	for (uint_fast16_t i = 0; i < 1000u; ++i) {
		printf("	expect(xorng.nextNumber()).toBe(%#" PRIx32 ");\n", next());
	}
	
	print_long_jump(long_jump);
	
	for (uint_fast16_t i = 0; i < 1000u; ++i) {
		printf("	expect(xorng.nextNumber()).toBe(%#" PRIx32 ");\n", next());
	}
	
	print_jump(jump);
	
	for (uint_fast16_t i = 0; i < 1600u; ++i) {
		printf("	expect(xorng.nextNumber()).toBe(%#" PRIx32 ");\n", next());
	}
	
	for (uint_fast16_t i = 0; i < 1000u; ++i) {
		printf("	expect(xorng.nextNumber()).toBe(%#" PRIx32 ");\n", next());
	}
	
	puts("	for (const rn of xorng) { break; }");
	printf("	expect(xorng.constructor).toBe(%s);\n", name);
	puts("	expect(xorng.propertyIsEnumerable('constructor')).toBe(false);");
	printf("	expect(() => %s()).toThrow();\n", name);
	puts(	"	expect(xorng.nextNumber(1)).toBe(0);");
	puts(	"	expect(() => xorng.nextNumber(0xFFFFFFFFFF)).toThrow(); // Should not infinite loop");
	puts(	"	expect(() => xorng.s[4] = 0).toThrow();");
	
}

int main(void) {
	puts(
		"import * as XoShiRo from '../src/xoshiro.js';\n"
		"import SplitMix64 from '../src/splitmix64.js';\n"
		"\n"
		"const { XoShiRo256PlusPlus, XoShiRo256StarStar, XoShiRo256Plus, XoShiRo128PlusPlus, XoShiRo128StarStar, XoShiRo128Plus } = XoShiRo;\n"
		"function asBigInt(a) { var v = (new DataView((new Uint32Array(2)).buffer)); v.setUint32(0, a[1]);v.setUint32(4, a[0]); return v.getBigUint64();}"
	);
	
	uint64_t splitmix64_next(void);
	
	puts("test('splitmix64', () => {");
	
	for (uint_fast16_t i = 0; i < 5600u; ++i) {
		printf("	expect(asBigInt(SplitMix64())).toBe(%#" PRIx64 "n);\n", splitmix64_next());
	}
	
	puts("});");
	
	uint64_t xoshiro256plusplus_next(void);
	void xoshiro256plusplus_jump(void);
	void xoshiro256plusplus_long_jump(void);
	extern uint64_t xoshiro256plusplus_s[4];
	print_generator_tests_256(&xoshiro256plusplus_next, &xoshiro256plusplus_jump, &xoshiro256plusplus_long_jump, &xoshiro256plusplus_s, "XoShiRo256PlusPlus");
	puts("});");
	
	uint64_t xoshiro256starstar_next(void);
	void xoshiro256starstar_jump(void);
	void xoshiro256starstar_long_jump(void);
	extern uint64_t xoshiro256starstar_s[4];
	print_generator_tests_256(&xoshiro256starstar_next, &xoshiro256starstar_jump, &xoshiro256starstar_long_jump, &xoshiro256starstar_s, "XoShiRo256StarStar");
	puts("});");
	
	uint64_t xoshiro256plus_next(void);
	void xoshiro256plus_jump(void);
	void xoshiro256plus_long_jump(void);
	extern uint64_t xoshiro256plus_s[4];
	print_generator_tests_256(&xoshiro256plus_next, &xoshiro256plus_jump, &xoshiro256plus_long_jump, &xoshiro256plus_s, "XoShiRo256Plus");
	
	puts("var xorng = new XoShiRo256Plus(); xorng.nextFloat();");
	puts("});");
	
	uint32_t xoshiro128plusplus_next(void);
	void xoshiro128plusplus_jump(void);
	void xoshiro128plusplus_long_jump(void);
	extern uint32_t xoshiro128plusplus_s[4];
	print_generator_tests_128(&xoshiro128plusplus_next, &xoshiro128plusplus_jump, &xoshiro128plusplus_long_jump, &xoshiro128plusplus_s, "XoShiRo128PlusPlus");
	puts("});");
	
	uint32_t xoshiro128starstar_next(void);
	void xoshiro128starstar_jump(void);
	void xoshiro128starstar_long_jump(void);
	extern uint32_t xoshiro128starstar_s[4];
	print_generator_tests_128(&xoshiro128starstar_next, &xoshiro128starstar_jump, &xoshiro128starstar_long_jump, &xoshiro128starstar_s, "XoShiRo128StarStar");
	puts("});");
	
	uint32_t xoshiro128plus_next(void);
	void xoshiro128plus_jump(void);
	void xoshiro128plus_long_jump(void);
	extern uint32_t xoshiro128plus_s[4];
	print_generator_tests_128(&xoshiro128plus_next, &xoshiro128plus_jump, &xoshiro128plus_long_jump, &xoshiro128plus_s, "XoShiRo128Plus");

	puts("});");
}
