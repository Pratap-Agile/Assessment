import "./App.css";

import { Route, Switch } from "react-router-dom";

import Login from "./Auth/Login";
import LocationManagement from "./Pages/LocationMange/LocationManagement";
import View_Location from "./Pages/ViewLocation/ViewLocation";
import EditLocation from "./Pages/EditLocation/EditLocation";
import AddLocation from "./Pages/AddLocation/AddLocation";
import AddEvent from "./Pages/ViewLocation/Event/AddEvent/AddEvent";

function App() {
  // const token = localStorage.getItem("access_token");

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
          <LocationManagement />
        </Route>
        <Route path="/location/view/:id" exact>
          <View_Location />
        </Route>
        <Route path="/location/edit/:id" exact>
          <EditLocation />
        </Route>
        <Route path="/location/add" exact>
          <AddLocation />
        </Route>
        <Route path="/location/add-event/:id" exact>
          <AddEvent />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
