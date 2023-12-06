import { Grid } from "semantic-ui-react";
import { Activity } from "../../../app/models/activity";
import ActivtyList from "./ActivtyList";
import ActivityDetailes from "../detailes/ActivityDetailes";
import ActivityForm from "../form/ActivityForm";
import { useStore } from "../../../stores/store";
import { observer } from "mobx-react-lite";

interface Props {
  activities: Activity[];
  handleDeleteActivity: (id: string) => void;
  handleEditOrAddActivitiy: (activity: Activity) => void;
  isSubmiting: boolean;
  isDeleting: boolean;
}

const ActivityDashboard = ({
  activities,
  handleEditOrAddActivitiy,
  handleDeleteActivity,
  isSubmiting,
  isDeleting,
}: Props) => {
  const { activityStore } = useStore();
  const { selectActivity, selectedActivity, editMode } = activityStore;

  return (
    <Grid>
      <Grid.Column width="10">
        <ActivtyList
          isDeleting={isDeleting}
          handleDeleteActivity={handleDeleteActivity}
          activities={activities}
        />
      </Grid.Column>
      <Grid.Column width="6">
        {selectedActivity && !editMode ? <ActivityDetailes /> : null}
        {editMode ? (
          <ActivityForm
            handleEditOrAddActivitiy={handleEditOrAddActivitiy}
            isSubmiting={isSubmiting}
          />
        ) : null}
      </Grid.Column>
    </Grid>
  );
};

export default observer(ActivityDashboard);
