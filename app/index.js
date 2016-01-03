
(function myBlog(){

  var app = {
	  
	DOMapi: domApiFunc(),
	DataApi: dataApiFunc(),
	addMenu: addMenuFunc,
	addSections: addSectionsFunc,
	registerEvents: registerEventsFunc,
	
	mainSectionsContainer: null,
	sections: null,
	menu: null,
    init: init
}

app.init();

function init() {

  this.addMenu();
  this.addSections();
  this.registerEvents();
}


function addMenuFunc() {
	
	function constructMenu() {
		
		var container = this.DOMapi.getContainer("main-nav");
		var newNav = document.createElement("nav");
		var newList = document.createElement("ul");
		newNav.appendChild(newList);		
		container.appendChild(newNav);

		var containerMov = this.DOMapi.getContainer("menu-mobile-container");
		var newNavMov = document.createElement("nav");
		var newListMov = document.createElement("ul");
		newNavMov.appendChild(newListMov);		
		containerMov.appendChild(newNavMov);


		function addList(item, index) {
			var index = index + 1;
			newList.innerHTML += "<li>"+(item.title + " " + index)+"</li>";
			newListMov.innerHTML += "<li>"+(item.title + " " + index)+"</li>";
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


function addSectionsFunc() {
	
	function constructSections() {
		
			var container = this.DOMapi.getContainer("main-sections-container");
			
			function addSections(item, index) {

				container.innerHTML+="<section><header><h2>"+(item.title)+"</h2></header><div class=\"full\"><span>more</span></div><article><img src=\""+(item.image)+"\"><p>"+(item.art)+"</p></article></section></br>";
			}


			this.DOMapi.addItems(this.sections, addSections)
	}

	function addSectionsToDOM(obj) {
		this.sections = obj.data.sections;
		constructSections.call(this);
	}

	this.DataApi.getData(addSectionsToDOM.bind(this));
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

function registerEventsFunc () {
	var menuMobileBtn = document.querySelector("#menu-mobile-btn"),
	menuMobileContainer = document.querySelector("#menu-mobile-container"),
	bodyTag = document.getElementsByTagName('body')[0],
	target = null;

	menuMobileBtn.addEventListener("touchstart", function (event) {
		target = event.target.localName === 'span' ? event.target.parentElement : event.target
		if (target.classList.length === 0) {
			bodyTag.classList.add('no-scroll');
			menuMobileContainer.classList.add('open');
			target.classList.add('open');
		}else {
			bodyTag.classList.remove('no-scroll');
			menuMobileContainer.classList.remove('open');
			target.classList.remove('open');
		};
	}, false);
}

})(); 