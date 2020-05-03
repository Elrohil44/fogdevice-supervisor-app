import React from 'react';
import { Edit } from 'react-admin';

import EmulatorForm from './EmulatorForm';

const EditEmulator = (props) => (
  <Edit
    {...props}
    undoable={false}
  >
    <EmulatorForm />
  </Edit>
);

export default EditEmulator;
