function read_display_Quote() {
    db.collection("quotes").doc("Tuesday")                                                      //name of the collection and documents should matach excatly with what you have in Firestore
      .onSnapshot(TuesdayDoc => {                                                               //arrow notation
           console.log("current document data: " + TuesdayDoc.data());                          //.data() returns data object
           document.getElementById("quote-goes-here").innerHTML = TuesdayDoc.data().quote;      //using javascript to display the data on the right place
           
           //Here are other ways to access key:value data fields
           //$('#quote-goes-here').text(c.data().quote);                                       //using jquery object dot notation
           //$("#quote-goes-here").text(c.data()["quote"]);                                    //using json object indexing
      })
}
read_display_Quote()        //calling the function

function insertName() {
     firebase.auth().onAuthStateChanged(users => {
         // Check if user is signed in:
         if (users) {                                                                 
             // Do something for the current logged-in user here: 
             console.log(users.uid);
             //go to the correct user document by referencing to the user uid
             currentUser = db.collection("users").doc(users.uid);
             //get the document for current user.
             currentUser.get()
                      .then(userDoc => {
                var user_Name = userDoc.data().name;
                console.log(user_Name);
                //method #1:  insert with html only
                document.getElementById("name-goes-here").innerText = user_Name;    //using javascript
                //method #2:  insert using jquery
                //$("#name-goes-here").text(user_Name);                         //using jquery
             })
         } else {
             // No user is signed in.
         }
     });
 }
insertName();

//-----------------------------------------------
// Create a "max" number of hike document objects
//-----------------------------------------------
function writeHikeData() {
     max = 3;
     //define a variable for the collection you want to create in Firestore to populate data
     var hikesRef = db.collection("hikes");
     for (i = 1; i <= max; i++) {
         hikesRef.add({ //add to database, autogen ID
             code: "id" + i,
             name: "hike" + i,
             details: "Usman says this hike is amazing!  You will love going on hike" + i
         })
    }
 }
 

 function displayCards(collection) {
     let cardTemplate = document.getElementById("hikeCardTemplate");
 
     db.collection(collection).get()
         .then(snap => {
             var i = 1;
             snap.forEach(doc => { //iterate thru each doc
                 var title = doc.data().name;   // get value of the "name" key
                 var details = doc.data().details;   // get value of the "details" key
                 let newcard = cardTemplate.content.cloneNode(true);
 
                 //update title and text and image
                 newcard.querySelector('.card-title').innerHTML = title;
                 newcard.querySelector('.card-text').innerHTML = details;
                 newcard.querySelector('.card-image').src = "./images/" + collection + ".jpg"; //hikes.jpg
 
                 //give unique ids to all elements for future use
                 // newcard.querySelector('.card-title').setAttribute("id", "ctitle" + i);
                 // newcard.querySelector('.card-text').setAttribute("id", "ctext" + i);
                 // newcard.querySelector('.card-image').setAttribute("id", "cimage" + i);
 
                 //attach to gallery
                 document.getElementById(collection + "-go-here").appendChild(newcard);
                 i++;
             })
         })
 }
 
 displayCards("hikes");