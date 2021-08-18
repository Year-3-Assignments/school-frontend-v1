import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import ExaminationPage from './pages/examination/teacher/view/examination_page';
import './App.css';

function PageRoutes() {
  return (
    <div>
      <div className="container">
        <Router>
          <section>
            <Switch>
              <Route path="/examination" component={ExaminationPage} />
            </Switch>
          </section>
        </Router>
      </div>
    </div>
  );
}

export default PageRoutes;
