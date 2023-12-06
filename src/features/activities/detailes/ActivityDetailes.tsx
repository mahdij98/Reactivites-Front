import { Button, Card, Icon, Image } from "semantic-ui-react";
import { useStore } from "../../../stores/store";

const ActivityDetailes = () => {
  const { activityStore } = useStore();
  const {
    selectedActivity: activity,
    openForm,
    cancleSelectedActivity,
  } = activityStore;

  if (!activity) return;
  return (
    <Card fluid>
      <Image
        src={`/assets/categoryImages/${activity.category}.jpg`}
        wropped
        ui={false}
      />
      <Card.Content>
        <Card.Header>{activity.title}</Card.Header>
        <Card.Meta>
          <span>{activity.date}</span>
        </Card.Meta>
        <Card.Description>{activity.description}</Card.Description>
      </Card.Content>
      <Card.Content extra>
        <Button.Group widths="2">
          <Button
            basic
            color="blue"
            content="Edit"
            onClick={() => {
              openForm(activity.id);
            }}
          />
          <Button
            onClick={cancleSelectedActivity}
            basic
            color="grey"
            content="Cancle"
          />
        </Button.Group>
      </Card.Content>
    </Card>
  );
};

export default ActivityDetailes;
