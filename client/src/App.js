import React, { useState, useEffect } from "react";
import socketIOClient from "socket.io-client";
import './App.css';
const ENDPOINT = "http://localhost:9000";

function App() {
  const [response, setResponse] = useState("");

  useEffect(() => {
    const socket = socketIOClient(ENDPOINT);
    socket.on("FromAPI", data => {
      console.log(data)
      setResponse(data);
    });
  }, []);

  return (
      <p>
        It's <time dateTime={response}>{response}</time>
      </p>
  );
}

export default App;
