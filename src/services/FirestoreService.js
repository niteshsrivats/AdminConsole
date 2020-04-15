import firebase from 'gatsby-plugin-firebase';

export const updateFirestoreDocument = (collection, data) => {
  return firebase
    .firestore()
    .collection(collection)
    .doc(data.documentId)
    .update(data)
    .then(() => {
      return true;
    })
    .catch(error => {
      return false;
    });
};

export const fetchFirestoreDocuments = (
  collection,
  query,
  numRecords,
  order,
  orderBy,
  startCursor,
  filters,
  type,
  headings
) => {
  let firebaseQuery = firebase.firestore().collection(collection);

  if (!!type) {
    firebaseQuery = firebaseQuery.where('type', '==', type);
  }

  Object.keys(filters).forEach(id => {
    if (!!filters[id]) {
      if (headings[id].array) {
        const values = filters[id]
          .replace(/ |, ?$/g, '')
          .split(',')
          .sort();
        firebaseQuery = firebaseQuery.where(id, 'array-contains-any', values);
      } else {
        firebaseQuery = firebaseQuery.where(id, '==', filters[id]);
      }
    }
  });

  let startAt = query;
  let endAt = query + '\uf8ff';
  if (order === 'desc') {
    [startAt, endAt] = [endAt, startAt];
  }

  firebaseQuery = firebaseQuery.orderBy(orderBy, order);

  if (!!startCursor) {
    if (order === 'desc') {
      firebaseQuery = firebaseQuery.endBefore(startCursor[orderBy]).startAt(startAt);
    } else {
      firebaseQuery = firebaseQuery.startAfter(startCursor[orderBy]).endAt(endAt);
    }
  } else {
    firebaseQuery = firebaseQuery.startAt(startAt).endAt(endAt);
  }

  return firebaseQuery.limit(numRecords).get();
};

export const deleteFirestoreDocument = (collection, documentId) => {
  return firebase
    .firestore()
    .collection(collection)
    .doc(documentId)
    .delete();
};

// export const update = () => {
//   firebase
//     .firestore()
//     .collection('users')
//     .get()
//     .then(response => {
//       response.docs.map(async doc => {
//         const data = doc.data();
//         const year = data['year'].toString();
//
//         firebase
//           .firestore()
//           .collection('users')
//           .doc(data.documentId)
//           .update({ year: year })
//           .then(response => {
//             console.log('FINE');
//           })
//           .catch(error => {
//             console.log(error);
//           });
//       });
//     })
//     .catch(error => {
//       console.log(error);
//       return [];
//     });
// };
