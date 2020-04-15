import firebase from 'gatsby-plugin-firebase';

export const createUser = async (email, role) => {
  const grantUserRole = firebase.functions().httpsCallable('createUser');
  const response = await grantUserRole({ email, role });
  return response.data.uid;
};

export const deleteUser = email => {
  const deleteUser = firebase.functions().httpsCallable('deleteUser');
  return deleteUser({ email });
};

export const createUserDocument = (collection, data) => {
  return firebase
    .firestore()
    .collection(collection)
    .doc(data.documentId)
    .set(data)
    .then(() => {
      return true;
    })
    .catch(error => {
      console.log(error);
      return false;
    });
};
