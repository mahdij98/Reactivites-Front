import { useEffect, useState } from "react";
import "semantic-ui-css/semantic.min.css";
import { Container } from "semantic-ui-react";
import { Activity } from "../models/activity";
import NavBar from "./NavBar";
import ActivityDashboard from "../../features/activities/dashboard/ActivityDashboard";
import agent from "../api/agent";
import LoadingComponent from "./LoadingComponent";
import uuid from "react-uuid";

function App() {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [selectedActivities, setSelectedActivities] = useState<
    Activity | undefined
  >();
  const [eidteMode, setEidteMode] = useState(false);
  const [loading, setLoading] = useState(true);
  const [submiting, setSubmiting] = useState(false);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    agent.Activities.list().then((response) => {
      setActivities(response);
      setLoading(false);
    });
  }, []);

  const handleEditOrAddActivitiy = (activity: Activity) => {
    setSubmiting(true);
    if (activity.id) {
      agent.Activities.update(activity).then(() => {
        setActivities((pre) => [
          ...pre.filter((x) => x.id !== activity.id),
          activity,
        ]);
        setSelectedActivities(activity);
        setEidteMode(false);
        setSubmiting(false);
      });
    } else {
      activity.id = uuid();
      agent.Activities.create(activity).then(() => {
        setActivities((pre) => [
          ...pre.filter((x) => x.id !== activity.id),
          activity,
        ]);
        setSelectedActivities(activity);
        setEidteMode(false);
        setSubmiting(false);
      });
    }
  };

  const handleDeleteActivity = (id: string) => {
    setDeleting(true);
    agent.Activities.delete(id).then(() => {
      setActivities((pre) => [...pre.filter((x) => x.id !== id)]);
      setEidteMode(false);
      setDeleting(false);
    });
  };

  const handleSelectedActivity = (id?: string) => {
    setSelectedActivities(activities.find((a) => a.id === id));
  };

  const handleCancleSelectedActivity = () => {
    setSelectedActivities(undefined);
  };

  const handleFormOpen = (id?: string) => {
    id ? handleSelectedActivity(id) : handleCancleSelectedActivity();
    setEidteMode(true);
  };
  const handleFormClose = () => {
    setEidteMode(false);
  };

  if (loading) return <LoadingComponent content="Loading app" />;

  return (
    <>
      <NavBar openForm={handleFormOpen} />
      <Container style={{ marginTop: "7em" }}>
        <ActivityDashboard
          activities={activities ?? []}
          selectActivity={handleSelectedActivity}
          selectedActivity={selectedActivities}
          cancelSelectActivity={handleCancleSelectedActivity}
          handleDeleteActivity={handleDeleteActivity}
          editMode={eidteMode}
          openForm={handleFormOpen}
          closeForm={handleFormClose}
          handleEditOrAddActivitiy={handleEditOrAddActivitiy}
          isSubmiting={submiting}
          isDeleting={deleting}
        />
      </Container>
    </>
  );
}

export default App;