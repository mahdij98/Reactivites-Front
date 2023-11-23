import { Grid } from "semantic-ui-react";
import { Activity } from "../../../app/models/activity";
import ActivtyList from "./ActivtyList";
import ActivityDetailes from "../detailes/ActivityDetailes";
import ActivityForm from "../form/ActivityForm";

interface Props {
  activities: Activity[];
  selectedActivity: Activity | undefined;
  selectActivity: (id: string) => void;
  handleDeleteActivity: (id: string) => void;
  handleEditOrAddActivitiy: (activity: Activity) => void;
  cancelSelectActivity: () => void;
  isSubmiting: boolean;
  isDeleting: boolean;
  editMode: boolean;
  openForm: (id: string) => void;
  closeForm: () => void;
}

const ActivityDashboard = ({
  activities,
  cancelSelectActivity,
  selectActivity,
  handleEditOrAddActivitiy,
  handleDeleteActivity,
  selectedActivity,
  isSubmiting,
  isDeleting,
  editMode,
  openForm,
  closeForm,
}: Props) => {
  return (
    <Grid>
      <Grid.Column width="10">
        <ActivtyList
          isDeleting={isDeleting}
          handleDeleteActivity={handleDeleteActivity}
          activities={activities}
          selectActivity={selectActivity}
        />
      </Grid.Column>
      <Grid.Column width="6">
        {selectedActivity && !editMode ? (
          <ActivityDetailes
            activity={selectedActivity}
            cancelSelectActivity={cancelSelectActivity}
            openForm={openForm}
          />
        ) : null}
        {editMode ? (
          <ActivityForm
            handleEditOrAddActivitiy={handleEditOrAddActivitiy}
            closeForm={closeForm}
            activity={selectedActivity}
            isSubmiting={isSubmiting}
          />
        ) : null}
      </Grid.Column>
    </Grid>
  );
};

export default ActivityDashboard;
