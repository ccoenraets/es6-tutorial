---
layout: module
---
# Unit 2: Using ```let``` Variables

ECMAScript 6 introduces a new keyword to declare variables: ```let```. Unlike variables declared with ```var``` that are function-scoped, variables declared with ```let``` are block-scoped: they only exist in the block they are defined in.

In this unit, you modify the application to use ```let``` variables. You also experiment with two different approaches to use ECMAScript 6 in current browsers: Build-Time transpilation and In-Browser transpilation.  


## Part 1: Build-Time Transpilation 

1. In your code editor, open **calc.js** and replace all the occurrences of ```var``` with ```let```. **Don't change anything else yet**. 

	> calc.js now includes ECMAScript 6 code and will no longer work in ECMAScript 5 browsers. You need to use a transpiler to convert your ECMAScript 6 code to ECMAScript 5 compatible code. [Babel](http://babeljs.io/) and [Traceur](https://github.com/google/traceur-compiler/) are two popular options. We use Babel in this tutorial.  

1. Install Babel in your project. On the command line, make sure you are in the **es6-tutorial** directory and install the **babel** and **babel-core** modules:

	```
	npm install babel babel-core --save-dev
	```
	
1. In your code editor, open **package.json** and add a script named **build-calc** (right after the **start** script). The **scripts** section of **package.json** should now look like this:

    ```
    "scripts": {
        "start": "http-server",
        "build-calc": "babel calc.js -o calc-bundle.js",
        "test": "echo \"Error: no test specified\" && exit 1"
    },
    ```

	> There are different approaches to install and run Babel. For example, you could also install Babel globally and run it from the command line. Refer to the [Using Babel](http://babeljs.io/docs/setup/) documentation for more information.

1. Open a new command prompt, and type the following command to run the **build-calc** script and let Babel generate an ECMAScript 5 version of calc.js in calc-bundle.js:

	```
	 npm run build-calc
	```

1. In your code editor, open **index.html** and modify the ```<script>``` tag as follows to load the ECMAScript 5-compatible **calc-bundle.js** instead of **calc.js**:

	```
	<script src="calc-bundle.js"></script>
	```

1. Test the application. Open a browser and access [http://localhost:8080](http://localhost:8080). Click the **Calculate** button: **it doesn't work**. Open the developer console. You should see a message similar to this:
	
	![](images/unit02-error.jpg)
	
	
	This is because unlike ```var``` variables which are **function-scoped**, ```let``` variables are **block-scoped**: they only exist in the block they are defined in. 

1. In your code editor, open **calc.js** and modify the ```calculateMonthlyPayment``` function as follows:

    ```
    let calculateMonthlyPayment = function(principal, years, rate) {
        let monthlyRate = 0;
        if (rate) {
            monthlyRate = rate / 100 / 12;
        }
        let monthlyPayment = principal * monthlyRate / (1 - (Math.pow(1/(1 + monthlyRate),
        						years * 12)));
        return monthlyPayment;
    };
    ```

1. Rebuild the application:

	```
	 npm run build-calc
	```

1. Access [http://localhost:8080](http://localhost:8080) again. Click the **Calculate** button: you should now see the monthly payment.

	> If you are still seeing the error, make sure you clear your browser's cache and refresh the page.

## Part 2: In-Browser Transpilation 

Build-time transpilation is generally the best option. However, during development, you can also use on-the-fly in-browser transpilation to iterate quickly. 

> You should not use in-browser transpilation in production.

To use in-browser transpilation:

1. In your code editor, open **index.html**. Replace the existing ```<script>``` tag with the following ```<script>``` tags:

	```
	<script src="node_modules/babel-core/browser.js"></script>
	<script type="text/babel" src="calc.js"></script>
	```

	The ```type="text/babel"``` attribute indicates that the browser should not treat the content as JavaScript but as regular text that **browser.js** will transpile on the fly. 

1. Access [http://localhost:8080](http://localhost:8080) again, and click the **Calculate** button.

> Further changes to calc.js will now be picked up automatically when you refresh the page: No build required.


## Additional Resources

- [Babel](http://babeljs.io/) 
- [Traceur](https://github.com/google/traceur-compiler/)
- [ES6 compatibility table](https://kangax.github.io/compat-table/es6/)
- [MDN let variables](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/let)

<div class="row" style="margin-top:40px;">
<div class="col-sm-12">
<a href="setup-environment.html" class="btn btn-default"><i class="glyphicon glyphicon-chevron-left"></i> Previous</a>
<a href="ecmascript-destructuring.html" class="btn btn-default pull-right">Next <i class="glyphicon glyphicon-chevron-right"></i></a>
</div>
</div>
