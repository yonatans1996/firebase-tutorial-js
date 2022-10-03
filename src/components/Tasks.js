import axios from "axios";
import { API_URL } from "../consts";
import "./Tasks.css";

const handleX = (id) => {
  axios.post(API_URL, {
    id,
    status: "delete",
  });
};

const handleV = (id, fcmToken) => {
  console.log(fcmToken);
  axios.post(API_URL, {
    id,
    status: "done",
    fcmToken: fcmToken,
  });
};

export default function Tasks(props) {
  return (
    <div>
      {props.tasks.map((task) => (
        <div className="task" key={task.id}>
          <h2 className={task.status}>{task.task}</h2>
          <h2 className="x" onClick={() => handleX(task.id)}>
            ✕
          </h2>
          <h2 className="v" onClick={() => handleV(task.id, task.fcmToken)}>
            ✓
          </h2>
        </div>
      ))}
    </div>
  );
}
