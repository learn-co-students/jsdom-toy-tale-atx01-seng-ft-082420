let addToy = false;
let toyURL = "http://localhost:3000/toys"

document.addEventListener("DOMContentLoaded", () => {

  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  const toyCollection = document.querySelector("#toy-collection")
  const addToyForm = document.querySelector(".add-toy-form")

addToyForm.addEventListener('submit', function(e){
  e.preventDefault()
  let toy = {}
  toy.name = e.target.name.value
  toy.image = e.target.image.value
  postToy(toy)
})

function postToy(toy){
  
  let toyOption = {
    method: "POST",
    headers:
    {
     "Content-Type": "application/json",
      Accept: "application/json"
  },
   body: JSON.stringify({
      "name": toy.name,
      "image": toy.image,
      "likes": 0
   })
  }

  fetch(toyURL, toyOption)
  .then(renderToy(toy))
}

fetch(toyURL)
.then(function(resp){
  return resp.json()
})
.then(function(toys){
  // console.log(toys)
  toys.forEach(function(toy){
    renderToy(toy)
  })
})

//create a div card w toy info
  function renderToy(toy){
  console.log(toy)

  let toyCard = document.createElement('div')
  toyCard.className = "card"

  let toyName = document.createElement('h2')
  toyName.innerText = toy.name

  let toyImage = document.createElement('img')
  toyImage.src = toy.image
  toyImage.className = "toy-avatar"

  let toyLikes = document.createElement('p')
  toyLikes.innerText = toy.likes

  let likeBtn = document.createElement('button')
  likeBtn.addEventListener('click', function(){
  increaseLikes()
  })
  likeBtn.className = "like-btn"
  likeBtn.innerText = "like"

  function increaseLikes(){
    let newLikes = (parseInt(toyLikes.innerText)+1)
    toyLikes.innerText = newLikes
    updateLikes(toy.id, newLikes)
  }
  toyCard.append(toyName, toyImage, toyLikes, likeBtn)
  toyCollection.append(toyCard)
}

  function updateLikes(toyId, likeCount){
    let toyOption = {
      method: "PATCH",
      headers:
      {
       "Content-Type": "application/json",
        Accept: "application/json"
    },
     body: JSON.stringify({
        "likes": likeCount
  })
}
fetch(toyURL+'/'+toyId, toyOption)

  
  }


  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });
});
