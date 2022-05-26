import "./App.css";

import { BrowserRouter, Route, Switch } from "react-router-dom";

import Login from "./Auth/Login";
import Location_Management from "./Pages/Location_Management";
import View_Location from "./Pages/View_Location";
import Edit_location from "./Pages/Edit_Location";

function App() {
  const token = localStorage.getItem("access_token");
  // const email = localStorage.getItem("email");

  if (!token) {
    return <Login />;
  }
  // else if (token) {
  //   return <Location_Management />;
  // }

  return (
    <div className="App">
      <Switch>
        <Route path="/" exact>
          <Login />
        </Route>
        <Route path="/location" exact>
          <Location_Management />
        </Route>
        <Route path="/location/view/:id" exact>
          <View_Location />
        </Route>
        <Route path="/location/edit/:id" exact>
          <Edit_location />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
