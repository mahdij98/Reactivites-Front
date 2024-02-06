import React, { useState } from "react";
import { Button, Item, Label } from "semantic-ui-react";
import { Activity } from "../../../app/models/activity";
import { Link } from "react-router-dom";
import { useStore } from "../../../stores/store";

interface ActivityListItemProps {
  activity: Activity;
}

const ActitivityListItem = ({ activity }: ActivityListItemProps) => {
  const [target, setTarget] = useState("");

  const { activityStore } = useStore();
  const { deleteActivity, loading } = activityStore;

  return (
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
            as={Link}
            to={`/activities/${activity.id}`}
            floated="right"
            content="view"
            color="blue"
          />
          <Button
            name={activity.id}
            onClick={(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
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
  );
};

export default ActitivityListItem;
