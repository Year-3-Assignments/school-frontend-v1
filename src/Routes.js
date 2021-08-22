import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
//import ExaminationPage from "./pages/examination/teacher/examination_page";
import "./App.css";
import Student from "./pages/student/add/student";
import StudentView from "./pages/student/view/student_view";

function PageRoutes() {
  return (
    <div className="custom">
      <div className="container">
        <Router>
          <section>
            <Switch>
              <Route path="/student" component={Student} exact />
              <Route path="/student/view" component={StudentView} exact />
            </Switch>
          </section>
        </Router>
      </div>
    </div>
  );
}

export default PageRoutes;
