var  button = document.getElementsByClassName("connect_button_container");
if(button.length > 0)
{
	button[0].addEventListener('click',
		function(event)
		{
			if(!confirm(chrome.i18n.getMessage("confirm")))
			{
				event.stopPropagation();
				
				//Trigger fake edgeCreate Event
				var body = document.getElementsByTagName("body")[0];
				fakeEdgeCreate = document.createElement('script');
				fakeEdgeCreate.innerHTML = "UnverifiedXD.send({type: 'edgeCreated'});";
				body.appendChild(fakeEdgeCreate);
				
				return false;  
			}

		}
		,true);
}