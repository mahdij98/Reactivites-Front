import { useState } from "react";
import { Activity } from "../../../app/models/activity";
import { Button, Item, Label, Segment } from "semantic-ui-react";

interface Props {
  activities: Activity[];
  selectActivity: (id: string) => void;
  handleDeleteActivity: (id: string) => void;
  isDeleting: boolean;
}

const ActivtyList = ({
  activities,
  selectActivity,
  handleDeleteActivity,
  isDeleting,
}: Props) => {
  const [target, setTarget] = useState("");
  return (
    <Segment>
      <Item.Group>
        {activities?.map((activity) => (
          <Item key={activity.id}>
            <Item.Content>
              <Item.Header as="a">{activity.title}</Item.Header>
              <Item.Meta>{activity.date}</Item.Meta>
              <Item.Description>
                <div>{activity.description}</div>
                <div>
                  {activity.city}, {activity.venue}
                </div>
              </Item.Description>
              <Item.Extra>
                <Button
                  onClick={() => {
                    selectActivity(activity.id);
                  }}
                  floated="right"
                  content="view"
                  color="blue"
                />
                <Button
                  name={activity.id}
                  onClick={(
                    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
                  ) => {
                    handleDeleteActivity(activity.id);
                    setTarget(e.currentTarget.name);
                  }}
                  floated="right"
                  content="Delete"
                  color="red"
                  loading={target === activity.id ? isDeleting : false}
                />
                <Label basic content={activity.category} />
              </Item.Extra>
            </Item.Content>
          </Item>
        ))}
      </Item.Group>
    </Segment>
  );
};

export default ActivtyList;
