import React from 'react';
import './App.scss';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import StudentView from './pages/student/view/student_view';
import ExaminationPage from './pages/examination/teacher/view/examination_page';
import Examination from './pages/examination/teacher/view/examination';
import NavigationBar from './components/navigation_bar';
import LoginPage from './pages/login/login_page';
import EmployeePage from './pages/employee/view/employee_view';

function PageRoutes() {
  return (
    <div>
      <Router>
        <NavigationBar />
        <div className="pages">
          <section>
            <Switch>
              <Route path="/student/view" component={StudentView} exact />
              <Route path="/examination/:id" component={Examination} />
              <Route path="/examination" component={ExaminationPage} />
              <Route path="/login" component={LoginPage} exact />
              <Route path="/employee" component={EmployeePage} />
            </Switch>
          </section>
        </div>
      </Router>
    </div>
  );
}

export default PageRoutes;
