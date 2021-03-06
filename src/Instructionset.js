export const InstructionSet = [
  {
    opcode: "L.D",
    destination: "F3",
    j: "32",
    k: "R2",
    issue: 0,
    executionComplete: { start: 0, end: 0 },
    writeResult: 0,
    toBeExecuted: false,
    station: "",
  },
  {
    opcode: "L.D",
    destination: "F1",
    j: "44",
    k: "R3",
    issue: 0,
    executionComplete: { start: 0, end: 0 },
    writeResult: 0,
    toBeExecuted: false,
    station: "",
  },
  {
    opcode: "MUL.D",
    destination: "F0",
    j: "F1",
    k: "F2",
    issue: 0,
    executionComplete: { start: 0, end: 0 },
    writeResult: 0,
    station: "",
  },
  {
    opcode: "SUB.D",
    destination: "F4",
    j: "F3",
    k: "F1",
    issue: 0,
    executionComplete: { start: 0, end: 0 },
    writeResult: 0,
    toBeExecuted: false,
    station: "",
  },
  {
    opcode: "DIV.D",
    destination: "F5",
    j: "F0",
    k: "F3",
    issue: 0,
    executionComplete: { start: 0, end: 0 },
    writeResult: 0,
    toBeExecuted: false,
    station: "",
  },
  {
    opcode: "ADD.D",
    destination: "F3",
    j: "F4",
    k: "F1",
    issue: 0,
    executionComplete: { start: 0, end: 0 },
    writeResult: 0,
    toBeExecuted: false,
    station: "",
  },
];
