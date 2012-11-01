var  button = document.getElementsByClassName("pluginConnectButton");
if(button.length > 0)
{
	button[0].addEventListener('click',
		function(event)
		{
			if(!confirm(chrome.i18n.getMessage("confirm")))
			{
				event.stopImmediatePropagation();
				event.preventDefault();
				
				//Trigger fake edgeCreate Event
				var body = document.getElementsByTagName("body")[0];
				fakeEdgeCreate = document.createElement('script');
				
				fakeEdgeCreate.innerHTML = "require(['XD'],function(XD){XD.UnverifiedXD.send({type: 'edgeCreated'})})";
				body.appendChild(fakeEdgeCreate);
				
				return false;  
			}

		}
		,true);
}