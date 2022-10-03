import axios from "axios";
import { useRef } from "react";
import { API_URL } from "../consts";
export default function InputTask({ fcmToken }) {
  const inputRef = useRef();

  const handleSubmit = async (e) => {
    e.target.disabled = true;
    try {
      await axios
        .post(API_URL, {
          status: "new",
          task: inputRef.current.value,
          fcmToken,
        })
        .then((res) => console.log(res))
        .catch((e) => console.log(e));
    } catch (e) {
      console.log(e);
    } finally {
      inputRef.current.value = "";
      e.target.disabled = false;
    }
  };

  return (
    <div>
      <input ref={inputRef} />
      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
}
