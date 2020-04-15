import React, { useState } from 'react';

const AdminsContext = React.createContext();

const AdminsProvider = props => {
  const [admins, setAdmins] = useState({
    records: [],
    previousSearch: {},
    fetchEnabled: true,
  });

  return (
    <AdminsContext.Provider value={{ admins, setAdmins }}>{props.children}</AdminsContext.Provider>
  );
};

export { AdminsProvider };
export default AdminsContext;
