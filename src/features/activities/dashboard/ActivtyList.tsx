import { Fragment, useState } from "react";
import { Button, Item, Label, Segment, Header } from "semantic-ui-react";
import { useStore } from "../../../stores/store";
import { observer } from "mobx-react-lite";
import { Link } from "react-router-dom";
import ActitivityListItem from "./ActitivityListItem";

const ActivtyList = () => {
  const { activityStore } = useStore();
  const { groupedActivities } = activityStore;

  return (
    <>
      {groupedActivities.map(([group, activities]) => (
        <Fragment key={group}>
          <Header sub color="teal">
            {group}
          </Header>
          <Segment>
            <Item.Group>
              {activities?.map((activity, index) => (
                <ActitivityListItem key={index} activity={activity} />
              ))}
            </Item.Group>
          </Segment>
        </Fragment>
      ))}
    </>
  );
};

export default observer(ActivtyList);
