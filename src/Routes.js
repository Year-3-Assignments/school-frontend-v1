import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import employeePage from './pages/employee/view/employee_view';
import create_new_employee from './pages/employee/add/create_new_employee';
import ExaminationPage from './pages/examination/teacher/view/examination_page';
import Examination from './pages/examination/teacher/view/examination';
import 'App.css';

function PageRoutes() {
  return (
    <div className="container">
      <Router>
        <section>
          <Switch>
           <Route path="/employee/new" component={create_new_employee} />
           <Route path="/employee" component={employeePage} />
           <Route path="/examination/:id" component={Examination} />
           <Route path="/examination" component={ExaminationPage} />
          </Switch>
        </section>
      </Router>
    </div>
  );
}

export default PageRoutes;