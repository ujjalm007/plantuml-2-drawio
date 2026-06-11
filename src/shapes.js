// shapes.js
export function getStyle(type) {
  switch (type) {
    case "actor":
      return "shape=umlActor;verticalLabelPosition=bottom;";
    case "database":
      return "shape=cylinder;";
    case "queue":
      return "shape=rectangle;rounded=1;";
    default:
      return "shape=rectangle;";
  }
}
