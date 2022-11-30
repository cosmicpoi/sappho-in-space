(() => {
  // src/index.ts
  var CharPixel = class {
    constructor(parent, idx) {
      this.idx = idx;
      this.screenPos = {
        x: idx.x * 10,
        y: idx.y * 10
      };
      this.element = document.createElement("span");
      this.element.innerHTML = ".";
      this.element.className = "charPixel";
      this.element.style.left = this.screenPos.x.toString();
      this.element.style.top = this.screenPos.y.toString();
      parent.appendChild(this.element);
    }
  };
  function App() {
    const element = document.createElement("div");
    element.innerHTML = "Hello webpack";
    for (var i = 0; i < 100; i++) {
      for (var j = 0; j < 70; j++) {
        new CharPixel(element, { x: i, y: j });
      }
    }
    return element;
  }
  document.body.appendChild(App());
})();
