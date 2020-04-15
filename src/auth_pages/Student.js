import React, { useContext, useState } from 'react';
import Paper from '@material-ui/core/Paper';
import Layout from '../components/common/Layout';
import PrivateRoute from '../components/auth/PrivateRoute';
import SEO from '../components/SEO';
import DataTable from '../components/table/DataTable';
import makeStyles from '@material-ui/core/styles/makeStyles';
import AlertDialog from '../components/common/AlertDialog';
import DepartmentsContext from '../contexts/DepartmentsContext';
import StudentsContext from '../contexts/StudentContext';
import { getSectionsAndSemesters } from '../utils/multiValueUtils';
import { createUser, createUserDocument, deleteUser } from '../services/UserService';
import {
  deleteFirestoreDocument,
  fetchFirestoreDocuments,
  updateFirestoreDocument,
} from '../services/FirestoreService';

const styles = makeStyles(theme => ({
  paper: {
    minWidth: theme.breakpoints.values.sm,
    maxWidth: theme.breakpoints.values.lg,
    margin: 'auto',
    overflow: 'auto',
  },
}));

const Student = () => {
  const classes = styles();
  const { departments } = useContext(DepartmentsContext);
  const { students, setStudents } = useContext(StudentsContext);
  const [alert, setAlert] = useState({ show: false, title: '', content: '' });

  const headings = {
    name: {
      name: 'Name',
      show: true,
      padding: true,
      sort: true,
      edit: true,
      size: 'large',
    },
    id: {
      name: 'ID',
      show: true,
      sort: true,
      size: 'medium',
    },
    email: {
      name: 'Email',
      show: true,
      sort: true,
      size: 'large',
    },
    number: {
      name: 'Number',
      show: true,
      sort: true,
      edit: true,
      size: 'medium',
    },
    department: {
      name: 'Department',
      show: true,
      edit: true,
      filter: true,
      filterCombinations: ['year', 'semesters'],
      size: 'small',
    },
    year: {
      name: 'Year',
      show: true,
      edit: true,
      filter: true,
      filterCombinations: ['department'],
      size: 'small',
    },
    semesters: {
      name: 'Semesters',
      array: true,
      filter: true,
      filterCombinations: ['department'],
      size: 'large',
    },
    sections: {
      name: 'Sections',
      show: true,
      edit: true,
      array: true,
      padding: true,
      filter: true,
      filterCombinations: [],
      size: 'large',
    },
  };

  const addDocument = async data => {
    for (let i = 0; i < departments.length; i++) {
      if (departments[i].code === data.department) {
        const uid = await createUser(data.email, 'student');
        if (!!uid) {
          const { sections, semesters } = getSectionsAndSemesters(data.sections);
          data.documentId = uid;
          data.sections = sections;
          data.semesters = semesters;
          data.type = 'student';
          createUserDocument('users', data);
          return true;
        } else {
          setAlert({
            show: true,
            title: 'Error',
            content: `User with email ${data.email} already exists.`,
          });
          return false;
        }
      }
    }
    setAlert({
      show: true,
      title: 'Error',
      content: `Department with code ${data.department} does not exists.`,
    });
    return false;
  };

  const updateDocument = data => {
    for (let i = 0; i < departments.length; i++) {
      if (departments[i].code === data.department) {
        const { sections, semesters } = getSectionsAndSemesters(data.sections);
        data.sections = sections;
        data.semesters = semesters;
        return updateFirestoreDocument('users', data)
          .then(() => {
            for (let i = 0; i < students.records.length; i++) {
              if (students.records[i].documentId === data.documentId) {
                Object.assign(students.records[i], data);
                break;
              }
            }
            return true;
          })
          .catch(() => {
            setAlert({
              show: true,
              title: 'Error',
              content: `Unknown error occurred while updating a document.`,
            });
            return false;
          });
      }
    }
    setAlert({
      show: true,
      title: 'Error',
      content: `Department with code ${data.department} does not exists.`,
    });
    return false;
  };

  const fetchDocuments = (query, numRecords, order, orderBy, startCursor, filters) => {
    return fetchFirestoreDocuments(
      'users',
      query,
      numRecords,
      order,
      orderBy,
      startCursor,
      filters,
      'student',
      headings
    );
  };

  const deleteDocument = async data => {
    deleteUser(data.email);
    return deleteFirestoreDocument('users', data.documentId);
  };

  const handleClose = () => {
    setAlert({ ...alert, show: false });
  };

  return (
    <>
      <SEO title="Students" />
      <AlertDialog
        show={alert.show}
        title={alert.title}
        content={alert.content}
        handleClose={handleClose}
      />
      <Layout>
        <Paper className={classes.paper}>
          <DataTable
            data={students}
            setData={setStudents}
            headings={headings}
            fetchDocuments={fetchDocuments}
            addDocument={addDocument}
            updateDocument={updateDocument}
            deleteDocument={deleteDocument}
            renderFilter={true}
            buttonText={'Add Student'}
          />
        </Paper>
      </Layout>
    </>
  );
};

export default PrivateRoute(Student);
