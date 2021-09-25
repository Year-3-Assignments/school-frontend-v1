import React from 'react';
import './App.scss';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import StudentView from './pages/student/view/student_view';
import ExaminationPage from './pages/examination/view/examination_page';
import Sport from './pages/sport/viewSport';
import SportInventory from './pages/sportsInventory/viewSportInventory';
import './App.scss';
import Examination from './pages/examination/view/examination';
import NavigationBar from './components/navigation_bar';
import LoginPage from './pages/login/login_page';
import EmployeePage from './pages/employee/view/employee_view';
import LandingPage from './pages/landing/landing_page';

function PageRoutes() {
  return (
    <div>
      <Router>
        <NavigationBar />
        <div className="pages">
          <section>
            <Switch>
              <Route path="/sportinventory" component={SportInventory} />
              <Route path="/sport" component={Sport} />
              <Route path="/student/view" component={StudentView} exact />
              <Route path="/examination/:id" component={Examination} />
              <Route path="/examination" component={ExaminationPage} />
              <Route path="/login" component={LoginPage} exact />
              <Route path="/employee" component={EmployeePage} />
              <Route path="/" component={LandingPage} />
            </Switch>
          </section>
        </div>
      </Router>
    </div>
  );
}

export default PageRoutes;
