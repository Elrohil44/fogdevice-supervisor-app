import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import AdminDashboard from './admin';

const App = () => (
  <BrowserRouter>
    <AdminDashboard />
  </BrowserRouter>
);

export default App;
