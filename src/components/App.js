import React from "react"
import Signup from "./Signup";
import Login from "./Login";
import ForgetPassword from "./ForgetPassword"
import UpdateProfile from "./UpdateProfile";
import Profile from "./Profile";
import Tables from "./Tables";
import {AuthProvider} from "../contexts/AuthContext";
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import PrivateRoute from "./PrivateRoute";
function App() {
  return (


          <div className="w-100" style={{maxWidth:"100%"}}>

          <Router>
              <AuthProvider>
                  <Switch>
                      <PrivateRoute exact path="/" component={Tables}/>
                      <PrivateRoute exact path="/profile" component={Profile}/>
                      <PrivateRoute path="/update-profile" component={UpdateProfile}/>
                      <Route path="/signup" component={Signup}/>
                      <Route path="/login" component={Login}/>
                      <Route path="/forget-password" component={ForgetPassword}/>
                  </Switch>
              </AuthProvider>
          </Router>
          </div>

  )
}

export default App;
