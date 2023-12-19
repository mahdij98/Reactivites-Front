import { Grid } from "semantic-ui-react";
import ActivtyList from "./ActivtyList";
import ActivityDetailes from "../detailes/ActivityDetailes";
import ActivityForm from "../form/ActivityForm";
import { useStore } from "../../../stores/store";
import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import LoadingComponent from "../../../app/layout/LoadingComponent";

const ActivityDashboard = () => {
  const { activityStore } = useStore();
  const { selectedActivity, editMode } = activityStore;

  useEffect(() => {
    activityStore.loadActivities();
  }, [activityStore]);

  if (activityStore.loadingInitial)
    return <LoadingComponent content="Loading app" />;

  return (
    <Grid>
      <Grid.Column width="10">
        <ActivtyList />
      </Grid.Column>
      <Grid.Column width="6">
        {selectedActivity && !editMode ? <ActivityDetailes /> : null}
        {editMode ? <ActivityForm /> : null}
      </Grid.Column>
    </Grid>
  );
};

export default observer(ActivityDashboard);
