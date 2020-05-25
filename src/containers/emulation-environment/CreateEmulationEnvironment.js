import React from 'react';
import { Create } from 'react-admin';

import EmulationEnvironmentForm from './EmulationEnvironmentForm';

const CreateEmulationEnvironment = (props) => (
  <Create
    {...props}
    title="Create Emulation environment"
  >
    <EmulationEnvironmentForm skipId />
  </Create>
);

export default CreateEmulationEnvironment;
