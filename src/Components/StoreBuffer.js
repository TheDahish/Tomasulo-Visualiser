import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Header, Table } from "semantic-ui-react";

export default function InstructionQueue({ storeBuffer }) {
  return (
    <>
      <Header>Store Buffer</Header>
      <Table color="blue" inverted celled>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Name</Table.HeaderCell>
            <Table.HeaderCell>Busy</Table.HeaderCell>
            <Table.HeaderCell>Address</Table.HeaderCell>
            <Table.HeaderCell>V</Table.HeaderCell>
            <Table.HeaderCell>Q</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {storeBuffer.map((filaya) => (
            <Table.Row error={filaya.busy} key={filaya.name}>
              <Table.Cell>{filaya.name}</Table.Cell>
              <Table.Cell>{filaya.busy}</Table.Cell>
              <Table.Cell>{filaya.address}</Table.Cell>
              <Table.Cell>{filaya.v}</Table.Cell>
              <Table.Cell>{filaya.q}</Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </>
  );
}
