import React, { useContext, useState } from 'react';
import Paper from '@material-ui/core/Paper';
import Layout from '../components/common/Layout';
import PrivateRoute from '../components/auth/PrivateRoute';
import SEO from '../components/SEO';
import DataTable from '../components/table/DataTable';
import makeStyles from '@material-ui/core/styles/makeStyles';
import AlertDialog from '../components/common/AlertDialog';
import { createUser, createUserDocument, deleteUser } from '../services/UserService';
import {
  deleteFirestoreDocument,
  fetchFirestoreDocuments,
  updateFirestoreDocument,
} from '../services/FirestoreService';
import AdminsContext from '../contexts/AdminContext';

const styles = makeStyles(theme => ({
  paper: {
    minWidth: theme.breakpoints.values.sm,
    maxWidth: theme.breakpoints.values.md,
    margin: 'auto',
    overflow: 'auto',
  },
}));

const Admin = () => {
  const classes = styles();
  const { admins, setAdmins } = useContext(AdminsContext);
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
    email: {
      name: 'Email',
      show: true,
      sort: true,
      size: 'large',
    },
    number: {
      name: 'Number',
      show: true,
      padding: true,
      sort: true,
      edit: true,
      size: 'medium',
    },
  };

  const addDocument = async data => {
    const uid = await createUser(data.email, 'admin');
    if (!!uid) {
      data.documentId = uid;
      createUserDocument('admins', data);
      return true;
    } else {
      setAlert({
        show: true,
        title: 'Error',
        content: `User with email ${data.email} already exists.`,
      });
      return false;
    }
  };

  const updateDocument = data => {
    return updateFirestoreDocument('admins', data)
      .then(() => {
        for (let i = 0; i < admins.records.length; i++) {
          if (admins.records[i].documentId === data.documentId) {
            Object.assign(admins.records[i], data);
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
  };

  const fetchDocuments = (query, numRecords, order, orderBy, startCursor, filters) => {
    return fetchFirestoreDocuments(
      'admins',
      query,
      numRecords,
      order,
      orderBy,
      startCursor,
      filters,
      null,
      headings
    );
  };

  const deleteDocument = data => {
    deleteUser(data.email);
    return deleteFirestoreDocument('admins', data.documentId);
  };

  const handleClose = () => {
    setAlert({ ...alert, show: false });
  };

  return (
    <>
      <SEO title="Admins" />
      <AlertDialog
        show={alert.show}
        title={alert.title}
        content={alert.content}
        handleClose={handleClose}
      />
      <Layout>
        <Paper className={classes.paper}>
          <DataTable
            data={admins}
            setData={setAdmins}
            headings={headings}
            fetchDocuments={fetchDocuments}
            addDocument={addDocument}
            updateDocument={updateDocument}
            deleteDocument={deleteDocument}
            renderFilter={false}
            buttonText={'Add Admin'}
          />
        </Paper>
      </Layout>
    </>
  );
};

export default PrivateRoute(Admin);
