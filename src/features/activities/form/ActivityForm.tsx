import { useState, ChangeEvent, useEffect } from "react";
import { Button, Form, Segment } from "semantic-ui-react";
import { Activity } from "../../../app/models/activity";
import { useStore } from "../../../stores/store";
import { observer } from "mobx-react-lite";
import { useParams } from "react-router";
import LoadingComponent from "../../../app/layout/LoadingComponent";

const ActivityForm = () => {
  const { activityStore } = useStore();
  const {
    creatActivity,
    updateActivity,
    loading,
    loadActivity,
    loadingInitial,
  } = activityStore;

  const { id } = useParams<{ id: string }>();

  const [activity, setActivity] = useState({
    id: "",
    title: "",
    category: "",
    description: "",
    date: "",
    city: "",
    venue: "",
  });

  useEffect(() => {
    if (id) loadActivity(id).then((activity) => setActivity(activity!));
  }, [id, loadActivity]);

  const handleSubmit = () => {
    activity.id ? updateActivity(activity) : creatActivity(activity);
  };

  const handleInputChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;
    setActivity({ ...activity, [name]: value });
  };

  if (loadingInitial) return <LoadingComponent content="Loading Activity..." />;

  return (
    <Segment clearing>
      <Form onSubmit={handleSubmit}>
        <Form.Input
          value={activity.title}
          onChange={handleInputChange}
          placeholder="Titles"
          name="title"
        />
        <Form.TextArea
          value={activity.description}
          onChange={handleInputChange}
          placeholder="Description"
          name="description"
        />
        <Form.Input
          value={activity.category}
          onChange={handleInputChange}
          placeholder="Category"
          name="category"
        />
        <Form.Input
          value={activity.date.split("T")[0]}
          onChange={handleInputChange}
          placeholder="Date"
          name="date"
          type="date"
        />
        <Form.Input
          value={activity.city}
          onChange={handleInputChange}
          placeholder="City"
          name="city"
        />
        <Form.Input
          value={activity.venue}
          onChange={handleInputChange}
          placeholder="Venue"
          name="venue"
        />
        <Button
          loading={loading}
          floated="right"
          positive
          type="submit"
          content="Submit"
        />
        <Button floated="right" type="button" content="Cancle" />
      </Form>
    </Segment>
  );
};

export default observer(ActivityForm);
