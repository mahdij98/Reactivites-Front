import "semantic-ui-css/semantic.min.css";
import { Container } from "semantic-ui-react";
import NavBar from "./NavBar";
import ActivityDashboard from "../../features/activities/dashboard/ActivityDashboard";

import LoadingComponent from "./LoadingComponent";
import { useStore } from "../../stores/store";
import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import HomePgae from "../../features/activities/Home/HomePgae";
import ActivityForm from "../../features/activities/form/ActivityForm";

const App = () => {
  return (
    <>
      <NavBar />
      <Container style={{ marginTop: "7em" }}>
        <Routes>
          <Route path="/" Component={HomePgae} />
          <Route path="/activites" Component={ActivityDashboard} />
          <Route path="/creatActivity" Component={ActivityForm} />
        </Routes>
      </Container>
    </>
  );
};

export default observer(App);
