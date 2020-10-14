let addToy = false;
const url = "http://localhost:3000/toys/"
const index = document.querySelector("#toy-collection")

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  const form = document.querySelector(".add-toy-form");

  fetch(url).then(res => res.json()).then(toys => toys.forEach(toy => renderToy(toy)))

  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });

  form.addEventListener("submit", e => {
    e.preventDefault()

    console.log(e)

    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify({
        "name": e.target.name.value,
        "image": e.target.image.value,
        "likes": 0
      })
    })
    .then(res => res.json())
    .then(newToy => renderToy(newToy))
  });

});

function renderToy(toy){

  // console.log(toy)
  const div = document.createElement("div")
  div.setAttribute("class", "card")

  const h2 = document.createElement("h2")
  h2.innerText = toy.name

  const img = document.createElement("img")
  img.setAttribute("class", "toy-avatar")
  img.src = toy.image

  const p = document.createElement("p")
  p.innerText = toy.likes

  const likeBtn = document.createElement("button")
  likeBtn.setAttribute("class", "like-btn")
  likeBtn.setAttribute("id", "toy.id")
  likeBtn.innerText = "Like <3"
  likeBtn.addEventListener("click", () => {
    let likes = parseInt(toy.likes++)
    fetch(url + toy.id, {
      method: "PATCH",
      headers:{
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify({
        "likes": likes
      })
    })
    .then(res => res.json())
    .then(() => p.innerText = likes)
  })

  const delBtn = document.createElement("button")
  delBtn.setAttribute("class", "delete-btn")
  delBtn.innerText = "Delete"
  delBtn.addEventListener("click", () => {
    fetch(url + toy.id, {
      method: "DELETE"
    })
    div.remove()
  })

  index.append(div)
  div.append(h2, img, p, likeBtn, delBtn)

}