import React from "react";
import { Container, Header, Table } from "semantic-ui-react";

export default function InstructionQueue({ regFile, setregFile }) {
  return (
    <>
      <Container textAlign="center">
        <Header>Register File</Header>
        <Table celled>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Name</Table.HeaderCell>
              <Table.HeaderCell>Qi</Table.HeaderCell>
              <Table.HeaderCell>Content</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {regFile.map((filaya) => (
              <Table.Row key={filaya.name}>
                <Table.Cell>{filaya.name}</Table.Cell>
                <Table.Cell>{filaya.qi}</Table.Cell>
                <Table.Cell>{filaya.content}</Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      </Container>
    </>
  );
}
