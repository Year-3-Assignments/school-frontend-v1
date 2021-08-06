import React from 'react';
import { BrowserRouter as Router, Switch } from 'react-router-dom';

function PageRoutes() {
  return (
    <div>
      <Router>
        <section>
          <Switch>{/* All page routes here */}</Switch>
        </section>
      </Router>
    </div>
  );
}

export default PageRoutes;
