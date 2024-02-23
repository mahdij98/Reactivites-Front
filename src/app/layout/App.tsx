import "semantic-ui-css/semantic.min.css";
import { Container } from "semantic-ui-react";
import NavBar from "./NavBar";
import ActivityDashboard from "../../features/activities/dashboard/ActivityDashboard";
import { observer } from "mobx-react-lite";
import { Route, Routes } from "react-router-dom";
import HomePgae from "../../features/activities/Home/HomePgae";
import ActivityForm from "../../features/activities/form/ActivityForm";
import ActivityDetailes from "../../features/activities/detailes/ActivityDetailes";
import Layout from "./Layout";

const App = () => {
  return (
    <>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" Component={HomePgae} />
          <Route path="/activities" Component={ActivityDashboard} />
          <Route path="/activities/:id" Component={ActivityDetailes} />
          <Route
            path="/creatActivity"
            Component={() => <ActivityForm key="create" />}
          />
          <Route
            path="/manage/:id"
            Component={() => <ActivityForm key="update" />}
          />
        </Route>
      </Routes>
    </>
  );
};

export default observer(App);
