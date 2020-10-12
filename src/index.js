let addToy = false;


// (FIRST FIRST) These things were already here... so maybe these should be made first...
document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");

  addBtn.addEventListener("click", () => {    // create an event listener for the button ('click')
    // hide & seek with the form (form is hidden until 'add new toy' is clicked) will do this AFTER the form is built
    addToy = !addToy;         //initially hides the addToy form until the rendering trigger is "activated"
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });


  //(1)//
  fetch('http://localhost:3000/toys') // Started here -- get the json server 
    .then(function(res) {             // call function on the response given 
      return res.json()               // return the response
    })
    .then(function(json) {            //  parse the server response into json
      for (const toy of json) { // created const toy in the for loop as we iterate through, this will represent each iteration as we go through
        createToyCard(toy.name, toy.image, toy.likes) //summoned our createToyCard method (after we created it) - passing in the necessary arguments with toy.____ to add it to current iteration
      }
    })


});


//(2)//          this funtion creates a 'space' for each toy and the given image/ info about them on our page by.....
function createToyCard(toyName,toyImg,toyLikes, id) {  // include whatever you want to name the args

  const toyCollection = document.querySelector('#toy-collection') //this will find where we want to add our creations (the div with an id of toy-collection)

  const div = document.createElement('div');  //create a const of each element we will need to create to attack tp the div placed above ^^
  const h2 = document.createElement('h2');
  const img = document.createElement('img');
  const p = document.createElement('p');
  const button = document.createElement('button'); // don't forget a button to add on the likes


  h2.textContent = toyName;  // allows text content for the toy's name
  img.setAttribute('src', toyImg);   //set attributes for image
  p.textContent = toyLikes;    // allows text content for the toy's likes count to be shown
  button.className = 'like-btn';  //create class name of the button
  button.id = id;
  button.innerText = 'Like';    //text to show inside of the button

 div.append(h2, img, p, button);   //now APPEND ALL of the new elements just created to the div we created
 toyCollection.append(div);   // and APPEND ALL OF THAT to the const (defined on 34) toyCollection
 button.addEventListener('click', e => {
   if (e.target.className === 'like-btn') {
     console.log(e.target)
   }

   
 })

}


//(3)//
const form = document.querySelector('form')           // selects the form tag in the HTML (could also call by class name/ id but there is only one form, so this will work)
form.addEventListener('submit', function(e) {         // add Event Listener to form- listens for a 'submit'  
  e.preventDefault()                                  //call.preventDefault() on this form will cause it not to refresh the whole page and clear the submit form
  const toyName = document.querySelector('#toyName').value    // assigns the value of toyName (consistant with create toy card) to the id 
  const toyImage = document.querySelector('#toyImage').value    // adds an id to the info inputted by the user ^^ same as
  // console.log(toyName, toyImage)
  createNewToy(toyName, toyImage)
})


//(4)// After the form is created, we need to make a POST
function createNewToy(toyName, toyImage) {      //parameters match what the user will enter in the form

  return fetch('http://localhost:3000/toys', {    // again, hit up our dummy server
    method: 'POST',                              // we want to POST the new toy 
    headers: {  
      "Content-Type":"application/json",          
      Accept:"application/json"
    },
    body: JSON.stringify ({
      name: toyName,
      image: toyImage,
      likes: 0
    })
  })
}


// function increaseLikes(e) {
//   e.preventDefault()
//   return fetch('http://localhost:3000/toys/:id', {
//     method: 'PATCH', 
//     headers: {
//       "Content-Type": "application/json",
//       Accept: "application/json"
//     },
//     body: JSON.stringify({
//       "likes": <new number>
//     })
//   })
// }
