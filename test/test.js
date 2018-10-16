const Calculator = require('../public/javascripts/calc.js');
const assert = require('assert');

// setFunc(funChar) {
// // 	if (this.ops.find((tmp) => {return tmp === funChar;})) {
// // 		this.operation = funChar;
// // 	}
// // }

describe('Testing module "Calculator"', () => {

	describe('Testing constructor', () => {
		it('should create Calculator object', (done) => {

			const c = new Calculator();
			assert(
				c.arg_A === '' &&
				c.arg_B === '' &&
				c.operation === null
			);
			done();
		});
	});

	describe('Testing setting operation', () => {

		let c = null;

		before((done) => {
			c = new Calculator();
			done();
		});

		afterEach((done) => {
			 c.operation = null;
			 done();
		});

		it('should set function to any given in the set [+,-,*,/]', (done) => {
			const testFunc = '/';
			c.setFunc(testFunc);
			assert(c.operation === testFunc, 'operation should be set to ' + testFunc);
			done();
		});

		it('should NOT set function to external operation', (done) => {
			const testFunc = '^';
			c.setFunc(testFunc);
			assert(c.operation !== testFunc);
			done();
		});

		it('should NOT set function to none', (done) => {
			const testFunc = NaN;
			c.setFunc(testFunc);
			assert(c.operation !== testFunc, 'should NOT set operation to NaN');
			done();
		});
	});

	describe('Testing setting arguments', () => {

		describe('argument A', () => {

			let c = null;

			before((done) => {
				c = new Calculator();
				done();
			});

			afterEach((done) => {
				c.arg_A = '';
				done();
			});

			it('should set arg A as digit', (done) => {
				const testDigit = '1';
				c.setA(testDigit);
				assert(testDigit === c.arg_A, 'arg_A should be set ' + testDigit);
				done();
			});

			it('should not set arg_A as "null"', (done) => {
				const testDigit = null;
				c.setA(testDigit);
				assert(testDigit !== c.arg_A, 'arg_A should not be set');
				done();
			});

			it('should note set arg_A as NaN', function () {
				const testData = NaN;
				c.setA(testData);
				assert(testData !== c.arg_A, 'arg_A should not be set ' + testData);
			});
		});

		describe('argument B', () => {

			let c = null;

			before((done) => {
				c = new Calculator();
				done();
			});

			afterEach((done) => {
				c.arg_B = '';
				done();
			});

			it('should set arg B as digit', (done) => {
				const testDigit = '1';
				c.setB(testDigit);
				assert(testDigit === c.arg_B, 'arg_B should be set ' + testDigit);
				done();
			});

			it('should not set arg_B as "null"', (done) => {
				const testDigit = null;
				c.setB(testDigit);
				assert(testDigit !== c.arg_B, 'arg_B should not be set');
				done();
			});

			it('should note set arg_B as NaN', function () {
				const testData = NaN;
				c.setB(testData);
				assert(testData !== c.arg_B, 'arg_B should not be set ' + testData);
			});
		});

		describe('general setting Argument', () => {

			let c = null;

			before((done) => {
				c = new Calculator();
				done();
			});

			afterEach((done) => {
				c.arg_A = '';
				done();
			});

			it('if isNaN test', (done) => {
				c.setArg(NaN);
				assert(c.arg_A === '', 'could not change arg_A with NaN');
				done();
			});

			it('if isNull test', (done) => {
				c.setArg(null);
				assert(c.arg_A === '', 'could not change arg_A with null');
				done();
			});

			it('if operation is not set should set arg_A', (done) => {
				const testData = '1';
				c.setArg(testData);
				assert(c.arg_A === testData && c.arg_B === '');
				done();
			});

			it('if operation is set should set arg_B', (done) => {
				const testData = '1';
				c.operation = '+';
				c.setArg(testData);
				assert(c.arg_A === '' && c.arg_B === testData);
				done();
			});
		});
	});

	describe('Testing cancel operation', () => {
		it('should set calculator properties to default', (done) => {
			const c = new Calculator();
			c.arg_A = '1';
			c.arg_B = '5';
			c.operation = '/';
			c.cancel();
			assert(
				c.arg_A === '' &&
				c.arg_B === '' &&
				c.operation === null,
				'should reset calculator properties'
			);
			done();
		});
	});

	describe('Testing main functions', () => {

		describe('Testing PLUS function', () => {

			let c = null;

			before((done) => {
				c = new Calculator();
				done();
			});

			afterEach((done) => {
				c.arg_A = '';
				c.arg_B = '';
				done();
			});

			it('should return A + B', (done) => {
				c.arg_A = '1';
				c.arg_B = '2';
				assert(c.plus() === 3, ' "1" + "2" = 3');
				done();
			});

			it('should return float A + float B', (done) => {
				c.arg_A = '1.0';
				c.arg_B = '2.0';
				assert(c.plus() === 3.0, 'float + float');
				done();
			});

			it('should return float A + B', (done) => {
				c.arg_A = '1.0';
				c.arg_B = '2';
				assert(c.plus() === 3.0, 'float + int = float');
				done();
			});

			it('should return NaN if argument not set', (done) => {
				c.arg_B = '1';
				assert(isNaN(c.plus()), 'NaN if without argument');
				done();
			});

			it('should work correctly with negative numbers', (done) => {
				c.arg_A = '-1';
				c.arg_B = '2';
				assert(c.plus() === 1, '"-1" + "2" = 1');
				done();
			});

		});

		describe('Testing MINUS function', () => {

			let c = null;

			before((done) => {
				c = new Calculator();
				done();
			});

			afterEach((done) => {
				c.arg_A = '';
				c.arg_B = '';
				done();
			});

			it('should return A - B', (done) => {
				c.arg_A = '3';
				c.arg_B = '1';
				assert(c.minus() === 2, ' "3" - "1" = 2');
				done();
			});

			it('should return float A - float B', (done) => {
				c.arg_A = '4.0';
				c.arg_B = '1.0';
				assert(c.minus() === 3.0, 'float - float');
				done();
			});

			it('should return float A - B', (done) => {
				c.arg_A = '5.0';
				c.arg_B = '2';
				assert(c.minus() === 3.0, 'float - int = float');
				done();
			});

			it('should return NaN if argument not set', (done) => {
				c.arg_B = '1';
				assert(isNaN(c.minus()), 'NaN if without argument');
				done();
			});

			it('should return negative number if A < B', (done) => {
				c.arg_A = '1';
				c.arg_B = '2';
				assert(c.minus() === -1, '1 - 2 = -1');
				done();
			});

		});

		describe('Testing DIVIDE function', () => {

			let c = null;

			before((done) => {
				c = new Calculator();
				done();
			});

			afterEach((done) => {
				c.arg_A = '';
				c.arg_B = '';
				done();
			});

			it('should return A / B', (done) => {
				c.arg_A = '4';
				c.arg_B = '2';
				assert(c.divide() === 2, ' "4" + "2" = 2');
				done();
			});

			it('should return float A / float B', (done) => {
				c.arg_A = '9.0';
				c.arg_B = '3.0';
				assert(c.divide() === 3.0, 'float / float');
				done();
			});

			it('should return float A / B', (done) => {
				c.arg_A = '4.0';
				c.arg_B = '2';
				assert(c.divide() === 2.0, 'float / int = float');
				done();
			});

			it('should return NaN if argument not set', (done) => {
				c.arg_B = '1';
				assert(isNaN(c.divide()), 'NaN if without argument');
				done();
			});

			it('should work correctly with negative numbers', (done) => {
				c.arg_A = '-4';
				c.arg_B = '2';
				assert(c.divide() === -2, '"-4" + "2" = -2');
				done();
			});

			it('should return inf on division by zero', (done) => {
				c.arg_A = '1';
				c.arg_B = '0';
				assert(c.divide() === 'inf', '1 / 0 = inf');
				done();
			});

			it('should NOT divide 0 by 0', (done) => {
				c.arg_A = '0';
				c.arg_B = '0';
				assert(c.divide() === undefined, '0 / 0 = undefined');
				done();
			});

			it('int / int can be float', (done) => {
				c.arg_A = '5';
				c.arg_B = '2';
				assert(c.divide() === 2.5, '"5" / "2" = 2.5');
				done();
			});
		});

		describe('Testing MULTIPLY function', () => {
			let c = null;

			before((done) => {
				c = new Calculator();
				done();
			});

			afterEach((done) => {
				c.arg_A = '';
				c.arg_B = '';
				done();
			});

			it('should return A * B', (done) => {
				c.arg_A = '3';
				c.arg_B = '4';
				assert(c.multiply() === 12, ' "3" * "4" = 12');
				done();
			});

			it('should return float A * float B', (done) => {
				c.arg_A = '2.5';
				c.arg_B = '2.5';
				assert(c.multiply() === 6.25, 'float * float');
				done();
			});

			it('should return float A * B', (done) => {
				c.arg_A = '3.0';
				c.arg_B = '2';
				assert(c.multiply() === 6.0, 'float * int = float');
				done();
			});

			it('should return NaN if argument not set', (done) => {
				c.arg_B = '1';
				assert(isNaN(c.multiply()), 'NaN if without argument');
				done();
			});

			it('should work correctly with negative numbers', (done) => {
				c.arg_A = '-0.5';
				c.arg_B = '2';
				assert(c.multiply() === -1, '"-0.5" * "2" = -1');
				done();
			});
		});

	});

	describe('Testing calculation function', () => {

		let c = null;

		before((done) => {
			c = new Calculator();
			done();
		});

		// afterEach((done) => {
		// 	c.arg_A = c.arg_B = '';
		// 	c.operation = null;
		// 	done();
		// });

		it('if operation is not set', (done) => {
			assert(c.doCalc() === null, 'return null if operator was not set');
			done();
		});

		it('arg_A NOT set && arg_B set', (done) => {
			c.arg_B = '1';
			c.operation = '+';
			assert(c.doCalc() === 1, ' empty A turns to 0');
			done();
		});

		it('arg_A set && arg_B NOT set', (done) => {
			c.arg_A = '1';
			c.operation = '+';
			assert(c.doCalc() === 1, ' empty B turns to 0');
			done();
		});

		it('arg_A && arg_B NOT set', (done) => {
			c.operation = '*';
			assert(c.doCalc() === 0, 'empty params turn to 0');
			done();
		});

		it('args SET test -', (done) => {
			c.arg_A = '6';
			c.arg_B = '3';
			c.operation = '-';
			assert(c.doCalc() === 3, '"6"-"3" = 3');
			done();
		});

		it('args SET test *', (done) => {
			c.arg_B = '8';
			c.arg_A = '4';
			c.operation = '*';
			assert(c.doCalc() === 32, '"4"*"8" = 32');
			done();
		});

		it('args SET test /', (done) => {
			c.arg_A = '5';
			c.arg_B = '2';
			c.operation = '/';
			assert(c.doCalc() === 2.5, '"5"/"2" = 2.5');
			done();
		});

		it('incorrect operation set', (done) => {
			c.operation = '^';
			assert(c.doCalc() === null, 'ignore incorrect operation');
			done();
		});

		it('after doCalc Calculator should ' +
			'reset B && save result to A' +
			'&& save operation', (done) => {
			c.arg_A = '9';
			c.arg_B = '3';
			c.operation = '*';
			const result = c.doCalc();
			assert(
				c.arg_B === '' &&
				c.arg_A === result.toString() &&
				c.operation === '*'
			);
			done();
		});

	});

});


