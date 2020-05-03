import React from 'react';
import {
  List, Datagrid, TextField, EditButton,
} from 'react-admin';

const EmulatorsList = (props) => (
  <List {...props}>
    <Datagrid>
      <TextField source="_id" />
      <TextField source="name" />
      <TextField source="emulationType" />
      <EditButton />
    </Datagrid>
  </List>
);

export default EmulatorsList;
