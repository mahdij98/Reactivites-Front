import { Grid } from "semantic-ui-react";
import ActivtyList from "./ActivtyList";
import ActivityDetailes from "../detailes/ActivityDetailes";
import ActivityForm from "../form/ActivityForm";
import { useStore } from "../../../stores/store";
import { observer } from "mobx-react-lite";

const ActivityDashboard = () => {
  const { activityStore } = useStore();
  const { selectedActivity, editMode } = activityStore;

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
