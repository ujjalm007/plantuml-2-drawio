import { convertPlantUMLToDrawIO } from "../src/index.js";

const input = `
actor User
database DB
queue Queue

User -> DB
DB --> Queue
`;

const xml = convertPlantUMLToDrawIO(input);
console.log(xml);
