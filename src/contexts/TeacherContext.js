import React, { useState } from 'react';

const TeachersContext = React.createContext();

const TeachersProvider = props => {
  const [teachers, setTeachers] = useState({
    records: [],
    previousSearch: {},
    fetchEnabled: true,
  });

  return (
    <TeachersContext.Provider value={{ teachers, setTeachers }}>
      {props.children}
    </TeachersContext.Provider>
  );
};

export { TeachersProvider };
export default TeachersContext;
