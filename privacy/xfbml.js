var xfbml_calls = [];
var xfbml_call = function(name,arguments) {
	xfbml_calls.push(name,arguments);
	console.debug("XFBML-Call: "+name,arguments);
	return undefined;
}
var invalidate = function (obj, prefix){
	if(obj instanceof HTMLElement)
		return null;
	for(var k in obj) {
		if(obj.hasOwnProperty(k))
		{
			if(typeof(obj[k]) == "object")
				invalidate(obj[k],prefix + "." + k);
			else if (typeof(obj[k]) == "function")
			{
				obj[k] = (function(name){
							return function(){ xfbml_call(name, arguments);   }
							})(prefix + "." + k);
			}
		}
	}
};
invalidate(FB,"FB");

function dump(obj,out)
{
	function isNumber(n) {
	  return !isNaN(parseFloat(n)) && isFinite(n);
	}
	if(obj instanceof HTMLElement)
		return "null";
	if(out==undefined || out ==null)
		out = 0;
	if(out>15)
		return "null";
	if($.isFunction(obj))
		return "fbFakeHandler";//"function(){}";
	else if(obj == null)
		return "null";
	else if(isNumber(obj))
		return obj+"";
	else if(obj.length === undefined)
	{
		var x = "{";
		for(key in obj)
		{
			if(!obj.hasOwnProperty(key))
				continue;
			x += '"'+key+'":'+dump(obj[key],out+1)+',';
		}
		if(x.length >1)
			x = x.slice(0,-1);
		x += "}"
		return x;
	}
	else if($.isArray(obj))
	{
		var x = "[";
		for(var i=0;i<obj.length;i++)
		{
			x += dump(obj[i],out+1)+",";
		}
		if(x.length >1)
			x = x.slice(0,-1);
		x += "]"
		return x;
	}
	else
		return '"'+obj.replace(/"/g,"\\\"")+'"';
}