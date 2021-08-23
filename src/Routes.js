import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import ExaminationPage from './pages/examination/teacher/view/examination_page';
import Sport from './pages/sport/viewSport';
import './App.css';
import Examination from './pages/examination/teacher/view/examination';

function PageRoutes() {
  return (
    <div>
      <div className="container">
        <Router>
          <section>
            <Switch>
              <Route path="/sport" component={Sport} />
              <Route path="/examination/:id" component={Examination} />
              <Route path="/examination" component={ExaminationPage} />
            </Switch>
          </section>
        </Router>
      </div>
    </div>
  );
}

export default PageRoutes;
