import { DepartmentsProvider } from './DepartmentsContext';
import React from 'react';
import { StudentsProvider } from './StudentContext';
import { TeachersProvider } from './TeacherContext';
import { AdminsProvider } from './AdminContext';

const DataContextWrapper = props => {
  return (
    <DepartmentsProvider>
      <StudentsProvider>
        <TeachersProvider>
          <AdminsProvider>{props.children}</AdminsProvider>
        </TeachersProvider>
      </StudentsProvider>
    </DepartmentsProvider>
  );
};

export default DataContextWrapper;
