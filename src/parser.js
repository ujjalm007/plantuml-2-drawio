// parser.js
import { Diagram, Node, Edge } from "./ast.js";

export function parse(input) {
  const diagram = new Diagram();
  const lines = input.split("\n");

  const nodeMap = new Map();

  for (let line of lines) {
    line = line.trim();

    if (!line || line.startsWith("'")) continue;

    // Node definitions
    const nodeMatch = line.match(/(actor|database|queue)\s+(\w+)/);
    if (nodeMatch) {
      const [, type, name] = nodeMatch;
      const node = new Node(name, type, name);
      diagram.nodes.push(node);
      nodeMap.set(name, node);
      continue;
    }

    // Edges
    const edgeMatch = line.match(/(\w+)\s*(->|-->)\s*(\w+)/);
    if (edgeMatch) {
      const [, from, arrow, to] = edgeMatch;
      const type = arrow === "-->" ? "dashed" : "solid";

      diagram.edges.push(new Edge(from, to, type));
    }
  }

  return diagram;
}
