var backbone, r, util, _, events, _model, _models, models , mod, ids, exports, addargs, addcollection, bind, _arg, global;

r = require;
_ = r('underscore');
backbone = r('backbone');
//new vars collection model creation
_model = backbone.Model.extend({
	defaults:{
		
	},
	initialize: function(opts) {
		_.extend(this, opts);
	}
});

_models = backbone.Collection.extend({
  model: _model
});

models = new _models;

//a refernce list of collections names and collection cids
ids={};

//use this to get collection variable object, or add several variables to a collection
//adds variables to a collection ,creates collection if doesn't exist,
//values = {collectionname:{variablename:value,...},...}
//or values = ('collectionname')
//or values = (['collectionname',...])
//if only 1 collection name specified returns collection object
//if more than 1 returns array of collection objects
addargs = function(values){
	var key,keys,mod,ret,value,fill,cnt;
	ret = [];
	fill =[];
	value = new Object;
	if(!_.isObject(values) || _.isArray(values)){
		if(_.isString(values))value[values]=new Object;
		for(cnt = 0;cnt < values.length; cnt++)fill.push(new Object);
		if( _.isArray(values))value = _.object(values,fill);
		values = value;
	}
	for(keys in values){
		ret.push(addCollection(keys));
		mod = models._byId[ids[keys]];
		for(key in values[keys]){mod.set(key,values[keys][key])};
	}
	if(ret.length == 1)ret = ret[0];
	return ret;
}

// bind a collection of variables to a function !!BETA
bind = function(func,modName){
	if(_.isFunction(func)){
		return  _.partial(func,models._byId[ids[modName]].attributes)
	}
	return func;
}
binds = function(values){
	var fun = models._byId[ids[values.function]];
	if(_.isFunction(fun)){
		fun = _.partial(func,models._byId[ids[values.argName]].attributes)
	}
	return fun;
} 

// used internally to create new instances of variable collection
addCollection = function(name){
	if(!(mod = models._byId[ids[name]])){
		mod = new models.model
		models.add(mod);
		ids[name] = mod.cid;
		if(models.length > 1){
			models.models[0].attributes[name] = mod.attributes;
			exports._ids[name] = ids[name];
		}
	}
	return mod.attributes
}

global = addCollection('global');

exports = {_arg:addargs, _models:models, _global:global, _bind:bind, _ids:ids ,_VERSION:"0.1.4"}

module.exports = exports;
