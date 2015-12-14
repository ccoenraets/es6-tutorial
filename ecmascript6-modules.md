---
layout: module
---
# Unit 6: Modules

In this unit, you create a module that exposes the business logic related to a mortgage, and you build the application using Webpack.

## Step 1: Create the Module

1. Create a new file named `mortgage.js` in the `js` directory. 
 
1. Copy the `calculateMonthlyPayment` and `calculateAmortization` functions from `main.js` into `mortgage.js`.
 
1. Add the ```export``` keyword in front of both functions to make them available as part of the module public API. `mortgage.js` should now look like this: 

	```
	export let calculateMonthlyPayment = (principal, years, rate) => {
		let monthlyRate = 0;
		if (rate) {
			monthlyRate = rate / 100 / 12;
		}
		let monthlyPayment = principal * monthlyRate / (1 - (Math.pow(1/(1 + monthlyRate),
				years * 12)));
		return {principal, years, rate, monthlyPayment, monthlyRate};
	};
	
	export let calculateAmortization = (principal, years, rate) => {
		let {monthlyRate, monthlyPayment} = calculateMonthlyPayment(principal, years, rate);
		let balance = principal;
		let amortization = [];
		for (let y=0; y<years; y++) {
			let interestY = 0;  //Interest payment for year y
			let principalY = 0; //Principal payment for year y
			for (let m=0; m<12; m++) {
				let interestM = balance * monthlyRate;       //Interest payment for month m
				let principalM = monthlyPayment - interestM; //Principal payment for month m
				interestY = interestY + interestM;
				principalY = principalY + principalM;
				balance = balance - principalM;
			}
			amortization.push({principalY, interestY, balance});
		}
		return {monthlyPayment, monthlyRate, amortization};
	};
	```

## Step 2: Use the Module

1. In `main.js`, remove the ```calculateMonthlyPayment``` and ```calculateAmortization``` functions.

1. Add the following ```import``` statement as the first line in `main.js` to import the mortgage module:

	```
	import * as mortgage from './mortgage';
	```
	
1. In the **calcBtn** click event handler, modify the call to the ```calculateAmortization``` function as follows: 	
	
	```
    let {monthlyPayment, monthlyRate, amortization} = 
    	mortgage.calculateAmortization(principal, years, rate);
	```

## Step 3: Build and Run

1. On the command line, type the following command to rebuild the application:

	```
    npm run webpack
	```

1. Open a browser, access [http://localhost:8080](http://localhost:8080), and click the **Calculate** button.	
	
	
## Additional Resources

- [MDN: import](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/import)
- [MDN: export](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/export)
- [2ality: ECMAScript 6 modules: the final syntax](http://www.2ality.com/2014/09/es6-modules-final.html)

<div class="row" style="margin-top:40px;">
<div class="col-sm-12">
<a href="ecmascript-template-strings.html" class="btn btn-default"><i class="glyphicon glyphicon-chevron-left"></i> Previous</a>
<a href="ecmascript-classes.html" class="btn btn-default pull-right">Next <i class="glyphicon glyphicon-chevron-right"></i></a>
</div>
</div>

