#!/bin/sh
TEMP_DIR=xoshiro_tmp

mkdir $TEMP_DIR
cd $TEMP_DIR || exit

gcc ../generatetests.c -c -std=c18 -Wall -pedantic

gcc ../xoshiro/xoshiro256plusplus.c -c -std=c18 -Wall -pedantic
objcopy --globalize-symbol=s --redefine-sym next=xoshiro256plusplus_next xoshiro256plusplus.o
objcopy --redefine-sym s=xoshiro256plusplus_s xoshiro256plusplus.o
objcopy --redefine-sym jump=xoshiro256plusplus_jump xoshiro256plusplus.o
objcopy --redefine-sym long_jump=xoshiro256plusplus_long_jump xoshiro256plusplus.o

gcc ../xoshiro/xoshiro256starstar.c -c -std=c18 -Wall -pedantic
objcopy --globalize-symbol=s --redefine-sym next=xoshiro256starstar_next xoshiro256starstar.o
objcopy --redefine-sym s=xoshiro256starstar_s xoshiro256starstar.o
objcopy --redefine-sym jump=xoshiro256starstar_jump xoshiro256starstar.o
objcopy --redefine-sym long_jump=xoshiro256starstar_long_jump xoshiro256starstar.o

gcc ../xoshiro/xoshiro256plus.c -c -std=c18 -Wall -pedantic
objcopy --globalize-symbol=s --redefine-sym next=xoshiro256plus_next xoshiro256plus.o
objcopy --redefine-sym s=xoshiro256plus_s xoshiro256plus.o
objcopy --redefine-sym jump=xoshiro256plus_jump xoshiro256plus.o
objcopy --redefine-sym long_jump=xoshiro256plus_long_jump xoshiro256plus.o

gcc ../xoshiro/xoshiro128plusplus.c -c -std=c18 -Wall -pedantic
objcopy --globalize-symbol=s --redefine-sym next=xoshiro128plusplus_next xoshiro128plusplus.o
objcopy --redefine-sym s=xoshiro128plusplus_s xoshiro128plusplus.o
objcopy --redefine-sym jump=xoshiro128plusplus_jump xoshiro128plusplus.o
objcopy --redefine-sym long_jump=xoshiro128plusplus_long_jump xoshiro128plusplus.o

gcc ../xoshiro/xoshiro128starstar.c -c -std=c18 -Wall -pedantic
objcopy --globalize-symbol=s --redefine-sym next=xoshiro128starstar_next xoshiro128starstar.o
objcopy --redefine-sym s=xoshiro128starstar_s xoshiro128starstar.o
objcopy --redefine-sym jump=xoshiro128starstar_jump xoshiro128starstar.o
objcopy --redefine-sym long_jump=xoshiro128starstar_long_jump xoshiro128starstar.o

gcc ../xoshiro/xoshiro128plus.c -c -std=c18 -Wall -pedantic
objcopy --globalize-symbol=s --redefine-sym next=xoshiro128plus_next xoshiro128plus.o
objcopy --redefine-sym s=xoshiro128plus_s xoshiro128plus.o
objcopy --redefine-sym jump=xoshiro128plus_jump xoshiro128plus.o
objcopy --redefine-sym long_jump=xoshiro128plus_long_jump xoshiro128plus.o

gcc ../xoshiro/splitmix64.c -c -std=c18 -Wall -pedantic
objcopy --redefine-sym next=splitmix64_next splitmix64.o
 
gcc generatetests.o xoshiro256plusplus.o xoshiro256starstar.o xoshiro256plus.o xoshiro128plusplus.o xoshiro128starstar.o xoshiro128plus.o splitmix64.o -std=c18 -Wall -pedantic -o print_jest_tests
./print_jest_tests > ../test.js
