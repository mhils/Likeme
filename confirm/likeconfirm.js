document.getElementsByClassName("connect_button_container")[0].addEventListener('click',
	function(event)
	{
		if(!confirm(chrome.i18n.getMessage("confirm")))
		{
			event.stopPropagation();
			
			//Trigger fake edgeCreate Event
			fakeEdgeCreate = document.createElement('script');
			fakeEdgeCreate.innerHTML = "UnverifiedXD.send({type: 'edgeCreated'});";
			document.body.appendChild(fakeEdgeCreate);
			
			return false;  
		}

	}
	,true);