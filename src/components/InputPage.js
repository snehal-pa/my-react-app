import React, { useState } from "react";

export default function InputPage() {
  const [inputData, setInputData] = useState({
    email: "",
    username: "",
    age: "",
  });

  function inputChange(e) {
    console.log(e.target.value);
    let clone = { ...inputData };

    clone[e.target.name] = e.target.value;
    console.log(clone);
    setInputData(clone);
  }

  function resetInput() {
    setInputData({
      email: "",
      username: "",
      age: "",
    });
  }

  console.log(inputData);

  return (
    <div>
      <h1>Input Page</h1>
      <h1>{inputData.email + " " + inputData.username}</h1>
      <input
        name="email"
        value={inputData.email}
        onChange={(e) => inputChange(e)}
      />
      <input
        name="username"
        value={inputData.username}
        onChange={(e) => inputChange(e)}
      />
      <input
        name="age"
        value={inputData.age}
        onChange={(e) => inputChange(e)}
      />
      <button onClick={resetInput}>Reset</button>
    </div>
  );
}
