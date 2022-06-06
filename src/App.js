import "./App.css";

import { Route, Switch } from "react-router-dom";

import Login from "./Auth/Login";
import Location_Management from "./Pages/Location_Mange/Location_Management";
import View_Location from "./Pages/View_Location/View_Location";
import Edit_location from "./Pages/Edit_Location/Edit_Location";
import Add_Location from "./Pages/Add_Location/Add_Location";

function App() {
  const token = localStorage.getItem("access_token");

  return (
    <div className="App">
      <Switch>
        <Route path="/" exact>
          <Login />
        </Route>
        <Route path="/login" exact>
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
        <Route path="/location/add" exact>
          <Add_Location />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
