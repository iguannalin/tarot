window.addEventListener("load", () => {
  function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min); // The maximum is exclusive and the minimum is inclusive
  }

  const container = document.getElementById("container");
  const button = document.getElementById("draw");
  const input = document.getElementById("input");

  let tennis = "";

  function createElement(initial, left=0, top=0, size=0) {
    if (+(left) >= 400) return atBounds = true;
    const pre = document.createElement("pre");
    pre.innerHTML = "🎾";
    let nleft = initial ? getRandomInt(0,100) : +(left)+5;
    let ntop = initial ? getRandomInt(0,100): +(top)+5;
    let nsize = initial ? 25 : size;
    pre.style.left = nleft+"px";
    pre.style.top = ntop+"px";
    pre.style.fontSize = nsize+"px";
    if (tennis.length > 0) tennis+="**"; // separator
    const cactus = `${nleft},${ntop},${nsize}`;
    tennis+=cactus;
    container.appendChild(pre);
  }

  //if (container.dataset.tennis) //TODO
  let channelID = "reading-rrgifbt1te4";
  input.onchange = (e) => channelID = e.target.value;

  function drawCards() {
    fetch(`https://api.are.na/v2/channels/${channelID}/contents`).then((r) => r.json()).then((d) => {
      console.log({channelID,d});
      for (let i = 0; i < 3; i++) {
        let tarotName = "TODO";
        e.preventDefault();
        const text = `<!DOCTYPE html><html> <head> <title>${tarotName}</title> <meta charset="utf-8"> <meta name="viewport" content="width=device-width, initial-scale=1"> <link rel="stylesheet" href="https://iguannalin.github.io/tennis/index.css"/><script src=https://iguannalin.github.io/tennis/index.js></script></head> <body><div id="overlay"></div> <div id="container" data-tennis=${btoa(tennis)}></div></body></html>`;
        const blob = new Blob([text], {type: "text/html"});
        const blobUrl = URL.createObjectURL(blob);
        window.open(blobUrl, '_blank', `popup,location,status,scrollbars,resizable,width=400,height=400`);
        window.URL.revokeObjectURL(blobUrl);
      }
    });
  }

  button.onclick = drawCards;
});