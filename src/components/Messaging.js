import React, { useEffect } from "react";
import { getFcmToken } from "../firebase";
function Messaging({ setFcmToken }) {
  useEffect(() => {
    async function getUserToken() {
      const token = await getFcmToken();
      if (token) {
        console.log("Token is ", token);
        setFcmToken(token);
      }
    }
    getUserToken();
  });
  return <></>;
}

export default Messaging;
