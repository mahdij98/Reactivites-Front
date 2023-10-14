import { useEffect, useState } from "react";
import "semantic-ui-css/semantic.min.css";
import "./App.css";
import axios from "axios";
import { List, Header } from "semantic-ui-react";

function App() {
  const [activities, setActivities] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/api/activities").then((response) => {
      setActivities(response.data);
      console.log(response.data);
    });
  }, []);

  return (
    <>
      <div>
        <Header as="h2" icon="users" content="Reactivites" />
        <List>
          {activities.map((activity: any) => (
            <List.Item key={activity.id}>{activity.title}</List.Item>
          ))}
        </List>
      </div>
    </>
  );
}

export default App;
