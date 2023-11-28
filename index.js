window.addEventListener("load", () => {
  function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min); // The maximum is exclusive and the minimum is inclusive
  }

  const button = document.getElementById("draw");
  const input = document.getElementById("prompt");
  
  let channelID = "reading-rrgifbt1te4";
  input.onchange = (e) => channelID = e.target.value;

  let cardIndices = [];
  let tarotCard = {};

  function drawCard(max) {
    let i = getRandomInt(0,max);
    console.log({max,i});
    if (cardIndices.includes(i)) return drawCard(max);
    cardIndices.push(i);
    return i;
  }

  function drawCards() {
    fetch(`https://api.are.na/v2/channels/${channelID}/contents`).then((r) => r.json()).then((d) => {
      for (let i = 0; i < 3; i++) {
        // description
        // title
        // image.display.url
        const data = d.contents;
        const index = drawCard(data.length);
        tarotCard = `${data[index].title}**${data[index].description}**${btoa(data[index].image.display.url)}`;
        console.log({cardIndices, tarotCard});
        const text = `<!DOCTYPE html><html> <head> <title>${tarotCard.name}</title> <meta charset="utf-8"> <meta name="viewport" content="width=device-width, initial-scale=1"> <link rel="stylesheet" href="https://iguannalin.github.io/tarot/index.css"/><script src=https://iguannalin.github.io/tarot/tarot.js></script></head> <body><div id="container" data-tarot=${tarotCard}></div></body></html>`;
        const blob = new Blob([text], {type: "text/html"});
        const blobUrl = URL.createObjectURL(blob);
        window.open(blobUrl, '_blank', `popup,location,status,scrollbars,resizable,width=200,height=300,top=500,left=${(i*300)+100}`);
        window.URL.revokeObjectURL(blobUrl);
      }
    });
  }

  button.onclick = drawCards;
});