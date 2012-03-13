
/*
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
*/


function dump(obj,prefix)
{
	function isNumber(n) {
	return !isNaN(parseFloat(n)) && isFinite(n);
	}
	if(!prefix)
		prefix = "FB";
	if(obj == null || obj instanceof HTMLElement ) //HTMLElement -> circular -> not dumpable
		return "null";
	if($.isFunction(obj))
	{
		var whiteList = ["FB.JSON","FB.Array","FB.$","FB.string"]; //should be nosideeffect ones
		for(var i = 0; i < whiteList.length; i++)
		{
			if(prefix.indexOf(whiteList[i]) == 0)
				return obj +"";
		}
		return "function(){ xfbml_call(\""+ prefix +"\", arguments);   }";
	}
		
	else if(isNumber(obj))
		return obj+"";
	else if(obj.length === undefined)
	{
		var x = "{";
		for(key in obj)
		{
			if(obj.hasOwnProperty(key))
				x += '"'+key+'":'+dump(obj[key],prefix+"."+key)+',';
		}
		if(x.length >1) //remove trailing comma
			x = x.slice(0,-1);
		x += "}"
		return x;
	}
	else if($.isArray(obj))
	{
		var x = "[";
		for(var i=0;i<obj.length;i++)
		{
			x += dump(obj[i],prefix+"["+i+"]")+",";
		}
		if(x.length >1)
			x = x.slice(0,-1);
		x += "]"
		return x;
	}
	else
		return '"'+obj.replace(/"/g,"\\\"")+'"';
}