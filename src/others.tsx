

function getChar(i: number): string {
  var characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  // return characters.charAt(Math.floor(Math.random() * characters.length));
  return characters.charAt(i % characters.length);
}

class _CharPixel {
  private element: HTMLSpanElement;
  private idx: Position;

  private screenPos: Position;

  public constructor(parent: HTMLDivElement, idx: Position) {
    this.idx = idx;

    this.screenPos = {
      x: idx.x * 15,
      y: idx.y * 15,
    };

    this.element = document.createElement("span");
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


document.addEventListener("keydown", (e: KeyboardEvent) => {
  const delta = 15;
  console.log("key pressed");
  var offX = 0,
    offY = 0;
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
