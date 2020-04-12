import React, { useContext, useState } from 'react';
import Paper from '@material-ui/core/Paper';
import Layout from '../components/common/Layout';
import PrivateRoute from '../components/auth/PrivateRoute';
import SEO from '../components/SEO';
import DataTable from '../components/table/DataTable';
import makeStyles from '@material-ui/core/styles/makeStyles';
import firebase from 'gatsby-plugin-firebase';
import AlertDialog from '../components/common/AlertDialog';
import DepartmentsContext from '../contexts/DepartmentsContext';
import StudentsContext from '../contexts/StudentContext';

const styles = makeStyles(theme => ({
  paper: {
    minWidth: theme.breakpoints.values.sm,
    margin: 'auto',
    overflow: 'auto',
  },
}));

const Dashboard = ({ user }) => {
  const classes = styles();
  const { departments } = useContext(DepartmentsContext);
  const { students, setStudents } = useContext(StudentsContext);
  const [alert, setAlert] = useState({ show: false, title: '', content: '' });

  const headings = [
    { id: 'Name', padding: true, array: false, sort: true, edit: true, size: 'large' },
    { id: 'ID', padding: false, array: false, sort: true, edit: false, size: 'medium' },
    { id: 'Email', padding: false, array: false, sort: true, edit: false, size: 'large' },
    { id: 'Number', padding: false, array: false, sort: true, edit: true, size: 'medium' },
    { id: 'Department', padding: false, array: false, sort: false, edit: true, size: 'small' },
    { id: 'Year', padding: false, array: false, sort: false, edit: true, size: 'small' },
    { id: 'Sections', padding: true, array: true, sort: false, edit: true, size: 'medium' },
  ];

  const getSectionsAndSemesters = sections => {
    sections = sections
      .replace(/ |, ?$/g, '')
      .split(',')
      .sort();

    const semesters = sections.map(section => {
      const yearIndex = section.length === 8 ? 4 : 5;
      return [
        section.charAt(0),
        section.slice(2, yearIndex),
        section.slice(yearIndex, section.length),
      ].join('-');
    });

    return { sections, semesters };
  };

  const addDocument = async data => {
    for (let i = 0; i < departments.length; i++) {
      if (departments[i].code === data.department) {
        const uid = await firebase
          .auth()
          .createUserWithEmailAndPassword(data.email, '123456')
          .then(response => {
            return response.user.uid;
          })
          .catch(() => {
            setAlert({
              show: true,
              title: 'Error',
              content: `User with email ${data.email} already exists.`,
            });
            return null;
          });

        const { sections, semesters } = getSectionsAndSemesters(data.sections);

        if (!!uid) {
          const firestoreDocument = {
            id: data.id,
            documentId: uid,
            name: data.name,
            email: data.email,
            number: data.number,
            department: data.department,
            semesters: semesters,
            sections: sections,
            year: data.year,
            type: 'student',
          };

          firebase
            .firestore()
            .collection('users')
            .doc(uid)
            .set(firestoreDocument)
            .catch(error => console.log(error));
          break;
        }
      } else {
        setAlert({
          show: true,
          title: 'Error',
          content: `Department with code ${data.department} does not exists.`,
        });
      }
    }
  };

  const updateDocument = async data => {
    for (let i = 0; i < departments.length; i++) {
      if (departments[i].code === data.department) {
        const { sections, semesters } = getSectionsAndSemesters(data.sections);
        const firestoreDocument = {
          name: data.name,
          number: data.number,
          department: data.department,
          semesters: semesters,
          sections: sections,
          year: data.year,
        };

        firebase
          .firestore()
          .collection('users')
          .doc(data.documentId)
          .update(firestoreDocument)
          .catch(error => console.log(error));
        break;
      } else {
        setAlert({
          show: true,
          title: 'Error',
          content: `Department with code ${data.department} does not exists.`,
        });
      }
    }
  };

  const fetchDocuments = (query, rowsPerPage, order, orderBy) => {
    let firebaseQuery = firebase.firestore().collection('users');

    let startAt = query;
    let endAt = query + '\uf8ff';
    if (order === 'desc') {
      [startAt, endAt] = [endAt, startAt];
    }

    return firebaseQuery
      .orderBy(orderBy, order)
      .startAt(startAt)
      .endAt(endAt)
      .limit(rowsPerPage)
      .get();
  };

  const deleteDocument = data => {
    return firebase
      .firestore()
      .collection('users')
      .doc(data.documentId)
      .delete();
  };

  /*
  const update = () => {
    firebase
      .firestore()
      .collection('users')
      .get()
      .then(response => {
        response.docs.map(async doc => {
          const data = doc.data();

          const documentId = data['uid'];

          firebase
            .firestore()
            .collection('users')
            .doc(data.uid)
            .update({
              uid: firebase.firestore.FieldValue.delete(),
              documentId: documentId,
            })
            .then(response => {
              console.log('FINE');
            })
            .catch(error => {
              console.log(error);
            });
        });
      })
      .catch(error => {
        console.log(error);
        return [];
      });
  };
  */

  const handleClose = () => {
    setAlert({ ...alert, show: false });
  };

  return (
    <>
      <SEO title="Dashboard" />
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
            headings={headings}
            searchText="Search by name"
            fetchDocuments={fetchDocuments}
            addDocument={addDocument}
            updateDocument={updateDocument}
            deleteDocuments={deleteDocument}
            buttonText={'Add User'}
          />
        </Paper>
      </Layout>
    </>
  );
};

export default PrivateRoute(Dashboard);
