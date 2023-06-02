// App.js
import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import CompanyList from './components/CompanyList';
import CompanyDetail from './components/CompanyDetail';
import UserList from './components/UserList';
import UserForm from './components/UserForm';
import UserMigrationForm from './components/UserMigrationForm';
import './App.css';

function App() {
  return (
    <Router>
      <div className="app-container">
        <h1>Company and User Management</h1>
        <Switch>
          <Route exact path="/" component={CompanyList} />
          <Route exact path="/companies/:id" component={CompanyDetail} />
          <Route exact path="/companies/:id/users" component={UserList} />
          <Route exact path="/companies/:id/users/create" component={UserForm} />
          <Route exact path="/companies/:id/users/migrate" component={UserMigrationForm} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
