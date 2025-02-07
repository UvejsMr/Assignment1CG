AFRAME.registerComponent("movement-constraint", {
  schema: {
    minX: { type: "number", default: -50 },
    maxX: { type: "number", default: 50 },
    minY: { type: "number", default: 0 },
    maxY: { type: "number", default: 20 },
    minZ: { type: "number", default: -50 },
    maxZ: { type: "number", default: 50 },
  },
  tick: function () {
    const camera = this.el;
    const position = camera.getAttribute("position");

    let x = Math.min(Math.max(position.x, this.data.minX), this.data.maxX);
    let y = Math.min(Math.max(position.y, this.data.minY), this.data.maxY);
    let z = Math.min(Math.max(position.z, this.data.minZ), this.data.maxZ);

    camera.setAttribute("position", { x: x, y: y, z: z });
  },
});

AFRAME.registerComponent("add-classroom-items", {
  init: function () {
    const scene = this.el;

    const deskPositions = [
      { x: -15, y: 0, z: 15 },
      { x: 10, y: 0, z: 15 },

      { x: -15, y: 0, z: 0 },
      { x: 10, y: 0, z: 0 },

      { x: -15, y: 0, z: -15 },
      { x: 10, y: 0, z: -15 },
    ];

    deskPositions.forEach((position) => {
      const desk = document.createElement("a-entity");
      desk.setAttribute("obj-model", "obj: #deskModel");
      desk.setAttribute(
        "position",
        `${position.x} ${position.y} ${position.z}`
      );
      desk.setAttribute("scale", "0.8 0.8 0.8");
      desk.setAttribute("material", "color: #4d4d4d");
      scene.appendChild(desk);
    });
  },
});
