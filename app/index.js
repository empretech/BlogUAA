(function myBlog(){

  var head="variable1";
  var par="contenido del parafo";

  var app = {
    myDOMapi: domApiFunc(),
    addSections: addSectionsFunc,
    mainContainer: null,
    init: init
}

app.init();

function init() {

  this.addSections();
}

function addSectionsFunc(){
   this.mainContainer = this.myDOMapi.getSectionContainer('main-sections-container');
  var sections = [   //do request for sections(AJAX)
    '<section><header><h2>'+head+'</h2></header><div class="full"><span>more</span></div><article><img src="android-5-0-lollipop-material-2961.jpg" alt="Terrific new"><p>'+par+'</p></article></section><br/>',
    '<section><header><h2>terrific new</h2></header><div class="full"><span>more</span></div><article><img src="android-5-0-lollipop-material-2961.jpg" alt="Terrific new"><p></p></article></section><br/>',
    '<section><header><h2>terrific new</h2></header><div class="full"><span>more</span></div><article><img src="android-5-0-lollipop-material-2961.jpg" alt="Terrific new"><p></p></article></section><br/>'
    ];
    function addItemHTML(item){
      this.mainContainer.innerHTML += item;
    }
    this.myDOMapi.addItems(sections, addItemHTML.bind(this));
}

/*function updateArticleText(){
  var sections = this.myDOMapi.getSections('.section');
  for (var i = i < section.length; i++) {
    var els = sections[i].children[3].getElementsByTagName('p');
    for (var x = x < section.length; x++){
      els[x].textContent = "lorem";
    };
  };
}*/

function domApiFunc(){
  function getSectionContainer(id){
    return document.getElementById(id);
  }
  function addItems(items, callBack){
    for (var i = 0; i < items.length; i++) {
        callBack(items[i]);
    };
  }
  var publicAPI = {
    getSectionContainer: getSectionContainer,
    addItems: addItems
  }
  return publicAPI;
};

})();
