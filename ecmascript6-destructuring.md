---
layout: module
---
# 3. Using Destructuring

ECMAScript 6 introduces new syntax that makes it easy to create objects based on variables. Conversely, the new object and array destructuring syntax makes it easy to create variables based on objects and arrays. 

In this unit, you modify the calculateMonthlyPayment function to return multiple values: the monthly payment, the monthly rate, and the other mortgage parameters. The new ECMAScript 6 object creation and destructuring syntax makes it easy to implement this change.

## Step 1: Creating Objects from Variables

1. Open `js/main.js` in your code editor. 

1. Modify the return statement of the ```calculateMonthlyPayment``` function as follows:

    ```
    return {principal, years, rate, monthlyPayment, monthlyRate};
    ```

    This is a shorthand for the following ECMAScript 5 syntax:

    ```
    return { principal: principal, 
             years: years, 
             rate: rate, 
             monthlyPayment: monthlyPayment, 
             monthlyRate: monthlyRate };
    ```
    
    
## Step 2: Creating Variables from an Object using Destructuring
    
1. Open **index.html**. Add the ```<h3>``` block below to display the **monthly rate** right under the **monthly payment**:

    ```
    <h2>Monthly Payment: <span id="monthlyPayment" class="currency"></span></h2>
    <h3>Monthly Rate: <span id="monthlyRate" class="currency"></span></h3>
    ```

1. Open `main.js`. In the **calcBtn** click event handler, modify the call to ```calculateMonthlyPayment``` as follows:

    ```   
    let {monthlyPayment, monthlyRate} = calculateMonthlyPayment(principal, years, rate);
    ```

    This is a shorthand for the following ECMAScript 5 code:
    
    ```
    var mortgage = calculateMonthlyPayment(principal, years, rate);
    var monthlyPayment = mortgage.monthlyPayment;
    var monthlyRate = mortgage.monthlyRate;
    ```

1. As the last line of the **calcBtn** click event handler, add the following code to display the monthly rate right after the monthly payment:

    ```
    document.getElementById("monthlyRate").innerHTML = (monthlyRate * 100).toFixed(2);
    ```

## Step 3: Build and Run

1. On the command line, type the following command to rebuild the application:

    ```
    npm run babel
    ```

1. Open a browser, access [http://localhost:8080](http://localhost:8080), and click the **Calculate** button.

    ![](images/unit03.jpg)
    
    
## Additional Resources

- [MDN: Destructuring assignment](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment)
- [2ality: Destructuring and parameter handling in ECMAScript 6](http://www.2ality.com/2015/01/es6-destructuring.html)

<div class="row" style="margin-top:40px;">
<div class="col-sm-12">
<a href="ecmascript6-let.html" class="btn btn-default"><i class="glyphicon glyphicon-chevron-left"></i> Previous</a>
<a href="ecmascript6-arrow-functions.html" class="btn btn-default pull-right">Next <i class="glyphicon glyphicon-chevron-right"></i></a>
</div>
</div>
