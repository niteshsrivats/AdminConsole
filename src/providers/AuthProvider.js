// import React, { useEffect, useState } from "react";
// import firebase from "gatsby-plugin-firebase";
//
// export const AuthContext = React.createContext();
//
// export const AuthProvider = ({ children }) => {
//   const [currentUser, setCurrentUser] = useState(undefined);
//
//   useEffect(() => {
//     firebase.auth().onAuthStateChanged(setCurrentUser);
//   }, [currentUser]);
//
//   return (
//     <AuthContext.Provider value={{ currentUser }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };
