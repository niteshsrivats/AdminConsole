const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp();

exports.createUser = functions.https.onCall((data, context) => {
  if (!context.auth.token.admin) {
    return { error: 'Request not authorized. User must be an admin to fulfill request.' };
  }
  return admin
    .auth()
    .createUser({
      email: data.email,
      password: '123456',
      disabled: false,
    })
    .then(user => {
      const customClaims = {};
      customClaims[data.role] = true;
      admin.auth().setCustomUserClaims(user.uid, customClaims);
      return { uid: user.uid };
    })
    .catch(error => {
      console.log(error);
      return { uid: null };
    });
});

exports.deleteUser = functions.https.onCall((data, context) => {
  if (!context.auth.token.admin) {
    return { error: 'Request not authorized. User must be an admin to fulfill request.' };
  }
  return admin
    .auth()
    .getUserByEmail(data.email)
    .then(user => admin.auth().deleteUser(user.uid));
});

// exports.grantUserRole = functions.https.onCall((data, context) => {
//   if (!context.auth.token.admin) {
//     return { error: 'Request not authorized. User must be an admin to fulfill request.' };
//   }
//   return grantAccessRole(data.email, data.role).then(() => {
//     return { result: `Request fulfilled! ${data.email} is now a admin.` };
//   });
// });
//
//
// async function grantAccessRole(email, role) {
//   const user = await admin.auth().getUserByEmail(email);
//
//   let customClaims = {};
//   switch (role) {
//     case 'admin':
//       if (user.customClaims && Boolean(user.customClaims.admin)) {
//         return;
//       }
//       customClaims = { admin: true };
//       break;
//     case 'teacher':
//       if (user.customClaims && Boolean(user.customClaims.teacher)) {
//         return;
//       }
//       customClaims = { teacher: true };
//       break;
//     case 'student':
//       if (user.customClaims && Boolean(user.customClaims.student)) {
//         return;
//       }
//       customClaims = { student: true };
//       break;
//   }
//
//   await admin.auth().setCustomUserClaims(user.uid, customClaims);
// }

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });
