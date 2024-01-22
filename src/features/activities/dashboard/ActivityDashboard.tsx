import { Grid } from "semantic-ui-react";
import ActivtyList from "./ActivtyList";
import { useStore } from "../../../stores/store";
import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import LoadingComponent from "../../../app/layout/LoadingComponent";

const ActivityDashboard = () => {
  const { activityStore } = useStore();
  const { loadActivities, loadingInitial, activityRegistry } = activityStore;

  useEffect(() => {
    if (activityRegistry.size <= 1) loadActivities();
  }, [activityRegistry.size, loadActivities]);

  if (loadingInitial) return <LoadingComponent content="Loading app" />;

  return (
    <Grid>
      <Grid.Column width="10">
        <ActivtyList />
      </Grid.Column>
      <Grid.Column width="6">
        <h2>Activity filters</h2>
      </Grid.Column>
    </Grid>
  );
};

export default observer(ActivityDashboard);
