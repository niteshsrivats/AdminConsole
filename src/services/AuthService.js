import firebase from "gatsby-plugin-firebase";

class AuthService {
  signup = (email, password) => {
    return firebase.auth().createUserWithEmailAndPassword(email, password)
      .then(() => true)
      .catch(() => false);
  };

  logout = () => {
    return firebase.auth().signOut()
      .then(() => true)
      .catch(() => false);
  };

  resetPassword = (email) => {
    return firebase.auth().sendPasswordResetEmail(email)
      .then(() => true)
      .catch(() => false);
  };

}

export default AuthService;
