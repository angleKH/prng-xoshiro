export default [
	{
		entry: {
			xoshiro: "./src/xoshiro.js", 
			xoshiro256: "./src/xoshiro256.js"
		},
		mode: "production",
		output: {
			filename: "[name].js",
			library: {
				type: "var",
				name: "XoShiRo"
			}
		},
		target: ["web", "es2020"]
	},
	{
		entry: "./src/xoshiro128.js",
		mode: "production",
		output: {
			filename: "xoshiro128.js",
			library: {
				type: "var",
				name: "XoShiRo"
			}
		},
		target: ["web", "es5"]
	}
];
