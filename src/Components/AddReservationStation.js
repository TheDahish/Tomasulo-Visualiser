import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Header, Table } from "semantic-ui-react";

export default function AddReservationStation({
  addResStation,
  setAddresStation,
}) {
  return (
    <>
      <Header>Reservation Station A</Header>
      <Table color="violet" inverted celled>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Name</Table.HeaderCell>
            <Table.HeaderCell>Busy</Table.HeaderCell>
            <Table.HeaderCell>Instruction</Table.HeaderCell>
            <Table.HeaderCell>Vj</Table.HeaderCell>
            <Table.HeaderCell>Vk</Table.HeaderCell>
            <Table.HeaderCell>Qj</Table.HeaderCell>
            <Table.HeaderCell>Qk</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {addResStation.map((instruction) => (
            <Table.Row error={instruction.busy} key={instruction.name}>
              <Table.Cell component="th" scope="row">
                {instruction.name}
              </Table.Cell>
              <Table.Cell>{instruction.busy}</Table.Cell>
              <Table.Cell>{instruction.op}</Table.Cell>
              <Table.Cell>{instruction.vj}</Table.Cell>
              <Table.Cell>{instruction.vk}</Table.Cell>
              <Table.Cell>{instruction.qj}</Table.Cell>
              <Table.Cell>{instruction.qk}</Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </>
  );
}
