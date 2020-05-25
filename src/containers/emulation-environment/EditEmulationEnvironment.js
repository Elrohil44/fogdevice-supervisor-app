import React from 'react';
import { Edit } from 'react-admin';

import EmulationEnvironmentForm from './EmulationEnvironmentForm';

const EditEmulationEnvironment = (props) => (
  <Edit
    {...props}
    title="Edit Emulation environment"
    undoable={false}
  >
    <EmulationEnvironmentForm />
  </Edit>
);

export default EditEmulationEnvironment;
