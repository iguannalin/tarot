window.addEventListener("load", () => {
  const container = document.getElementById("container");
  if (container.dataset.tarot) createCard(container.dataset.tarot);

  function createCard(cd) {
    const card = cd.split("**");
    const h1 = document.createElement("h1");
    h1.innerText = card[0];
    const p = document.createElement("p");
    p.innerText = card[1];
    const image = document.createElement("img");
    image.src = atob(card[2]);
    container.appendChild(h1);
    container.appendChild(image);
    container.appendChild(p);
  }

});