import { useState } from "react";
import { Button, Item, Label, Segment } from "semantic-ui-react";
import { useStore } from "../../../stores/store";
import { observer } from "mobx-react-lite";

const ActivtyList = () => {
  const [target, setTarget] = useState("");

  const { activityStore } = useStore();
  const { selectActivity, deleteActivity, loading, activityByDate } =
    activityStore;

  return (
    <Segment>
      <Item.Group>
        {activityByDate?.map((activity, index) => (
          <Item key={index}>
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
                    deleteActivity(activity.id);
                    setTarget(e.currentTarget.name);
                  }}
                  floated="right"
                  content="Delete"
                  color="red"
                  loading={target === activity.id ? loading : false}
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

export default observer(ActivtyList);
