# xoshiro library
A pure Javascript implementation of the [xoshiro](https://prng.di.unimi.it/) family of PRNGs. Since it is implemented in vanilla JS, it can be run in a `<script>` tag, or even in the browser console. In fact, the xoshiro128 bundle can even run on browsers that implement only up to ES5.

PRNG results are fully deteministic and reproducible when provided with a seed.
## Installation
### browsers
The `dist` folder contains pre-built bundles that expose the library as a global variable named `XoShiRo`. There are 3 different bundles:
* `xoshiro.js` includes the entire library.
* `xoshiro256.js` includes only the xoshiro256 generators. `BigInt` (formally added in ECMAScript 2020) must be supported to run it.
* `xoshiro128.js` includes only the xoshiro128 generators. This file is ES5-compatible.

The `src` source code folder contains ES6 modules that are fully browser-compatible as well and could be used with `<script type="module">`.

### npm
```
npm install prng-xoshiro
```

## API
The available generators are `XoShiRo256PlusPlus`, `XoShiRo256StarStar`, `XoShiRo256Plus`, `XoShiRo128PlusPlus`, `XoShiRo128StarStar`, `XoShiRo128Plus`. For more information, see the website on [xoshiro](https://prng.di.unimi.it/).

All generators implement the *Iterable* Interface, so it is possible to use with for...of loops:
```js
for (const rn of new XoShiRo256PlusPlus()) {
	// Infinite unless broken out of
}
```

In the following, `generator` refers to any generator, while `generator128` refers to only xoshiro128 generators and `generator256` refers to only xoshiro256 generators.
### new generator()
Creates and seeds a generator with a seed. It is not suggested to use this method if you would like reproducible results, and generators created this way will not be guaranteed to be seeded with the same values in future versions of this library.

### new generator256(seed)
Creates a new generator. `seed` will be used to seed a splitMix64 generator, whose output will in turn be used to seed this generator. This method is only available for the xoshiro256 generators.
* For the xoshiro256 generators, `seed` must be a BigInt.

### new generator128(seedLo, seedHi)
Creates a new generator. `seedLo` and `seedHi` are two Numbers that represent least and most significant bits of a 64-bit integer, respectively. They will be used to seed a splitMix64 generator, whose output will in turn be used to seed this generator. This method is only available for the xoshiro128 generators.
* For the xoshiro128 generators, `seed` must be a Number.

### new generator(s0, s1, s2, s3)
Creates a generator and sets the state to the the variables given.
* For the xoshiro256 generators, all parameters are `BigInt`s.
* For the xoshiro128 generators, all parameters are `Number`s.

### generator256.nextBigInt(n)
Returns a random BigInt in the range 0 to n (exclusive). If `n` is not provided, it defaults to `0xFFFFFFFFFFFFFFFFn`.

### generator128.nextNumber(n)
Returns a random number in the range 0 to n (exclusive). If `n` is not provided, it defaults to `0xFFFFFFFF`.

### generator.peek()
Returns the next random number (as if calling `nextBigInt` or `nextNumber` without parameters) without altering the state of the generator.

### generator.jump()
Advances the generator's state. This is equivalent to 2^64 calls to next() for xoshiro128 generators, and 2^128 calls for xoshiro256 generators.

### generator.longJump()
Advances the generator's state. This is equivalent to 2^96 calls to next() for xoshiro128 generators, and 2^192 calls for xoshiro256 generators.

## Contributing
First clone the repository:
```sh
git clone https://gitgud.io/anglekh/prng-xoshiro.git
```

Then install dependencies with `npm install`.

This library uses [Jest](https://jestjs.io/) for testing. Run `npm test` before committing to run the tests.

Build using `npm run build`. The output will appear in the default webpack directory, `dist`.
