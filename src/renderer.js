// renderer.js
import { getStyle } from "./shapes.js";

export function render(diagram) {
  let xml = `
  <mxfile>
    <diagram>
      <mxGraphModel>
        <root>
          <mxCell id="0"/>
          <mxCell id="1" parent="0"/>
  `;

  let y = 20;

  // Nodes
  for (const node of diagram.nodes) {
    xml += `
      <mxCell id="${node.id}" value="${node.label}" style="${getStyle(node.type)}"
        vertex="1" parent="1">
        <mxGeometry x="20" y="${y}" width="80" height="40" as="geometry"/>
      </mxCell>
    `;
    y += 80;
  }

  // Edges
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
