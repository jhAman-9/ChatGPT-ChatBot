// import { options2 } from "./utils/constants";

import { useEffect, useState } from "react";

const App = () => {
  const [message, setMessage] = useState(null);
  const [value, setValue] = useState(null);
  const [prevChat, setPrevChat] = useState([]);
  const [currTitle, setCurrTitle] = useState(null);

  const createNewChat = () => {
    setMessage(null);
    setValue("");
    setCurrTitle(null);
  };

  const handleClick = (uniqueTitles) => {
    setCurrTitle(uniqueTitles);
    setMessage(null);
    setValue("");
  };

  const getMessages = async () => {
    const options2 = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        messages: value,
      }),
    };

    try {
      const res = await fetch("http://localhost:8000/completions", options2);
      const data = await res.json();
      console.log(data);
      setMessage(data.choices);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    console.log(currTitle, value, message);
    if (!currTitle && value && message) {
      setCurrTitle(value);
    }
    if (currTitle && value && message) {
      setPrevChat((prevChat) => [
        ...prevChat,
        {
          title: currTitle,
          role: "user",
          content: value,
        },
        {
          title: currTitle,
          role: message.role,
          content: message.content,
        },
      ]);
    }
  }, [message, currTitle]);

  console.log(message);

  const currChat = prevChat.filter(
    (previousChat) => previousChat.tile === currTitle
  );
  // get Unique title with the help of set
  const uniqueTitles = Array.from(
    new Set(prevChat.map((previousChat) => previousChat.title))
  );

  return (
    <div className="App">
      <section className="side-bar">
        <button onClick={createNewChat}> + New chat</button>
        <ul className="history">
          {uniqueTitles?.map((uniqueTitle, index) => (
            <li key={index} onClick={() => handleClick(uniqueTitle)}></li>
          ))}
        </ul>
        <nav>
          <p> Mode with 🩷 Aman </p>
        </nav>
      </section>
      <section className="main">
        {!currTitle && <h1>AmanGPT</h1>}
        <ul className="feed">
          {currChat.map((chatMess, index) => 
            <li key={index}>
              <p className="role">{chatMess.role}</p>
              <p className="mess">{chatMess.content}</p>
            </li>
          )}
        </ul>
        <div className="bottom-section">
          <div className="input-container">
            <input value={value} onChange={(e) => setValue(e.target.value)} />
            <div id="submit" onClick={getMessages}>
              ⬆️
            </div>
          </div>
          <p className="info">
            It is a long established fact that a reader will be distracted by
            the readable content of a page when looking at its layout. The point
            of using Lorem Ipsum is that it has a more-or-less normal
            distribution of letters, as opposed to using 'Content here, content
            here', making it look like readable English. Many desktop publishing
            packages and web page editors now use Lorem Ipsum as their default
            model text, and a search for 'lorem ipsum' will uncover many web
            sites still in their infancy. Various versions have evolved over the
            years, sometimes by accident, sometimes on purpose injected humour
            and the like.
          </p>
        </div>
      </section>
    </div>
  );
};

export default App;
