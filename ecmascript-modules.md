---
layout: module
---
# Unit 6: Modules

Modules have been available in JavaScript through third-party libraries. ECMAScript 6 adds native support for modules to JavaScript. ECMAScript 6 modules are inspired by both AMD and CommonJS modules. 

In this unit, you create a module that exposes the business logic related to a mortgage.

## Step 1: Create the Module

1. In the **es6-tutorial** directory, create a new directory named **modules**.
 
1. In the new **modules** directory, create a new file named **mortgage.js**. 
 
1. Copy the ```calculateMonthlyPayment``` and ```calculateAmortization``` functions from **calc.js** into **mortgage.js**.
 
1. Add the ```export``` keyword in front of both functions to make them available as part of the module public API. **mortgage.js** should now look like this: 

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

1. In **calc.js**, remove the ```calculateMonthlyPayment``` and ```calculateAmortization``` functions.

1. Import the mortgage module. Add the following ```import``` statement as the first line in **calc.js**:

	```
	import * as mortgage from './modules/mortgage';
	```
	
1. In the **calcBtn** click event handler, modify the invocation of the ```calculateAmortization``` function as follows: 	
	
	```
    let {monthlyPayment, monthlyRate, amortization} = 
    	mortgage.calculateAmortization(principal, years, rate);
	```
	
## Step 3: Build the Project

When you transpile an application, you are creating an ECMAScript 5-compatible version of an ECMAScript 6 application. If your application uses modules, the transpiler relies on a third party library to implement modules in ECMAScript 5. [Browserify](http://browserify.org/) and [Webpack](http://webpack.github.io/) are two popular options, and Babel supports both (and others). We use Browserify in this tutorial.

1. On the command line, make sure you are in the **es6-tutorial** directory and install the **browserify** and **babelify** modules:
   
   	```
   	npm install browserify babelify --save-dev
   	```


1. In your code editor, open **package.json** and add a **build-calc-modular** script (right after the **build-calc** script). The scripts section of package.json should now look like this:

    ```
    "scripts": {
        "start": "http-server",
        "build-calc": "babel calc.js -o calc-bundle.js",
        "build-calc-modular": "browserify calc.js -t babelify -o calc-bundle.js",
        "test": "echo \"Error: no test specified\" && exit 1"
    },
    ```
    
    > We use this simple local installation and npm build approach in this tutorial, but depending on your overall development and build environment you may prefer a different option to install and run Browserify. 

1. On the command line, make sure you are in the **es6-tutorial** directory and type the following command:
  
	```
	 npm run build-calc-modular
	```

1. In your code editor, open index.html. Remove the two existing ```script``` tags and replace them with the following:

	```
	<script src="calc-bundle.js"></script>
	```

1. Test the application: Access [http://localhost:8080](http://localhost:8080), and click the **Calculate** button.

## Additional Resources

- [2ality: ECMAScript 6 modules: the final syntax](http://www.2ality.com/2014/09/es6-modules-final.html)
- [MDN: import](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/import)
- [MDN: export](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/export)

<div class="row" style="margin-top:40px;">
<div class="col-sm-12">
<a href="ecmascript-template-strings.html" class="btn btn-default"><i class="glyphicon glyphicon-chevron-left"></i> Previous</a>
<a href="ecmascript-classes.html" class="btn btn-default pull-right">Next <i class="glyphicon glyphicon-chevron-right"></i></a>
</div>
</div>

