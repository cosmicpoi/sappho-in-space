type Position = {
  x: number;
  y: number;
}

function getChar(i: number): string {
  var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  // return characters.charAt(Math.floor(Math.random() * characters.length));
  return characters.charAt(i % characters.length)
}

class CharPixel {
  private element: HTMLSpanElement;
  private idx: Position;

  private screenPos: Position;

  public constructor(parent: HTMLDivElement, idx: Position) {
    this.idx = idx;

    this.screenPos = {
      x: idx.x * 15,
      y: idx.y * 15,
    };

    this.element = document.createElement('span');
    this.element.innerHTML = "@";
    this.element.className = "charPixel";

    this.element.style.left = this.screenPos.x + "px";
    this.element.style.top = this.screenPos.y + "px";

    parent.appendChild(this.element);
  }

  public setCharacter(char: string) {
    this.element.innerHTML = char;
  }
}

function App(): HTMLDivElement {
  const element = document.createElement('div');
  element.className = "container";

  const pixels: CharPixel[] = [];

  for (var i = 0; i < 1000; i++) {
    for (var j = 0; j < 140; j++) {
      if (Math.random() < 0.1) pixels.push(new CharPixel(element, { x: i, y: j }));
    }
  }

  var frames = 0;
  const loop = () => {
    frames++;
    for (const pixel of pixels) {
      pixel.setCharacter(getChar(frames));
    }

    window.requestAnimationFrame(loop)
  }



  return element;
}

document.body.appendChild(App());

document.addEventListener("keydown", (e: KeyboardEvent) => {
  const delta = 15;
  console.log("key pressed");
  var offX = 0, offY = 0;
  if (e.key == "ArrowUp") {
    offY = -delta;
  } else if (e.key == "ArrowDown") {
    offY = delta;
  }

  if (e.key == "ArrowRight") {
    offX = delta;
  } else if (e.key == "ArrowLeft") {
    offX = -delta;
  }

  window.scroll(window.scrollX + offX, window.scrollY + offY);
});