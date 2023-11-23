import { Button, Card, Icon, Image } from "semantic-ui-react";
import { Activity } from "../../../app/models/activity";

interface Props {
  activity: Activity;
  cancelSelectActivity: () => void;
  openForm: (id: string) => void;
}

const ActivityDetailes = ({
  activity,
  openForm,
  cancelSelectActivity,
}: Props) => {
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
            onClick={cancelSelectActivity}
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
