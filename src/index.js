let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
      toyFormContainer.addEventListener('submit', e => {
        e.preventDefault()
        postToy(e.target)
      })
    } else {
      toyFormContainer.style.display = "none";
    }
  });
  fetch('http://localhost:3000/toys')
    .then(response => response.json())
    .then(query => query.forEach(toy => createToyCard(toy)))

  function createToyCard(toy){
    const mainDiv = document.querySelector('#toy-collection')
    const newDiv = document.createElement('div')
    newDiv.id = toy.id

    const h2 = document.createElement('h2')
    h2.innerText = toy.name

    const img = document.createElement('img')
    img.src = toy.image
    img.className = 'toy-avatar'
    img.alt = `Picture of ${toy.name}`

    const p = document.createElement('p')
    p.innerHTML =`${toy.likes} Likes`

    const likeBtn = document.createElement('button')
    likeBtn.innerText = 'Like 💕'

    const br = document.createElement('br')

    const removeBtn = document.createElement('button')
    removeBtn.innerText = 'Sell Toy'

    newDiv.append(h2, img, p, likeBtn, br, removeBtn)
    mainDiv.append(newDiv)

    likeBtn.addEventListener('click', function(e){
      e.preventDefault()
      addLike(e)
    })

    removeBtn.addEventListener('click', function(e){
      e.preventDefault()
      deleteToy(e)
    })
  }

  function addLike(e){
    const likes = parseInt(e.target.previousSibling.innerText) +1
    const toy = e.target.parentElement.id
    console.log(likes)

    fetch(`http://localhost:3000/toys/${toy}`,{
      method: 'PATCH',
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({
        likes: likes
      })
    })
    .then(res => res.json())
    .then(like => e.target.previousSibling.innerText = `${likes} Likes`) 
  }

  function deleteToy(e){
    const toy = e.target.parentElement
    fetch(`http://localhost:3000/toys/${toy.id}`,{
      method: 'DELETE'
    })
    toy.remove()
  }


  function postToy(toy_data){
    fetch('http://localhost:3000/toys',{
      method: 'POST',
      headers:{
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({
        "name": toy_data.name.value,
        "image": toy_data.image.value,
        "likes": 0
      })
    })
    .then(res => res.json())
    .then(toy => {
      createToyCard(toy),
      toyFormContainer.reset()
    })
  }

});
