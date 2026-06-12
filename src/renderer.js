import { getStyle } from "./shapes.js";
import { computeLayout } from "./layout.js";

export function render(diagram) {
  const positions = computeLayout(diagram);

  let xml = `
  <mxfile>
    <diagram>
      <mxGraphModel>
        <root>
          <mxCell id="0"/>
          <mxCell id="1" parent="0"/>
  `;

  // Nodes
  for (const node of diagram.nodes) {
    const pos = positions.get(node.id) || { x: 0, y: 0 };

    xml += `
      <mxCell id="${node.id}" value="${node.label}" style="${getStyle(node.type)}"
        vertex="1" parent="1">
        <mxGeometry x="${pos.x}" y="${pos.y}" width="80" height="40" as="geometry"/>
      </mxCell>
    `;
  }

  // Edges (unchanged)
  let edgeId = 1000;

  for (const edge of diagram.edges) {
    const style =
      edge.type === "dashed"
        ? "dashed=1;endArrow=block;"
        : "endArrow=block;";

    xml += `
      <mxCell id="${edgeId++}" edge="1" source="${edge.from}" target="${edge.to}"
        style="${style}" parent="1">
        <mxGeometry relative="1" as="geometry"/>
      </mxCell>
    `;
  }

  xml += `
        </root>
      </mxGraphModel>
    </diagram>
  </mxfile>
  `;

  return xml;
}
