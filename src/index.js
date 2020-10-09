const collection = document.getElementById("toy-collection")
//Opens add-toy form
let addToy = false;
document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
      toyFormContainer.addEventListener('submit', function(e) {
        e.preventDefault()
        //console.log(e) to find how to grab info you need
        //e.target[0].value, e.target[1].value
        newToy(e.target)
        // f.reset() //resets info for toy
        toyFormContainer.remove()  
        // addToy = !addToy; //allows second toy to be added - changes back to false so that form not showing
    })
    } else {
      toyFormContainer.style.display = "none";
    }
  });
});

//Retrieve all toys
fetch('http://localhost:3000/toys') //no curly brackets needed on get req
.then(function(res) {
  return res.json() //remember parenthesis after json
})
.then(function(data) {
  for (const toy of data) { //loop over data with desired info
  addAttributes(toy)
  }
})

//Add toy to page
function addAttributes(toy) {
    const toyDiv = document.createElement('div')
    toyDiv.setAttribute('class', 'card')
    
    const toyName = document.createElement('h2')
    toyName.innerHTML = toy.name
    
    const toyImg = document.createElement('img')
    toyImg.setAttribute('class', 'toy-avatar')
    toyImg.setAttribute('src', toy.image)

    const toyP = document.createElement('p')
    toyP.innerHTML = `${toy.likes} Likes`
    toyP.setAttribute('id', toy.id) //needed so that we can refer to id later when adding like

    const toyB = document.createElement('button')
    toyB.setAttribute('class', 'like-btn')
    toyB.innerHTML = "Like <3"
    toyB.addEventListener('click', function(e){
      e.preventDefault()
      addLike(e, toyP)
    })
    toyDiv.append(toyName, toyImg, toyP, toyB);
    collection.append(toyDiv);
}

//Add toy to database
function newToy(toyData) {
  fetch('http://localhost:3000/toys', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    body: JSON.stringify({
     name: toyData.name.value,
     image: toyData.image.value,
     likes: 0 
    }) 
  })
  .then(function(res) {
    return res.json()
  })
  .then(function(data){
    addAttributes(data)
  })
}

//Add like to database & page
function addLike(e, toyP) {
  const addedLike = parseInt(toyP.innerHTML) + 1
  fetch(`http://localhost:3000/toys/${toyP.id}`, { //was not working originally because toy id attribute was not given to button 
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    body: JSON.stringify({
      likes: addedLike
    })
  })
  .then(function(res) {
    return res.json()
  })
  .then(function(toy) {
    toyP.innerText = `${toy.likes} likes`
  })
}