import React from "react";
import { Header, Table } from "semantic-ui-react";

export default function InstructionQueue({ loadBuffer }) {
  return (
    <>
      <Header>Load Buffer</Header>
      <Table color="blue" inverted celled>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Name</Table.HeaderCell>
            <Table.HeaderCell>Busy</Table.HeaderCell>
            <Table.HeaderCell>Address</Table.HeaderCell>
            <Table.HeaderCell>Content</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {loadBuffer.map((instruction) => (
            <Table.Row key={instruction.name}>
              <Table.Cell component="th" scope="row">
                {instruction.name}
              </Table.Cell>
              <Table.Cell>{instruction.busy}</Table.Cell>
              <Table.Cell>{instruction.address}</Table.Cell>
              <Table.Cell>{instruction.content}</Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </>
  );
}
