import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import "./App.css";

import { AppContextProvider } from "./Context/globalContext";

import { setAuthToken } from "./Config/api";

import HomePage from "./Pages/HomePage/HomePage";
import SubscribePage from "./Pages/SubscribePage/SubscribePage";
import ProfilePage from "./Pages/ProfilePage/ProfilePage";
import PrivateRoute from "./Components/PrivateRoute";
import PrivateRouteAdmin from "./Components/PrivateRouteAdmin";
import TransactionPage from "./Pages/TransactionPage/TransactionPage";
import AddBook from "./Pages/AddBook/AddBook";
import DetailBook from "./Pages/DetailBook/DetailBook";
import ReadBook from "./Pages/ReadBook/ReadBook";
import LandingPage from "./Pages/LandingPage/LandingPage";

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

function App() {
  return (
    <AppContextProvider>
      <Router>
        <div>
          <Switch>
            <Route path="/" exact>
              <LandingPage />
            </Route>
            <PrivateRoute path="/home" exact component={HomePage} />
            <PrivateRoute path="/subscribe" exact component={SubscribePage} />
            <PrivateRoute path="/profile" exact component={ProfilePage} />
            <PrivateRoute path="/book/:id" exact component={DetailBook} />
            <PrivateRoute path="/read/:rid" exact component={ReadBook} />
            <PrivateRouteAdmin
              path="/transaction"
              exact
              component={TransactionPage}
            />
            <PrivateRouteAdmin path="/addbook" exact component={AddBook} />
          </Switch>
        </div>
      </Router>
    </AppContextProvider>
  );
}

export default App;
