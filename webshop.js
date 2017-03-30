window.onload = function(){ "use strict";
 
let addArtist = document.getElementById("addArtist");
let addAlbum = document.getElementById("addAlbum"); 
let addGenre = document.getElementById("addGenre");
let addYear = document.getElementById("addYear");                           
let table = document.getElementById("table");
let addBtn = document.getElementById("add");
let sortByArtistBtn = document.getElementById("sortByArtist");
let sortByAlbumBtn = document.getElementById("sortByAlbum");
let sortByGenreBtn = document.getElementById("sortByGenre");
let sortByYearBtn = document.getElementById("sortByYear");                           
let totalProducts = 0;
                        
                           
/*Event listeners*/ 
getAndWrite();                           

addBtn.addEventListener("click", function(event){
    saveToFirebase();
    addProductToTable();
});  
                           
sortByArtistBtn.addEventListener("click", function(event){
	sortByArtist();
});
                           
sortByAlbumBtn.addEventListener("click", function(event){
    sortByAlbum();
});
                           
sortByGenreBtn.addEventListener("click", function(event){
    sortByGenre();
});
                           
sortByYearBtn.addEventListener("click", function(event){
   sortByYear(); 
});
                           
                           
/*Functions*/ 
  
function saveToFirebase(){ 
    let object = {
        artist: addArtist.value,
        album: addAlbum.value,
        genre: addGenre.value,
        year: addYear.value,
        id: totalProducts
    }
    
    firebase.database().ref('products/' + totalProducts).set(object);
    addArtist.value = ""; 
    addAlbum.value = ""; 
    addGenre.value = "";
    addYear.value = "";
};

function getAndWrite(){                           
    firebase.database().ref("products/").on("value", function(snapshot) {
        let data = snapshot.val();
        totalProducts = data.length;
        table.innerHTML = "";
        addProductToTable(data);
    })
};
  
    
function addProductToTable(data) { //Funktion som lägger till inputvalue i tabellenlet
    for (let object in data) {
    let tr = document.createElement("tr");
    tr.innerHTML = "<td>" + data[object].artist + "<td>" + data[object].album + "<td>" + data[object].genre + "<td>" + data[object].year;
    table.appendChild(tr);
    console.log("Tillagt i tabellen");
    }
    
};
                           
function addToTable(data){
    let newTr = document.createElement("tr");
    newTr.innerHTML = "<td>" + data.artist + "<td>" + data.album + "<td>" + data.genre + "<td>" + data.year;
    table.appendChild(newTr);
}
                           
 function sortByArtist() {
    table.innerHTML = "";
	   firebase.database().ref("products/").orderByChild("artist").once("value", function(snapshot){
        snapshot.forEach( productRef => {
	addToTable(productRef.val());  
        })
    })
    console.log("Artistsortering genomförd.")   
 }   
                           
 function sortByAlbum() {
    table.innerHTML = "";
	   firebase.database().ref("products/").orderByChild("album").once("value", function(snapshot){
        snapshot.forEach( productRef => {
	addToTable(productRef.val());  
        })
    })
    console.log("Albumsortering genomförd.")    
 }
   
 function sortByGenre() {
    table.innerHTML = "";
	   firebase.database().ref("products/").orderByChild("genre").once("value", function(snapshot){
        snapshot.forEach( productRef => {
	addToTable(productRef.val());  
        })
    })
    console.log("Genresortering genomförd.")    
 } 
                           
 function sortByYear() {
    table.innerHTML = "";
	   firebase.database().ref("products/").orderByChild("year").once("value", function(snapshot){
        snapshot.forEach( productRef => {
	addToTable(productRef.val());  
        })
    })
    console.log("Årssortering genomförd.")    
 }                           
}