var XoShiRo;(()=>{"use strict";var t={124:(t,n,e)=>{e.d(n,{Z:()=>o});const o=(r=0,i=0,function(t,n){null!=t&&(r=t,i=n);var e=r+2135587861>>>0;i=i+2654435769+(e<r)>>>0,r=e;var o=i;e^=e>>>30|o<<2;var s=484763065,u=3210233709,a=65535&(o^=o>>>30),F=e>>>16,c=65535&e,l=65535&u,p=s>>>16,h=65535&s,f=c*h,g=f>>>16,y=(g+=F*h)>>>16;g&=65535,y+=(g+=c*p)>>>16;var d=(y+=a*h)>>>16;return y&=65535,d+=(y+=F*p)>>>16,y&=65535,d+=(y+=c*l)>>>16,d+=(o>>>16)*h+a*p+F*l+c*(u>>>16),e=(g&=65535)<<16|(f&=65535),g=(f=(c=65535&(e^=e>>>27|(o=(d&=65535)<<16|(y&=65535))<<5))*(h=65535&(s=321982955)))>>>16,y=(g+=(F=e>>>16)*h)>>>16,g&=65535,y+=(g+=c*(p=s>>>16))>>>16,d=(y+=(a=65535&(o^=o>>>27))*h)>>>16,y&=65535,d+=(y+=F*p)>>>16,y&=65535,d+=(y+=c*(l=65535&(u=2496678331)))>>>16,d+=(o>>>16)*h+a*p+F*l+c*(u>>>16),[((e=(g&=65535)<<16|(f&=65535))^(e>>>31|(o=(d&=65535)<<16|(y&=65535))<<1))>>>0,(o^o>>>31)>>>0]});var r,i},230:(t,n,e)=>{e.d(n,{d:()=>o,j:()=>r});var o="undefined"==typeof Symbol?null:Object.getPrototypeOf(Object.getPrototypeOf([][Symbol.iterator]()));function r(){var t=this.peek();return t.toString.apply(t,arguments)}}},n={};function e(o){var r=n[o];if(void 0!==r)return r.exports;var i=n[o]={exports:{}};return t[o](i,i.exports,e),i.exports}e.d=(t,n)=>{for(var o in n)e.o(n,o)&&!e.o(t,o)&&Object.defineProperty(t,o,{enumerable:!0,get:n[o]})},e.o=(t,n)=>Object.prototype.hasOwnProperty.call(t,n),e.r=t=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})};var o={};(()=>{e.r(o),e.d(o,{XoShiRo256PlusPlus:()=>f,XoShiRo256StarStar:()=>g,XoShiRo256Plus:()=>y});var t=e(124),n=e(230);const r=0xFFFFFFFFFFFFFFFFn;function i(t,n){return BigInt.asUintN(64,t<<n)|t>>64n-n}const s=function(t){return{value:this.nextBigInt(t)}},u=(t,n)=>{let e=0n,o=0n,r=0n,i=0n;const s=n.s;for(let u=0;u<t.length;++u)for(let a=0n;a<64;++a)t[u]&1n<<a&&(e^=s[0],o^=s[1],r^=s[2],i^=s[3]),n.nextBigInt();s[0]=e,s[1]=o,s[2]=r,s[3]=i},a=(()=>{const t=[0x180EC6D33CFD0ABAn,0xD5A61266F0C9392Cn,0xA9582618E03FC9AAn,0x39ABDC4529B1661Cn];return function(){return u(t,this)}})(),F=(()=>{const t=[0x76E15D3EFEFDCBBFn,0xC5004E441C522FB3n,0x77710069854EE241n,0x39109BB02ACBE635n];return function(){return u(t,this)}})(),c=function(){const t=new DataView(new ArrayBuffer(8));return t.setBigUint64(0,this.nextBigInt()),t.getFloat64()},l=function(t=r){if(t>r)throw new RangeError("Illegal bound; must be less than or equal to 0xFFFFFFFFFFFFFFFF (18446744073709551615); bound given: "+t);const n=this.s;let e;do{e=this.peek();const t=BigInt.asUintN(64,n[1]<<17n);n[2]^=n[0],n[3]^=n[1],n[1]^=n[2],n[0]^=n[3],n[2]^=t,n[3]=i(n[3],45n)}while(e>=r-r%t);return e%t};function p(n,e){const[o,r]=(0,t.Z)(n,e);return BigInt("0x"+r.toString(16)+o.toString(16).padStart(8,"0"))}const h=t=>{const e=function(t,n,e,o){Object.defineProperty(this,"s",{configurable:!1,value:new BigUint64Array(4),writable:!1}),arguments.length>=4?(this.s[0]=t,this.s[1]=n,this.s[2]=e,this.s[3]=o):(this.s[0]=0===arguments.length?p():p(Number(0x0000FFFFn&t),Number(0xFFFF0000n&t)),this.s[1]=p(),this.s[2]=p(),this.s[3]=p()),0==this.s[0]&&0==this.s[1]&&0==this.s[2]&&0==this.s[3]&&console.warn("The state for xoshiro was seeded with all zeroes, so the generator may not function as expected.")};return(e.prototype=Object.create(n.d)).peek=t,e.prototype.valueOf=t,e.prototype.toString=n.j,e.prototype.nextBigInt=l,e.prototype.longJump=F,e.prototype.jump=a,e.prototype.next=s,e.prototype.nextFloat=c,Object.defineProperty(e.prototype,"constructor",{value:e,enumerable:!1}),e},f=h((function(){const t=this.s;return BigInt.asUintN(64,i(BigInt.asUintN(64,t[0]+t[3]),23n)+t[0])})),g=h((function(){const t=this.s;return BigInt.asUintN(64,9n*i(BigInt.asUintN(64,5n*t[1]),7n))})),y=h((function(){const t=this.s;return BigInt.asUintN(64,t[0]+t[3])}))})(),XoShiRo=o})();