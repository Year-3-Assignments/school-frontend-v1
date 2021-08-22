import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import employeePage from './pages/employee/view/employee_view';
import create_new_employee from './pages/employee/add/create_new_employee';

function PageRoutes() {
  return (
    <div className="container">
      <Router>
        <section>
          <Switch>
           <Route path="/employee/new" component={create_new_employee} />
           <Route path="/employee" component={employeePage} />
          </Switch>
        </section>
      </Router>
    </div>
  );
}

export default PageRoutes;