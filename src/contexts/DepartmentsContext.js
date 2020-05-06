import React, { Component } from 'react';
import firebase from 'gatsby-plugin-firebase';

const DepartmentsContext = React.createContext();

class DepartmentsProvider extends Component {
  state = { departments: [] };
  ttl = 30 * 24 * 60 * 60 * 1000; // 1 Month

  getDepartmentFromObject(object) {
    if (!!object) {
      const { departments, expiry } = object;
      if (expiry > new Date().getTime()) {
        return departments;
      }
      localStorage.removeItem('departments');
    }
    return null;
  }

  async componentDidMount() {
    const departments = this.getDepartmentFromObject(
      JSON.parse(localStorage.getItem('departments'))
    );

    if (!!!departments) {
      await firebase
        .firestore()
        .collection('departments')
        .doc('departments')
        .get()
        .then(doc => {
          localStorage.setItem(
            'departments',
            JSON.stringify({
              departments: doc.data()['codes'],
              expiry: new Date().getTime() + this.ttl,
            })
          );
          this.setState({ departments: doc.data()['codes'] });
        })
        .catch(error => console.log(error));
    } else {
      this.setState(departments);
    }
  }

  render() {
    return (
      <DepartmentsContext.Provider value={this.state}>
        {this.props.children}
      </DepartmentsContext.Provider>
    );
  }
}

export { DepartmentsProvider };
export default DepartmentsContext;
