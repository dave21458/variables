// _arg is the method for adding new collections
var _arg = require('./bb')._arg;
//_args is the set of methods and properties
var _args = require('./bb');
// new collection of variables named 'myVar'
var _a = _arg('myVar');
// create a new vars x,y,z
_a.x = 'hello';
_a.y = 'world';
_a.z = function(){return _a.x + " " + _a.y};
console.log(_a.z());
// create many vars and even new collection with vars
var newargs = _arg({
	myVar:{
		a:'hello', 
		b:'again', 
		c:function(){return _a.a + " " + _a.b}
	},
	myVar1:{
		x:'hello',
		y:'from other set',
		z : function(){return _b.x + " " + _b.y}
	},
	myVar2:{
		j:'hello',
		k:'from new set',
		l : function(){return this.j + " " + this.k}
	}
});
var _b = newargs[1];
console.log(_a.c());
console.log(_b.z());
//get a collection ref
var _c =  _args._models._byId[_args._ids['myVar2']];
// or
var _c_again = new _arg('myVar2');
console.log(_c_again.l());
// all new vars from any collection are added to global set
_args._global.myVar1.y = 'reference through "global set"';
console.log(_args._global.myVar1.z());
// list all vars
console.log(_args._global);
// list vars in a collection
console.log(_b);
//get a list of collection cid by name;
console.log(_args._ids);

// work in progress bind beta
_a.y = 'from bind';
_b.f= function(x){return x.x + " " + x.y};
_b.f = _args._bind(_b.f,'myVar');
console.log(_b.f());
