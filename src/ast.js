// ast.js
export class Diagram {
  constructor() {
    this.nodes = [];
    this.edges = [];
  }
}

export class Node {
  constructor(id, type, label) {
    this.id = id;
    this.type = type; // actor | database | queue
    this.label = label;
  }
}

export class Edge {
  constructor(from, to, type, label = "") {
    this.from = from;
    this.to = to;
    this.type = type; // solid | dashed
    this.label = label;
  }
}
