(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj['default'] = obj; return newObj; } }

var _modulesMortgage = require('./modules/mortgage');

var mortgage = _interopRequireWildcard(_modulesMortgage);

document.getElementById('calcBtn').addEventListener('click', function () {
    var principal = document.getElementById('principal').value;
    var years = document.getElementById('years').value;
    var rate = document.getElementById('rate').value;

    var _mortgage$calculateAmortization = mortgage.calculateAmortization(principal, years, rate);

    var monthlyPayment = _mortgage$calculateAmortization.monthlyPayment;
    var monthlyRate = _mortgage$calculateAmortization.monthlyRate;
    var amortization = _mortgage$calculateAmortization.amortization;

    document.getElementById('monthlyPayment').innerHTML = monthlyPayment.toFixed(2);
    document.getElementById('monthlyRate').innerHTML = (monthlyRate * 100).toFixed(2);
    amortization.forEach(function (month) {
        return console.log(month);
    });
    var html = '';
    amortization.forEach(function (year, index) {
        return html += '\n        <tr>\n            <td>' + (index + 1) + '</td>\n            <td class="currency">' + Math.round(year.principalY) + '</td>\n            <td class="stretch">\n                <div class="flex">\n                    <div class="bar principal" style="flex:' + year.principalY + ';-webkit-flex:' + year.principalY + '"></div>\n                    <div class="bar interest" style="flex:' + year.interestY + ';-webkit-flex:' + year.interestY + '"></div>\n                </div>\n            </td>\n            <td class="currency left">' + Math.round(year.interestY) + '</td>\n            <td class="currency">' + Math.round(year.balance) + '</td>\n        </tr>\n    ';
    });
    document.getElementById('amortization').innerHTML = html;
});

},{"./modules/mortgage":2}],2:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
var calculateMonthlyPayment = function calculateMonthlyPayment(principal, years, rate) {
    var monthlyRate = 0;
    if (rate) {
        monthlyRate = rate / 100 / 12;
    }
    var monthlyPayment = principal * monthlyRate / (1 - Math.pow(1 / (1 + monthlyRate), years * 12));
    return { principal: principal, years: years, rate: rate, monthlyPayment: monthlyPayment, monthlyRate: monthlyRate };
};

exports.calculateMonthlyPayment = calculateMonthlyPayment;
var calculateAmortization = function calculateAmortization(principal, years, rate) {
    var _calculateMonthlyPayment = calculateMonthlyPayment(principal, years, rate);

    var monthlyRate = _calculateMonthlyPayment.monthlyRate;
    var monthlyPayment = _calculateMonthlyPayment.monthlyPayment;

    var balance = principal;
    var amortization = [];
    for (var y = 0; y < years; y++) {
        var interestY = 0; //Interest payment for year y
        var principalY = 0; //Principal payment for year y
        for (var m = 0; m < 12; m++) {
            var interestM = balance * monthlyRate; //Interest payment for month m
            var principalM = monthlyPayment - interestM; //Principal payment for month m
            interestY = interestY + interestM;
            principalY = principalY + principalM;
            balance = balance - principalM;
        }
        amortization.push({ principalY: principalY, interestY: interestY, balance: balance });
    }
    return { monthlyPayment: monthlyPayment, monthlyRate: monthlyRate, amortization: amortization };
};
exports.calculateAmortization = calculateAmortization;

},{}]},{},[1]);
