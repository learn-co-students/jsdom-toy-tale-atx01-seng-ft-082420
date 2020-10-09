let addToy = false;

document.addEventListener('DOMContentLoaded', () => {
  const addBtn = document.querySelector('#new-toy-btn');
  const toyFormContainer = document.querySelector('.container');
  addBtn.addEventListener('click', () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = 'block';
    } else {
      toyFormContainer.style.display = 'none';
    }
  });

  fetch('http://localhost:3000/toys')
    .then(function(data) {
      return data.json();
    })
    .then(function(json) {
      // console.log(json);
      for (const toy of json) {
        // console.log(toy);
        createToyCard(toy.name, toy.image, toy.likes, toy.id);
      }
    });
});

// Create Toy Card
function createToyCard(toyName, toyImg, toyLikes, id) {
  const toyCollection = document.querySelector('#toy-collection');
  // Make div card
  const div = document.createElement('div');
  const h2 = document.createElement('h2');
  const img = document.createElement('img');
  const p = document.createElement('p');
  const button = document.createElement('button');

  // div.setAttribute('toyId', id);
  div.setAttribute('class', 'card');
  h2.textContent = toyName;
  img.setAttribute('src', toyImg);
  img.setAttribute('class', 'toy-avatar');
  p.textContent = toyLikes;
  button.innerText = 'Like';
  button.className = 'like-btn';
  button.id = id;
  div.append(h2, img, p, button);
  toyCollection.append(div);

  button.addEventListener('click', e => {
    e.preventDefault();
    let updateLikes = parseInt(e.target.previousElementSibling.innerText) + 1;
    // console.log(newLikes);
    // console.log(button.id);
    fetch(`http://localhost:3000/toys/${button.id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      },
      body: JSON.stringify({
        likes: updateLikes
      })
    })
      .then(res => res.json())
      .then(() => (p.innerText = updateLikes));
  });
}

const form = document.querySelector('form');

form.addEventListener('submit', function(e) {
  e.preventDefault();
  // Grab Vars from form
  const toyName = document.querySelector('#toyName').value;
  const toyImg = document.querySelector('#toyImg').value;
  postNewToy(toyName, toyImg);
  // .then(function(res) {
  //   return res.json();
  // })
  // .then(function(data) {
  //   console.log(data);
  // });
});

function postNewToy(toyName, toyImg) {
  return fetch('http://localhost:3000/toys', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json'
    },
    body: JSON.stringify({
      name: toyName,
      image: toyImg,
      likes: 0
    })
  });
}
