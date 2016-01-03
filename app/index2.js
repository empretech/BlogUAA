function addMenuFunc() {
	
	function constructMenu() {
		
		var container = this.DOMapi.getContainer("main-nav");
		var newNav = document.createElement("nav");
		var newList = document.createElement("ul");
		newNav.appendChild(newList);
		container.appendChild(newNav);

		function addList(item, index) {
			var index = index + 1;
			newList.innerHTML += "<li>"+(item.title + " " + index)+"</li>";
		}

		this.DOMapi.addItems(this.menu, addList)
	}

	function addMenuToDOM(obj) {
		this.sections = obj.data.sections;
		this.menu = obj.data.menu;
		constructMenu.call(this);
	}

	this.DataApi.getData(addMenuToDOM.bind(this));
};


function domApiFunc() {

	function getContainer(id) {		
		return document.getElementById(id);
	}

	function addItems(items, callBack) {
		for (var i = 0; i < items.length; i++) {
			callBack(items[i], i);
		};
	}

	var publicAPI = {
		getContainer: getContainer,
		addItems: addItems
	}

	return publicAPI;
};

function dataApiFunc() {

	var URLs = {
		get: "data/sections.json",
		post: "nothing yet"
	};

	function getData(callBack) {
		var xmlhttp = new XMLHttpRequest();
		xmlhttp.onreadystatechange = function() {
			if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
				callBack(JSON.parse(xmlhttp.responseText));
			};
		};

		xmlhttp.open("GET", URLs.get, true);
		xmlhttp.send();
	}

	function sendData() {
	//code to send data 
	//to server/WS
	}

	var publicAPI = {
		getData: getData,
		sendData: sendData
	}

	return publicAPI;
};

