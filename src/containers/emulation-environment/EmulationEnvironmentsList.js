import React from 'react';
import {
  List, Datagrid, TextField, EditButton,
} from 'react-admin';

const EmulationEnvironmentsList = (props) => (
  <List
    {...props}
    title="Emulation environments"
  >
    <Datagrid>
      <TextField source="_id" />
      <TextField source="name" />
      <EditButton />
    </Datagrid>
  </List>
);

export default EmulationEnvironmentsList;
