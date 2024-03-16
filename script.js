import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getDatabase, push, ref, onValue, remove} from "https://www.gstatic.com/firebasejs/10.8.0/firebase-database.js";

const fireBaseConfig={
    databaseURL:"https://songs-playground-default-rtdb.firebaseio.com/"
}


const app=initializeApp(fireBaseConfig);
const db=getDatabase(app);
const songs=ref(db,"Songs")

const archiveSongs=ref(db,"Songs");
onValue(archiveSongs,(snapshot)=>{
    if(snapshot.exists()){
        let archiveSongsArray= Object.entries(snapshot.val());
        clearListitems();
    
        for(let i=0;i<archiveSongsArray.length;i++){
            let currVal=archiveSongsArray[i];
            // let currValKey=currVal[0];
            // let currValSong=currVal[1];
            // console.log(currValKey);
            addNewItemtolistItems(currVal);
        }
    } else{
        listItems.innerText="No items here yet...";
    }
   
    // console.log(archiveSongsArray);
})

const ele1=document.getElementById("input");
const ele2=document.getElementById("add-button");
const listItems=document.getElementById("song-names");

ele2.addEventListener("click",()=>{
    let newSong=ele1.value;
    if(ele1.value!=""){
        push(songs,newSong);
        console.log(`${newSong} added to db`);

        // addNewItemtolistItems(newSong);
    }
    clearInput();
})

const clearInput=()=>{
    ele1.value="";
}

function addNewItemtolistItems(newSong) {
    // listItems.innerHTML += `<li>${newSong}</li>`
    let itemID=newSong[0];
    let itemValue=newSong[1];
    let newEl=document.createElement("li");
    newEl.textContent=itemValue;
    listItems.append(newEl);

    newEl.addEventListener("click",()=>{
        console.log(`Removing ${itemValue}`);
        let itemIDtobeDeleted=ref(db,`Songs/${itemID}`);
        remove(itemIDtobeDeleted);
    });
}

function clearListitems(){
    listItems.innerHTML="";
}

