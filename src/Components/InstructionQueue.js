import React, { useState } from "react";
import { Card, Icon, Table } from "semantic-ui-react";

export default function InstructionQueue({
  disabled,
  instructionset,
  setInstructionset,
}) {
  function deleteIns(i) {
    instructionset.splice(i, 1);
    setInstructionset([...instructionset]);
  }
  return (
    <>
      <Card centered style={{ width: 670 }}>
        <Card.Header textAlign="center">Instructions</Card.Header>
        <Card.Content>
          <Table celled size="large">
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>Instruction</Table.HeaderCell>
                <Table.HeaderCell>Destination</Table.HeaderCell>
                <Table.HeaderCell>J</Table.HeaderCell>
                <Table.HeaderCell>K</Table.HeaderCell>
                <Table.HeaderCell>Isuue</Table.HeaderCell>
                <Table.HeaderCell>Execution</Table.HeaderCell>
                <Table.HeaderCell>Write Result</Table.HeaderCell>
                <Table.HeaderCell>Station</Table.HeaderCell>
                <Table.HeaderCell></Table.HeaderCell>
              </Table.Row>
            </Table.Header>

            <Table.Body>
              {instructionset.map((instruction, i) => (
                <Table.Row
                  positive={
                    instruction.executionComplete.start !== 0 &&
                    instruction.executionComplete.end !== 0
                  }
                  negative={
                    instruction.executionComplete.start !== 0 &&
                    instruction.executionComplete.end === 0
                  }
                  warning={
                    instruction.issue !== 0 &&
                    instruction.executionComplete.start === 0
                  }
                >
                  <Table.Cell>{instruction.opcode}</Table.Cell>
                  <Table.Cell>{instruction.destination}</Table.Cell>
                  <Table.Cell>{instruction.j}</Table.Cell>
                  <Table.Cell>{instruction.k}</Table.Cell>
                  <Table.Cell>
                    {instruction.issue === 0 ? "" : instruction.issue}
                  </Table.Cell>
                  <Table.Cell>
                    {"".concat(
                      instruction.executionComplete.start === 0
                        ? ""
                        : instruction.executionComplete.start,

                      instruction.executionComplete.end !== 0
                        ? ".." + instruction.executionComplete.end
                        : ""
                    )}
                  </Table.Cell>
                  <Table.Cell>
                    {instruction.writeResult === 0
                      ? ""
                      : instruction.writeResult}
                  </Table.Cell>
                  <Table.Cell>{instruction.station}</Table.Cell>
                  <Table.Cell>
                    <Icon
                      disabled={disabled}
                      style={disabled ? null : { cursor: "pointer" }}
                      onClick={() => {
                        deleteIns(i);
                      }}
                      name="close"
                    />
                  </Table.Cell>
                </Table.Row>
              ))}
              {instructionset.length === 0 && (
                <Table.Row>
                  <Table.Cell></Table.Cell>
                  <Table.Cell></Table.Cell>
                  <Table.Cell></Table.Cell>
                  <Table.Cell></Table.Cell>
                  <Table.Cell></Table.Cell>
                  <Table.Cell></Table.Cell>
                  <Table.Cell></Table.Cell>
                  <Table.Cell></Table.Cell>
                </Table.Row>
              )}
            </Table.Body>
          </Table>
        </Card.Content>
      </Card>
    </>
  );
}
