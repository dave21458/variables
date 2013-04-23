variables
=========

javascript variable management library
A variable managment tool to allow variables to be passed as an object.
by passing a single argument gives any function full access to all or part of variables within your project.
all variables are set as a key:value object. 
easily create new collections of variavbles, easily add new variables to these collection.
variables added to collection can be any javascript var or even other collections of variables.

example:
//quick access to declaring vaiable collections and variables

var _arg = require('variables')._arg;

//access to methods for variable collections

var _args = require('./variables');

//create or get variable key:value object

var var1 = _arg('var1');

//create and assign variables a value;

var1.a = 2;

var1.b = 3;

var1.mult = function(v){return v.a * v.b};

var1.mult(var1);// 6

//create multiple collections and define variables to those collections

var vars1 = _arg({var2:{a:2,b:3,div:function(v){return v.b/v.a}},var3:{a:2,b:4,mult:var1.mult}})

var var2 = vars1[0];

var var3 = _arg('var3');

var2.div(var3); // 2

// use a method to bind a collection of variables to a function

var3.mult = _args._bind(var3.mult,'var1');

var1.b = 4;

var3.mult(); // 8

//get a all variables in all collections

_args._global;
