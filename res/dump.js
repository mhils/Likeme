/*
Didn't have a script at hand for dumping the FB js. This one is not for general purpose (escaping not complete)
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
*/