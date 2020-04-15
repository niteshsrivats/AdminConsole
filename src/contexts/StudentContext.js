import React, { useState } from 'react';

const StudentsContext = React.createContext();

const StudentsProvider = props => {
  const [students, setStudents] = useState({
    records: [],
    previousSearch: {},
    fetchEnabled: true,
  });

  return (
    <StudentsContext.Provider value={{ students, setStudents }}>
      {props.children}
    </StudentsContext.Provider>
  );
};

export { StudentsProvider };
export default StudentsContext;
