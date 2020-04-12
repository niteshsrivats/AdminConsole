import React, { Component, useState } from 'react';
import firebase from 'gatsby-plugin-firebase';

const StudentsContext = React.createContext();

const StudentsProvider = () => {
  const [students, setStudents] = useState([]);

  return (
    <StudentsContext.Provider value={{ students, setStudents }}>
      {this.props.children}
    </StudentsContext.Provider>
  );
};

export { StudentsProvider };
export default StudentsContext;
