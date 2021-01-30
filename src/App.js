import "./App.css";
import InstructionQueue from "./Components/InstructionQueue";
import Registerfile from "./Components/Registerfile";
import { useState } from "react";
// import { InstructionSet } from "./Instructionset";
import AddReservationStation from "./Components/AddReservationStation";
import MulReservationStation from "./Components/MulReservationStation";
import InputInstructions from "./Components/InputInstructions";
import LoadBuffer from "./Components/LoadBuffer";
import StoreBuffer from "./Components/StoreBuffer";
import "semantic-ui-css/semantic.min.css";

import {
  Button,
  Container,
  Grid,
  Header,
  Icon,
  Popup,
  Segment,
  Table,
} from "semantic-ui-react";

let currentInstruction = -1;
function App() {
  const Register = {
    R0: 0,
    R1: 1,
    R2: 2,
    R3: 3,
    R4: 4,
    R5: 5,
    R6: 6,
    R7: 7,
    R8: 8,
    R9: 9,
  };
  const Memory = [100, 189, 8494, 84, 5, 56, 478, 63, 614, 447];
  const [cycleNumber, setCycleNumber] = useState(1);
  const [instructions, setInstructions] = useState([]);
  const [disable, setDisable] = useState(false);
  const [loadBuffer, setLoadbuffer] = useState([
    {
      name: "L1",
      busy: 0,
      address: "",
    },
    {
      name: "L2",
      busy: 0,
      address: "",
    },
    {
      name: "L3",
      busy: 0,
      address: "",
    },
  ]);
  const [storeBuffer, setStorebuffer] = useState([
    {
      name: "S1",
      busy: 0,
      address: "",
      v: "",
      q: "",
      timer: 2,
      startTime: false,
    },
    {
      name: "S2",
      busy: 0,
      address: "",
      v: "",
      q: "",
      timer: 2,
      startTime: false,
    },
    {
      name: "S3",
      busy: 0,
      address: "",
      v: "",
      q: "",
      timer: 2,
      startTime: false,
    },
  ]);
  const [regFile, setregFile] = useState([
    {
      name: "F0",
      qi: "",
      content: "",
    },
    {
      name: "F1",
      qi: "",
      content: "44",
    },
    {
      name: "F2",
      qi: "",
      content: "12",
    },
    {
      name: "F3",
      qi: "",
      content: "",
    },
    {
      name: "F4",
      qi: "",
      content: "33",
    },
    {
      name: "F5",
      qi: "",
      content: "48",
    },
    {
      name: "F6",
      qi: "",
      content: "25",
    },
    {
      name: "F7",
      qi: "",
      content: "",
    },
    {
      name: "F8",
      qi: "",
      content: "7",
    },
    {
      name: "F9",
      qi: "",
      content: "100",
    },
  ]);
  const [addResStation, setAddresStation] = useState([
    {
      name: "A1",
      busy: 0,
      op: "",
      vj: "",
      vk: "",
      qj: "",
      qk: "",
      a: "",
      timer: 2,
      startTime: false,
    },
    {
      name: "A2",
      busy: 0,
      op: "",
      vj: "",
      vk: "",
      qj: "",
      qk: "",
      a: "",
      timer: 2,
      startTime: false,
    },
    {
      name: "A3",
      busy: 0,
      op: "",
      vj: "",
      vk: "",
      qj: "",
      qk: "",
      a: "",
      timer: 2,
      startTime: false,
    },
  ]);
  const [mulResStation, setMulresStation] = useState([
    {
      name: "M1",
      busy: 0,
      op: "",
      vj: "",
      vk: "",
      qj: "",
      qk: "",
      a: "",
      timer: 10,
      startTime: false,
    },
    {
      name: "M2",
      busy: 0,
      op: "",
      vj: "",
      vk: "",
      qj: "",
      qk: "",
      a: "",
      timer: 10,
      startTime: false,
    },
  ]);
  function MemoryComponent() {
    return (
      <>
        <Container textAlign="center">
          <Header as="h3">Memory</Header>
          <Table celled>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>Register</Table.HeaderCell>
                <Table.HeaderCell>Content</Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {Memory.map((c, i) => (
                <Table.Row key={i}>
                  <Table.Cell>{"R" + i}</Table.Cell>
                  <Table.Cell>{c}</Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table>
        </Container>
      </>
    );
  }

  function nextCycle() {
    if (!disable) {
      setDisable(true);
    }
    setCycleNumber(cycleNumber + 1);
    nextCycleInstruction();
  }
  function cycleRefresh() {
    for (let index = 0; index < addResStation.length; index++) {
      const element = addResStation[index];

      if (
        element.busy === 1 &&
        element.vj !== "" &&
        element.vk !== "" &&
        !addResStation[index].startTime
      ) {
        addResStation[index].startTime = true;
        for (let j = 0; j < instructions.length; j++) {
          if (
            instructions[j].station === element.name &&
            instructions[j].executionComplete.start === 0
          ) {
            console.log(instructions);
            instructions[j].toBeExecuted = true;
            const temp = cycleNumber;
            instructions[j].executionComplete = { start: temp, end: 0 };
            console.log(instructions);
            break;
          }
        }
      }
    }

    for (let index = 0; index < mulResStation.length; index++) {
      const element = mulResStation[index];

      if (
        element.busy === 1 &&
        element.vj !== "" &&
        element.vk !== "" &&
        !mulResStation[index].startTime
      ) {
        mulResStation[index].op === "DIV.D"
          ? (mulResStation[index].timer = 20)
          : (mulResStation[index].timer = 10);

        mulResStation[index].startTime = true;
        for (let j = 0; j < instructions.length; j++) {
          if (
            instructions[j].station === element.name &&
            instructions[j].executionComplete.start === 0
          ) {
            instructions[j].toBeExecuted = true;
            const temp = cycleNumber;
            instructions[j].executionComplete = { start: temp, end: 0 };

            break;
          }
        }
      }
    }
    for (let index = 0; index < storeBuffer.length; index++) {
      const element = storeBuffer[index];

      if (element.v !== "") {
        storeBuffer[index].startTime = true;
        for (let j = 0; j < instructions.length; j++) {
          if (
            instructions[j].station === element.name &&
            instructions[j].executionComplete.start === 0
          ) {
            instructions[j].toBeExecuted = true;
            const temp = cycleNumber;
            instructions[j].executionComplete = { start: temp, end: 0 };
          }
        }
      }
    }

    for (let index = 0; index < addResStation.length; index++) {
      const element = addResStation[index];
      if (element.busy === 1) {
        if (element.timer === 0) {
          let tag = "";
          let value = 0;
          switch (element.op) {
            default:
              break;
            case "ADD.D":
              {
                tag = element.name;
                value = parseInt(element.vj) + parseInt(element.vk);

                broadCast({ tag, value });
              }
              break;
            case "SUB.D":
              {
                tag = element.name;
                value = parseInt(element.vj) - parseInt(element.vk);

                broadCast({ tag, value });
              }
              break;
          }
          addResStation[index].busy = 0;
          addResStation[index].op = "";
          addResStation[index].vj = "";
          addResStation[index].vk = "";
          addResStation[index].startTime = false;
        } else if (element.startTime) {
          addResStation[index].timer = addResStation[index].timer - 1;
        }
      }
    }

    for (let index = 0; index < mulResStation.length; index++) {
      const element = mulResStation[index];
      if (element.busy === 1) {
        if (element.timer === 0) {
          let tag = "";
          let value = 0;
          switch (element.op) {
            default:
              break;
            case "MUL.D":
              {
                tag = element.name;
                value = parseInt(element.vj) * parseInt(element.vk);

                broadCast({ tag, value });
              }
              break;
            case "DIV.D":
              {
                broadCast(
                  element.name,
                  parseInt(element.vj) / parseInt(element.vk)
                );
              }
              break;
          }
          mulResStation[index].busy = 0;
          mulResStation[index].op = "";
          mulResStation[index].vj = "";
          mulResStation[index].vk = "";
          mulResStation[index].startTime = false;
        } else if (element.startTime) {
          let temp = mulResStation[index].timer;

          mulResStation[index].timer = temp - 1;
          setMulresStation([...mulResStation]);
        }
      }
    }
    for (let index = 0; index < storeBuffer.length; index++) {
      const element = storeBuffer[index];
      if (element.busy === 1) {
        if (element.timer === 0) {
          Memory[storeBuffer[index].address % 9] = storeBuffer[index].v;
          storeBuffer[index].busy = 0;
          storeBuffer[index].v = "";
          storeBuffer[index].address = "";
          storeBuffer[index].startTime = false;
        } else if (element.startTime) {
          storeBuffer[index].timer--;
        }
      }
    }
    ////////
    for (let index = 0; index < instructions.length; index++) {
      const element = instructions[index];
      if (
        element.issue != 0 &&
        element.toBeExecuted &&
        element.executionComplete.start == 0
      ) {
        console.log(instructions[index]);
        instructions[index].executionComplete.start = cycleNumber;
      }
      if (
        element.issue != 0 &&
        element.toBeExecuted &&
        element.executionComplete.start != 0 &&
        element.executionComplete.end == 0
      ) {
        switch (element.opcode) {
          default:
            break;
          case "L.D":
            {
              if (cycleNumber - element.executionComplete.start == 1) {
                instructions[index].executionComplete.end = cycleNumber;
              }
            }
            break;
          case "S.D":
            {
              if (cycleNumber - element.executionComplete.start == 1) {
                instructions[index].executionComplete.end = cycleNumber;
              }
            }
            break;
          case "ADD.D":
            {
              if (cycleNumber - element.executionComplete.start == 1) {
                instructions[index].executionComplete.end = cycleNumber;
              }
            }
            break;
          case "MUL.D":
            {
              if (cycleNumber - element.executionComplete.start == 9) {
                instructions[index].executionComplete.end = cycleNumber;
              }
            }
            break;
          case "SUB.D":
            {
              if (cycleNumber - element.executionComplete.start == 1) {
                instructions[index].executionComplete.end = cycleNumber;
              }
            }
            break;
          case "DIV.D":
            {
              if (cycleNumber - element.executionComplete.start == 20) {
                instructions[index].executionComplete.end = cycleNumber;
              }
            }
            break;
        }
      } else if (
        element.issue != 0 &&
        element.toBeExecuted &&
        element.executionComplete.start != 0 &&
        element.executionComplete.end != 0 &&
        element.writeResult == 0
      ) {
        instructions[index].writeResult = cycleNumber;

        let value = 0;
        switch (element.opcode) {
          default:
            break;
          case "L.D": {
            let station;
            let memval;
            for (let index = 0; index < loadBuffer.length; index++) {
              if (loadBuffer[index].name === element.station) {
                station = loadBuffer[index].name;
                memval = Memory[loadBuffer[index].address % 9];
                loadBuffer[index].busy = 0;
                loadBuffer[index].address = "";
                break;
              }
            }
            instructions[index].station = "";

            broadCast({ tag: station, value: memval });
          }
          case "MUL.D":
            instructions[index].station = "";
            break;
          case "DIV.D":
            instructions[index].station = "";
            break;
          case "ADD.D":
            instructions[index].station = "";
            break;
          case "SUB.D":
            instructions[index].station = "";
            break;
          case "S.D":
            instructions[index].station = "";
            break;
        }
      }
    }
    setStorebuffer([...storeBuffer]);
    setMulresStation([...mulResStation]);
    setAddresStation([...addResStation]);
    setInstructions([...instructions]);
  }

  function broadCast({ tag, value }) {
    for (let index = 0; index < regFile.length; index++) {
      const element = regFile[index];
      if (element.qi === tag) {
        regFile[index].content = value;
        regFile[index].qi = "";
      }
    }
    setregFile([...regFile]);
    for (let index = 0; index < addResStation.length; index++) {
      const element = addResStation[index];
      if (element.qj === tag) {
        addResStation[index].qj = "";
        addResStation[index].vj = value;
      }
      if (element.qk === tag) {
        addResStation[index].qk = "";
        addResStation[index].vk = value;
      }
    }
    setAddresStation([...addResStation]);
    for (let index = 0; index < mulResStation.length; index++) {
      const element = mulResStation[index];
      if (element.qj === tag) {
        mulResStation[index].qj = "";
        mulResStation[index].vj = value;
      }
      if (element.qk === tag)
        if (element.qk === tag) {
          mulResStation[index].qk = "";
          mulResStation[index].vk = value;
        }
    }
    setMulresStation([...mulResStation]);
    for (let index = 0; index < storeBuffer.length; index++) {
      const element = storeBuffer[index];
      if (element.q === tag) {
        storeBuffer[index].q = "";
        storeBuffer[index].v = value;
      }
    }
    setStorebuffer([...storeBuffer]);
  }
  function nextCycleInstruction() {
    cycleRefresh();

    currentInstruction = currentInstruction + 1;
    const nextInstruction = instructions[currentInstruction];
    if (nextInstruction) {
      switch (nextInstruction.opcode) {
        case "L.D":
          checkLoad(nextInstruction);
          break;
        case "S.D":
          checkStore(nextInstruction);
          break;
        case "MUL.D":
          checkMul(nextInstruction);
          break;
        case "SUB.D":
          checkAdd(nextInstruction);
          break;
        case "ADD.D":
          checkAdd(nextInstruction);
          break;
        case "DIV.D":
          checkMul(nextInstruction);
          break;
      }
    }
  }

  function checkMul(nextInstruction) {
    for (let index = 0; index < mulResStation.length; index++) {
      const element = mulResStation[index];
      if (element.busy === 0) {
        instructions[currentInstruction].issue = cycleNumber;
        instructions[currentInstruction].station = element.name;
        mulResStation[index].busy = 1;
        mulResStation[index].op = nextInstruction.opcode;

        const regFiletemp = regFile.map((file) =>
          file.name != nextInstruction.destination
            ? file
            : { name: file.name, qi: element.name, content: "" }
        );
        setregFile([...regFiletemp]);

        const j = nextInstruction.j;
        const k = nextInstruction.k;
        for (let i = 0; i < regFile.length; i++) {
          if (regFile[i].name === j) {
            if (regFile[i].qi === "") {
              mulResStation[index].vj = regFile[i].content;
            } else {
              mulResStation[index].qj = regFile[i].qi;
            }
          }
          if (regFile[i].name === k) {
            if (regFile[i].qi === "") {
              mulResStation[index].vk = regFile[i].content;
            } else {
              mulResStation[index].qk = regFile[i].qi;
            }
          }

          if (mulResStation[index].vj != "" && mulResStation[index].vk != "") {
            instructions[currentInstruction].toBeExecuted = true;
          }
        }
        return;
      }
    }
    currentInstruction = currentInstruction - 1;
  }
  function checkAdd(nextInstruction) {
    for (let index = 0; index < addResStation.length; index++) {
      const element = addResStation[index];
      if (element.busy === 0) {
        instructions[currentInstruction].issue = cycleNumber;
        instructions[currentInstruction].station = element.name;
        addResStation[index].busy = 1;
        addResStation[index].op = nextInstruction.opcode;

        const regFiletemp = regFile.map((file) =>
          file.name != nextInstruction.destination
            ? file
            : { name: file.name, qi: element.name, content: "" }
        );
        setregFile([...regFiletemp]);

        const j = nextInstruction.j;
        const k = nextInstruction.k;
        for (let i = 0; i < regFile.length; i++) {
          if (regFile[i].name === j) {
            if (regFile[i].qi === "") {
              addResStation[index].vj = regFile[i].content;
            } else {
              addResStation[index].qj = regFile[i].qi;
            }
          }
          if (regFile[i].name === k) {
            if (regFile[i].qi === "") {
              addResStation[index].vk = regFile[i].content;
            } else {
              addResStation[index].qk = regFile[i].qi;
            }
          }

          if (addResStation[index].vj != "" && addResStation[index].vk != "") {
            instructions[currentInstruction].toBeExecuted = true;
          }
        }
        return;
      }
    }
    currentInstruction = currentInstruction - 1;
  }
  function checkStore(nextInstruction) {
    for (let index = 0; index < storeBuffer.length; index++) {
      const element = storeBuffer[index];
      if (element.busy === 0) {
        instructions[currentInstruction].issue = cycleNumber;
        instructions[currentInstruction].station = element.name;
        storeBuffer[index].busy = 1;
        storeBuffer[index].address =
          Register[nextInstruction.k] + parseInt(nextInstruction.j);

        const dest = nextInstruction.destination;
        for (let j = 0; j < regFile.length; j++) {
          if (regFile[j].name === dest) {
            if (regFile[j].qi === "") {
              storeBuffer[index].v = regFile[j].content;

              instructions[currentInstruction].toBeExecuted = true;
            } else {
              storeBuffer[index].q = regFile[j].qi;
            }
          }
        }
        return;
      }
    }
    currentInstruction = currentInstruction - 1;
  }
  function checkLoad(nextInstruction) {
    for (let index = 0; index < loadBuffer.length; index++) {
      const element = loadBuffer[index];
      if (element.busy == 0) {
        element.busy = 1;
        element.address = Registerfile[nextInstruction.k] + nextInstruction.j;
        const regFiletemp = regFile.map((file) =>
          file.name != nextInstruction.destination
            ? file
            : { name: file.name, qi: element.name, content: "" }
        );
        setregFile([...regFiletemp]);
        instructions[currentInstruction].issue = cycleNumber;
        instructions[currentInstruction].toBeExecuted = true;
        instructions[currentInstruction].station = element.name;
        setInstructions(instructions);
        loadBuffer[index].busy = 1;

        loadBuffer[index].address =
          parseInt(Register[nextInstruction.k]) + parseInt(nextInstruction.j);
        setLoadbuffer([...loadBuffer]);

        return;
      }
    }
    currentInstruction = currentInstruction - 1;
  }

  return (
    <div className="App">
      <nav className="navbar">
        <h1 style={{ marginTop: 20, fontFamily: "cursive" }}>
          TOMASULO ARCHITECTURE VIUALISER
        </h1>
      </nav>
      <Grid celled="internally" columns="equal">
        <Grid.Row columns={2}>
          <Grid.Column>
            <Grid.Row>
              <Grid.Column textAlign="center">
                <Segment textAlign="center">
                  <Header>Instruction Adder</Header>
                  <InputInstructions
                    disabled={disable}
                    addInstruction={setInstructions}
                    instructionSet={instructions}
                    className="inputins"
                  />
                  <InstructionQueue
                    disabled={disable}
                    instructionset={instructions}
                    setInstructionset={setInstructions}
                  />
                </Segment>
              </Grid.Column>
            </Grid.Row>
            <Grid.Row>
              <Grid.Column>
                <Segment>
                  <Grid
                    columns={2}
                    columns="equal"
                    celled="internally"
                    textAlign="center"
                  >
                    <Grid.Row verticalAlign="middle">
                      <Grid.Column>
                        <LoadBuffer loadBuffer={loadBuffer} />
                      </Grid.Column>

                      <Grid.Column>
                        <StoreBuffer storeBuffer={storeBuffer} />
                      </Grid.Column>
                    </Grid.Row>
                  </Grid>
                </Segment>
              </Grid.Column>
            </Grid.Row>

            <Grid.Row>
              <Grid.Column>
                <Segment>
                  <Grid columns={2} columns="equal" textAlign="center">
                    <Grid.Row verticalAlign="middle">
                      <Grid.Column>
                        <AddReservationStation addResStation={addResStation} />
                      </Grid.Column>

                      <Grid.Column>
                        <MulReservationStation mulResStation={mulResStation} />
                      </Grid.Column>
                    </Grid.Row>
                  </Grid>
                </Segment>
              </Grid.Column>
            </Grid.Row>
          </Grid.Column>

          <Grid.Column floated="right" width={6}>
            <Grid.Column textAlign="center">
              <div style={{ position: "fixed", width: "100%" }}>
                <Button
                  style={{ marginBottom: 20, marginLeft: 180 }}
                  variant="contained"
                  color="red"
                  onClick={nextCycle}
                  disabled={instructions.length === 0}
                >
                  Play Cycle {cycleNumber}
                </Button>

                <Popup
                  content="RESET"
                  trigger={
                    <Button
                      style={{ marginBottom: 20, left: "14%" }}
                      variant="contained"
                      secondary
                      color="red"
                      icon
                      onClick={() => window.location.reload(false)}
                    >
                      <Icon name="refresh" />
                    </Button>
                  }
                />
                <div className="rightC">
                  <Registerfile regFile={regFile} />
                  <MemoryComponent />
                </div>
              </div>
            </Grid.Column>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </div>
  );
}

export default App;
