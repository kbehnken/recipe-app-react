import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Routes from './Routes';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './Styles/main.css';

function App() {
  return (
      <div>
         <ToastContainer />
         <Router>
            {Routes}
         </Router>
      </div>
  );
}

export default App;