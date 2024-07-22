document.addEventListener('DOMContentLoaded', () => {
  const toyCollection = document.getElementById('toy-collection');

  // Fetch Andy's Toys
  fetch('http://localhost:3000/toys')
    .then(response => response.json())
    .then(toys => {
      toys.forEach(toy => {
        const toyCard = createToyCard(toy);
        toyCollection.appendChild(toyCard);
      });
    });

  // Add a New Toy
  const toyForm = document.getElementById('toy-form');
  toyForm.addEventListener('submit', event => {
    event.preventDefault();
    const name = event.target.name.value;
    const image = event.target.image.value;
    const likes = 0;

    const newToy = {
      name,
      image,
      likes
    };

    fetch('http://localhost:3000/toys', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      },
      body: JSON.stringify(newToy)
    })
    .then(response => response.json())
    .then(toy => {
      const toyCard = createToyCard(toy);
      toyCollection.appendChild(toyCard);
    });
  });

  // Increase a Toy's Likes
  toyCollection.addEventListener('click', event => {
    if (event.target.classList.contains('like-btn')) {
      const toyId = event.target.id;
      const toyCard = event.target.closest('.card');
      const likeCount = toyCard.querySelector('p');

      fetch(`http://localhost:3000/toys/${toyId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json'
        },
        body: JSON.stringify({
          likes: parseInt(likeCount.textContent) + 1
        })
      })
      .then(response => response.json())
      .then(updatedToy => {
        likeCount.textContent = `${updatedToy.likes} Likes`;
      });
    }
  });

  // Helper function to create a toy card
  function createToyCard(toy) {
    const card = document.createElement('div');
    card.className = 'card';

    const h2 = document.createElement('h2');
    h2.textContent = toy.name;

    const img = document.createElement('img');
    img.src = toy.image;
    img.className = 'toy-avatar';

    const p = document.createElement('p');
    p.textContent = `${toy.likes} Likes`;

    const likeBtn = document.createElement('button');
    likeBtn.className = 'like-btn';
    likeBtn.id = toy.id;
    likeBtn.textContent = 'Like ❤️';

    card.appendChild(h2);
    card.appendChild(img);
    card.appendChild(p);
    card.appendChild(likeBtn);

    return card;
  }
});
require("./helpers.js");

describe("", () => {
  describe("", () => {
    it("Test passing", () => {
      return true;
    });
  });
});
