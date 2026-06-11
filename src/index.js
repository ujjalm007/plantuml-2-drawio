// index.js
import { parse } from "./parser.js";
import { render } from "./renderer.js";

export function convertPlantUMLToDrawIO(input) {
  const ast = parse(input);
  return render(ast);
}
