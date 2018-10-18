module.exports = class Calculator {

	constructor() {
		this.arg_A = '';
		this.arg_B = '';
		this.operation = null;
		this.ops = ['+', '-', '/', '*'];
	}

	//main functions
	plus() {
		return parseFloat(this.arg_A) + parseFloat(this.arg_B);
	}
	minus() {
		return parseFloat(this.arg_A) - parseFloat(this.arg_B);
	}
	divide() {

		if (this.arg_A === '0' && this.arg_B === '0') {
			return undefined;
		}

		if (this.arg_B === '0') {
			return 'inf';
		}

		return parseFloat(this.arg_A) / parseFloat(this.arg_B);
	}
	multiply() {
		return parseFloat(this.arg_A) * parseFloat(this.arg_B);
	}

	setFunc(funChar) {
		if (this.ops.find((tmp) => {return tmp === funChar;})) {
			this.operation = funChar;
		}
	}

	setA(A) {
		if (A !== null) {
			this.arg_A += A;
		}
	}

	setB(B) {
		if (B !== null) {
			this.arg_B += B;
		}
	}

	setArg(C) {
		if (!isNaN(parseFloat(C)) && C !== null) {

			if (this.operation == null) {
				this.setA(C);
				return;
			}

			this.setB(C);
		}
	}

	cancel() {
		this.arg_A = this.arg_B = '';
		this.operation = null;
	}

	doCalc() {
		let result = null;

		if (this.operation) {
			if (this.arg_A === '') {
				this.arg_A = '0';
			}
			if (this.arg_B === '') {
				this.arg_B = '0';
			}
			switch (this.operation) {
				case '+': result = this.plus(); break;
				case '-': result = this.minus(); break;
				case '/': result = this.divide(); break;
				case '*': result = this.multiply(); break;
				default: return result;
			}

			this.arg_B = '';
			this.arg_A = result.toString();
			return result;
		}

		return result;
	}
};

const c = new Calculator();

// set listeners

['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'].forEach((digit) => {
	document.getElementById('digit_' + digit).onclick = (e) => {
		// let digit = e.target.id.slice(-1);
		let digit = e.target.innerHTML;
		c.setArg(parseInt(digit));
	};
});

document.getElementById('clear').onclick = () => {
	c.cancel();
};

document.getElementById('op_is').onclick = function () {
	alert(c.doCalc());
};


document.getElementById('op_divide').onclick = () => {
	c.setFunc('/')
};

document.getElementById('op_multiply').onclick = () => {
	c.setFunc('*')
};

document.getElementById('op_plus').onclick = () => {
	c.setFunc('+')
};
document.getElementById('op_minus').onclick = () => {
	c.setFunc('-')
};
