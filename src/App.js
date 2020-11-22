import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Routes from './Routes';
import { NotificationContainer } from 'react-notifications';

function App() {
  return (
      <div>
         <NotificationContainer />
         <Router>
            {Routes}
         </Router>
      </div>
  );
}

export default App;