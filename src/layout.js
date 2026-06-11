// layout.js

export function buildGraph(diagram) {
  const graph = new Map();
  const inDegree = new Map();

  for (const node of diagram.nodes) {
    graph.set(node.id, []);
    inDegree.set(node.id, 0);
  }

  for (const edge of diagram.edges) {
    graph.get(edge.from).push(edge.to);
    inDegree.set(edge.to, inDegree.get(edge.to) + 1);
  }

  return { graph, inDegree };
}

export function topologicalSort(graph, inDegree) {
  const queue = [];
  const levels = new Map();

  // Start with nodes having no incoming edges
  for (const [node, degree] of inDegree.entries()) {
    if (degree === 0) {
      queue.push(node);
      levels.set(node, 0);
    }
  }

  while (queue.length > 0) {
    const current = queue.shift();
    const currentLevel = levels.get(current);

    for (const neighbor of graph.get(current)) {
      inDegree.set(neighbor, inDegree.get(neighbor) - 1);

      if (inDegree.get(neighbor) === 0) {
        queue.push(neighbor);
        levels.set(neighbor, currentLevel + 1);
      }
    }
  }

  return levels; // nodeId → level
}

export function computeLayout(diagram) {
  const { graph, inDegree } = buildGraph(diagram);
  const levels = topologicalSort(graph, inDegree);

  const levelMap = new Map();

  // Group nodes by level
  for (const node of diagram.nodes) {
    const level = levels.get(node.id) || 0;

    if (!levelMap.has(level)) {
      levelMap.set(level, []);
    }
    levelMap.get(level).push(node);
  }

  const positions = new Map();

  const X_SPACING = 200;
  const Y_SPACING = 100;

  for (const [level, nodes] of levelMap.entries()) {
    nodes.forEach((node, index) => {
      positions.set(node.id, {
        x: level * X_SPACING,
        y: index * Y_SPACING
      });
    });
  }

  return positions;
}

