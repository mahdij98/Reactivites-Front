import React, { useState, ChangeEvent } from "react";
import { Button, Form, Segment } from "semantic-ui-react";
import { Activity } from "../../../app/models/activity";
import { useStore } from "../../../stores/store";

interface Props {
  isSubmiting: boolean;
  handleEditOrAddActivitiy: (activity: Activity) => void;
}

const ActivityForm = ({ isSubmiting, handleEditOrAddActivitiy }: Props) => {
  const { activityStore } = useStore();
  const { selectedActivity, closeForm } = activityStore;
  const initialState: Activity = selectedActivity ?? {
    id: "",
    title: "",
    category: "",
    description: "",
    date: "",
    city: "",
    venue: "",
  };

  const [activity, setActivity] = useState(initialState);

  const handleSubmit = () => {
    handleEditOrAddActivitiy(activity);
  };

  const handleInputChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;
    setActivity({ ...activity, [name]: value });
  };
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
          loading={isSubmiting}
          floated="right"
          positive
          type="submit"
          content="Submit"
        />
        <Button
          onClick={closeForm}
          floated="right"
          type="button"
          content="Cancle"
        />
      </Form>
    </Segment>
  );
};

export default ActivityForm;
