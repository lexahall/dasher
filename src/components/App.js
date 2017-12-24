import React from 'react';
import { Switch, Route, BrowserRouter as Router} from 'react-router-dom'
import PrivateRoute from './PrivateRoute';
import HomePage from './HomePage';
import SignInPage from './SignInPage';
import BoardPage from './BoardPage';
import NotFoundPage from './NotFoundPage';
import Apollo from './Apollo';

function App() {
  return (
    <Apollo>
      <Router>
        <Switch>
            <PrivateRoute exact path='/' component={HomePage}/>
            <Route exact path='/signin' component={SignInPage}/>
            <Route path='/board/:id' component={BoardPage}/>
            <Route component={NotFoundPage} />
          </Switch>
      </Router>
    </Apollo>
  )
}
export default App;
