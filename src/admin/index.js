import React from 'react';
import { useHistory } from 'react-router-dom';
import { Admin, Resource } from 'react-admin';
import CustomLoginPage from './CustomLoginPage';
import CustomRoutes from './CustomRoutes';
import { authProvider, dataProvider } from '../providers';

import { CreateEmulator, EmulatorsList, EditEmulator } from '../containers/emulator';

const AdminDashboard = () => {
  const history = useHistory();

  return (
    <Admin
      dataProvider={dataProvider}
      authProvider={authProvider}
      loginPage={CustomLoginPage}
      customRoutes={CustomRoutes}
      history={history}
    >
      <Resource
        name="emulators"
        create={CreateEmulator}
        list={EmulatorsList}
        edit={EditEmulator}
      />
    </Admin>
  );
};

export default AdminDashboard;
