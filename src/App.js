import React, { Component } from 'react';
import { HashRouter, Route, Switch } from 'react-router-dom';
// import { renderRoutes } from 'react-router-config';
import './App.scss';

// Components
import Profile from "./components/Profile";
import PrivateRoute from "./components/PrivateRoute";
import ExternalApi from "./components/ExternalApi";

const loading = () => <div className="animated fadeIn pt-3 text-center">Loading...</div>;

// Containers
const DefaultLayout = React.lazy(() => import('./containers/DefaultLayout'));


// Pages
const Login = React.lazy(() => import('./views/Pages/Login'));
const Register = React.lazy(() => import('./views/Pages/Register'));
const Page404 = React.lazy(() => import('./views/Pages/Page404'));
const Page500 = React.lazy(() => import('./views/Pages/Page500'));
const Ticket = React.lazy(() => import('./views/Ticket/Ticket'));
const Event = React.lazy(() => import('./views/Pages/Event'));
const TicketConfirmation = React.lazy(() => import('./views/Pages/TicketConfirmation'));
const TicketError = React.lazy(() => import('./views/Pages/TicketError'));

class App extends Component {

  render() {
    return (
      <HashRouter>
          <React.Suspense fallback={loading()}>
            <Switch>
              <PrivateRoute path="/profile" component={Profile} />
              <PrivateRoute path="/external-api" component={ExternalApi} />
              <Route exact path="/login" name="Login Page" render={props => <Login {...props}/>} />
              <Route exact path="/register" name="Register Page" render={props => <Register {...props}/>} />
              <Route exact path="/ticket/:id" name="Ticket" render={props => <Ticket {...props}/>} />
              <Route exact path="/event/:id" name="Event" render={props => <Event {...props}/>} />
              <Route exact path="/event/:id/confirmation" name="Ticket Confirmation" render={props => <TicketConfirmation {...props}/>} />
              <Route exact path="/event/:id/error" name="Ticket Error" render={props => <TicketError {...props}/>} />
              <Route exact path="/404" name="Page 404" render={props => <Page404 {...props}/>} />
              <Route exact path="/500" name="Page 500" render={props => <Page500 {...props}/>} />
              <Route path="/" name="Home" render={props => <DefaultLayout {...props}/>} />
            </Switch>
          </React.Suspense>
      </HashRouter>
    );
  }
}

export default App;
