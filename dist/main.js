(() => {
  // src/index.ts
  function getChar(i) {
    var characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    return characters.charAt(i % characters.length);
  }
  var CharPixel = class {
    constructor(parent, idx) {
      this.idx = idx;
      this.screenPos = {
        x: idx.x * 15,
        y: idx.y * 15
      };
      this.element = document.createElement("span");
      this.element.innerHTML = "@";
      this.element.className = "charPixel";
      this.element.style.left = this.screenPos.x + "px";
      this.element.style.top = this.screenPos.y + "px";
      parent.appendChild(this.element);
    }
    setCharacter(char) {
      this.element.innerHTML = char;
    }
  };
  function App() {
    const element = document.createElement("div");
    element.className = "container";
    const pixels = [];
    for (var i = 0; i < 1e3; i++) {
      for (var j = 0; j < 140; j++) {
        if (Math.random() < 0.1)
          pixels.push(new CharPixel(element, { x: i, y: j }));
      }
    }
    var frames = 0;
    const loop = () => {
      frames++;
      for (const pixel of pixels) {
        pixel.setCharacter(getChar(frames));
      }
      window.requestAnimationFrame(loop);
    };
    return element;
  }
  document.body.appendChild(App());
  document.addEventListener("keydown", (e) => {
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
})();
