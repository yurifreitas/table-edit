import React from "react"
import Signup from "./Signup";
import Dashboard from "./Dashboard";
import Login from "./Login";
import ForgetPassword from "./ForgetPassword"
import UpdateProfile from "./UpdateProfile";
import {Container} from "react-bootstrap";
import {AuthProvider} from "../contexts/AuthContext";
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import PrivateRoute from "./PrivateRoute";
function App() {
  return (

      <Container className="d-flex align-items-center justify-content-center"
      style={{minHeight:"100vh"}}>
          <div className="w-100" style={{maxWidth:"100%"}}>

          <Router>
              <AuthProvider>
                  <Switch>
                      <PrivateRoute exact path="/" component={Dashboard}/>
                      <PrivateRoute path="/update-profile" component={UpdateProfile}/>
                      <Route path="/signup" component={Signup}/>
                      <Route path="/login" component={Login}/>
                      <Route path="/forget-password" component={ForgetPassword}/>
                  </Switch>
              </AuthProvider>
          </Router>
          </div>
      </Container>

  )
}

export default App;
