"use strict";

import Calculator from './calc.js';

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
