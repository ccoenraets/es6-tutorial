---
layout: module
---
# Unit 8: Promises

Promises have replaced callback functions as the preferred programming style for handling asynchronous calls. A promise is a holder for a result (or an error) that will become available in the future (when the async call returns). Promises have been available in JavaScript through third-party libraries (for example, [jQuery](https://api.jquery.com/promise/) and [q](https://github.com/kriskowal/q)). ECMAScript 6 adds built-in support for promises to JavaScript. 
 
In this unit, you create a simple application called ratefinder that returns a list of available rates. 

## Part 1: Use a Promise

To illustrate the use of promises in this example, you use the new ```fetch()``` function. At the time of this writing, ```fetch()``` is available in the latest version of Chrome, Firefox, and Opera, but not in IE and Safari. You can read more about ```fetch()``` [here](http://jakearchibald.com/2015/thats-so-fetch/).

1. In the **es6-tutorial** directory, create a file named **ratefinder.html** implemented as follows:

    ```
    <!DOCTYPE html>
    <html>
    <head>
    	<meta charset="utf-8">
    </head>
    <body>
    	<table id="rates"></table>
        <script src="node_modules/babel-core/browser.js"></script>
        <script type="text/babel" src="ratefinder.js"></script>
    </body>
    </html>
    ```
 
1. In the **es6-tutorial** directory, create a file named **ratefinder.js** implemented as follows:

    ```
    let url = "rates.json";
    
    fetch(url)
        .then(response => response.json())
        .then(rates => {
          let html = '';
          rates.forEach(rate => html += `<tr><td>${rate.name}</td><td>${rate.years}</td><td>${rate.rate}%</td></tr>`);
          document.getElementById("rates").innerHTML = html;
        })
        .catch(e => console.log(e));
    ```
    
    > To keep things simple, this code uses a static data file: rates.json. The application would work the same way with a URL pointing to a remote service.
            
1. Test the application: Access [http://localhost:8080/ratefinder.html](http://localhost:8080/ratefinder.html).
          

## Part 2: Create a Promise

Most of the time, all you'll have to do is use promises returned by built-in or third-party APIs. Sometimes, you may have to create promises as well. In this section you create a mock data service to familiarize yourself with the process of creating ECMAScript 6 promises. The mock data service uses an asynchronous API so that it can replace an actual asynchronous data service for test or other purpose.

1. In the **modules** directory, create a new file named **mockservice.js** 

1. In mockservice.js, define a ```rates``` variable with some sample data:
 
    ```
    let rates = [
        {
            "name": "30 years fixed",
            "rate": "13",
            "years": "30"
        },
        {
            "name": "20 years fixed",
            "rate": "2.8",
            "years": "20"
        }
    ];
    ```
 
1. Define a ```findAll()``` function defined as follows:

    ```
    export let findAll = () => new Promise((resolve, reject) => {
        if (rates) {
            resolve(rates);
        } else {
            reject("No rates");
        }
    });
    ```
    
    This is equivalent to the following code using the traditional function syntax:

    ```
    export var findAll = function() {
        return new Promise(function (resolve, reject) {
            if (rates) {
                resolve(rates);
            } else {
                reject("No rates");
            }
        });
    }
    ```
1. Open **ratefinder.js**. Change the implementation as follows:

    ```
    import * as service from './modules/mockservice';
    
    service.findAll()
        .then(rates => {
            let html = '';
            rates.forEach(rate => html += `<tr><td>${rate.name}</td><td>${rate.years}</td><td>${rate.rate}%</td></tr>`);
            document.getElementById("rates").innerHTML = html;
        })
        .catch(e => console.log(e));
    ```

1. In your code editor, open **package.json** and add a **build-ratefinder** script. The scripts section of package.json should now look like this:

    ```
    "scripts": {
        "start": "http-server",
        "build-calc": "babel calc.js -o calc-bundle.js",
        "build-calc-modular": "browserify calc.js -t babelify -o calc-bundle.js",
        "build-ratefinder": "browserify ratefinder.js -t babelify -o ratefinder-bundle.js",
        "test": "echo \"Error: no test specified\" && exit 1"
    },
    ```

1. On the command line, make sure you are in the **es6-tutorial** directory and type the following command:
  
	```
	 npm run build-ratefinder
	```

1. In your code editor, open **ratefinder.html**. Remove the existing ```<script>``` tags and replace them with the following ```<script>``` tags:

	```
	<script src="ratefinder-bundle.js"></script>
	```

1. Test the application: Access [http://localhost:8080/ratefinder.html](http://localhost:8080/ratefinder.html).
    

## Additional Resources

- [MDN: Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise)
- [2ality: Promises](http://www.2ality.com/2014/09/es6-promises-foundations.html)
- [MDN: Fetch](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch)

<div class="row" style="margin-top:40px;">
<div class="col-sm-12">
<a href="ecmascript-classes.html" class="btn btn-default"><i class="glyphicon glyphicon-chevron-left"></i> Previous</a>
<a href="next.html" class="btn btn-default pull-right">Next <i class="glyphicon glyphicon-chevron-right"></i></a>
</div>
</div>
