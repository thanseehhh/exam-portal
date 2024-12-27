import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import LoginPage from './components/LoginPage';
import RegisterPage from './components/registerpage';
import AdminDashboard from './components/admindashboard';
import StudentDashboard from './components/Student Dashboard';
import ExamPage from './components/exampage';

function App() {
  return (
    <Router>
      <Switch>
       
        <Route path="/login" component={LoginPage} />
        <Route path="/register" component={RegisterPage} /> {/* Add route for RegisterPage */}
        <Route path="/admindashboard" component={AdminDashboard} />
        <Route path="/studentdashboard" component={StudentDashboard} />
        <Route path="/exampage" component={ExamPage} />
      </Switch>
    </Router>
  );
}

export default App;
