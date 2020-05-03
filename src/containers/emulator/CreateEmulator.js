import React from 'react';
import { Create } from 'react-admin';

import EmulatorForm from './EmulatorForm';

const CreateEmulator = (props) => (
  <Create {...props}>
    <EmulatorForm skipId />
  </Create>
);

export default CreateEmulator;
