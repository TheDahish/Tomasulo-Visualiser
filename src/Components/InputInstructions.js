import React, { useEffect, useState } from "react";
import { Button, Dropdown, Icon, Input } from "semantic-ui-react";

import "semantic-ui-css/semantic.min.css";

export default function InputInstructions({
  disabled,
  instructionSet,
  addInstruction,
}) {
  const [errMesssage, setErrMessage] = useState([]);
  const [err, setErr] = useState({
    opcode: false,
    destination: false,
    j: false,
    k: false,
  });
  const [isMemory, setIsMemory] = useState(false);
  const [instruction, setInstruction] = useState({
    opcode: "",
    destination: "",
    j: "",
    k: "",
    issue: 0,
    executionComplete: { start: 0, end: 0 },
    writeResult: 0,
    toBeExecuted: false,
    station: "",
  });
  const instructionOptions = [
    { key: "MUL.D", text: "MUL.D", value: "MUL.D" },
    { key: "DIV.D", text: "DIV.D", value: "DIV.D" },
    { key: "ADD.D", text: "ADD.D", value: "ADD.D" },
    { key: "SUB.D", text: "SUB.D", value: "SUB.D" },
    { key: "L.D", text: "L.D", value: "L.D" },
    { key: "S.D", text: "S.D", value: "S.D" },
  ];
  const addressOptions = [
    { key: "F0", text: "F0", value: "F0" },
    { key: "F1", text: "F1", value: "F1" },
    { key: "F2", text: "F2", value: "F2" },
    { key: "F3", text: "F3", value: "F3" },
    { key: "F4", text: "F4", value: "F4" },
    { key: "F5", text: "F5", value: "F5" },
    { key: "F6", text: "F6", value: "F6" },
    { key: "F7", text: "F7", value: "F7" },
    { key: "F8", text: "F8", value: "F8" },
    { key: "F9", text: "F9", value: "F9" },
    { key: "F10", text: "F10", value: "F10" },
  ];
  const addressOptionsR = [
    { key: "R0", text: "R0", value: "R0" },
    { key: "R1", text: "R1", value: "R1" },
    { key: "R2", text: "R2", value: "R2" },
    { key: "R3", text: "R3", value: "R3" },
    { key: "R4", text: "R4", value: "R4" },
    { key: "R5", text: "R5", value: "R5" },
    { key: "R6", text: "R6", value: "R6" },
    { key: "R7", text: "R7", value: "R7" },
    { key: "R8", text: "R8", value: "R8" },
    { key: "R9", text: "R9", value: "R9" },
  ];

  function InstructionChange(e, { value }) {
    if (value === "L.D" || value === "S.D") {
      setIsMemory(true);
    } else {
      setIsMemory(false);
    }
    instruction.opcode = value;

    setInstruction(instruction);
  }
  function DestinationChange(e, { value }) {
    instruction.destination = value;

    setInstruction(instruction);
  }
  function Reg1Change(e, { value }) {
    instruction.j = value;

    setInstruction(instruction);
  }
  function Reg2Change(e, { value }) {
    instruction.k = value;
    setInstruction(instruction);
  }

  function handleClick() {
    if (instruction.opcode === "") {
      {
        err.opcode = true;
      }
    } else {
      err.opcode = false;
    }
    if (instruction.destination === "") {
      err.destination = true;
    } else {
      err.destination = false;
    }
    if (instruction.j === "") {
      err.j = true;
    } else {
      err.j = false;
    }
    if (instruction.k === "") {
      err.k = true;
    } else {
      err.k = false;
    }

    setErr({
      opcode: err.opcode,
      destination: err.destination,
      j: err.j,
      k: err.k,
    });
    if (!err.opcode && !err.destination && !err.j && !err.k) {
      console.log(instruction);
      const clone = { ...instruction };
      instructionSet.push(clone);
      addInstruction([...instructionSet]);
    }
  }

  return (
    <>
      <div className="dropcontainer">
        <Dropdown
          error={err.opcode.isTrue}
          button
          floating
          options={instructionOptions}
          header="PLEASE SELECT AN INSTRUCTION"
          placeholder="Instruction"
          onChange={InstructionChange}
        />
        <Dropdown
          error={err.destination.isTrue}
          button
          floating
          options={addressOptions}
          header="PLEASE SELECT A DESTINATION"
          placeholder="Destination"
          onChange={DestinationChange}
        />
        {isMemory ? (
          <Input
            error={err.j}
            placeholder="Number"
            style={{ width: 60 }}
            onChange={Reg1Change}
          />
        ) : (
          <Dropdown
            error={err.j.isTrue}
            button
            floating
            options={addressOptions}
            header="PLEASE SELECT REGISTER 1"
            placeholder="Register 1"
            onChange={Reg1Change}
          />
        )}
        <Dropdown
          error={err.k.isTrue}
          button
          options={isMemory ? addressOptionsR : addressOptions}
          header={`PLEASE SELECT REGISTER ${isMemory ? "1" : "2"}`}
          placeholder={`Register ${isMemory ? "1" : "2"}`}
          onChange={Reg2Change}
        />
        <Button
          icon
          labelPosition="left"
          disabled={disabled}
          primary
          onClick={handleClick}
        >
          <Icon name="add" />
          ADD
        </Button>
      </div>
      {(err.opcode || err.destination || err.j || err.k) && (
        <div className="ui error message">
          <ul className="list">
            {err.opcode ? <li>Please choose instruction</li> : null}
            {err.destination ? <li>Please choose destination</li> : null}
            {err.j ? <li>Please choose registor 1</li> : null}
            {err.k ? <li>Please choose registor 2</li> : null}
          </ul>
        </div>
      )}
    </>
  );
}
