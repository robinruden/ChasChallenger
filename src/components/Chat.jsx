import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import "./Chat.css";
import TypingText from "./TypingText";
import { GameSettingsPopup } from "./GameSettingsPopup";
import { IoSend } from "react-icons/io5";
import { MdScheduleSend } from "react-icons/md";
import { IoMdSettings } from "react-icons/io";
import { useSelector } from "react-redux";
import { ChatHistory } from "./ChatHistory";

axios.defaults.withCredentials = true;

export function Chat() {
  const [query, setQuery] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);
  const [history, setHistory] = useState([]);
  const endOfMessagesRef = useRef(null);
  const [buttonPopup, setButtonPopup] = useState(false);
  const { id } = useSelector((state) => state.character);

  const handleInputChange = (e) => {
    setQuery(e.target.value);
  };

  const handleSend = async () => {
    if (!query.trim()) return;

    const newHistory = [...history, { query, response: "loading" }];
    setHistory(newHistory);
    setQuery("");
    setLoading(true);

    const message = {
      message: query,
      characterId: id,
    };
    console.log(message);
    try {
      const result = await axios.post(
        `https://chasfantasy.azurewebsites.net/api/chat/message` ,
       /*  `https://localhost:7110/api/chat/message/`, */
       /*  `52.149.227.5:8081/api/chat/message/`, */
       
        message
      );

      if (result.status === 200 && result.data) {
        setHistory((currentHistory) => [
          ...currentHistory.slice(0, -1),
          { query, response: result.data.message },
        ]);
      } else {
        setHistory((currentHistory) => [
          ...currentHistory.slice(0, -1),
          { query, response: "Failed to get response from the server." },
        ]);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      setHistory((currentHistory) => [
        ...currentHistory.slice(0, -1),
        {
          query,
          response:
            error.response?.data?.message ||
            "Failed to get response due to an error.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSend(e);
    }
  };

  useEffect(() => {
    if (endOfMessagesRef.current) {
      endOfMessagesRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [history]);
  /* const style = { background: '', fontSize: "1.4em" } */

  return (
    <>
      <ChatHistory />
      <section className="chat-container">
        <div className="chat-box">
          <section className="chat-history">
            {history.map((msg, index) => (
              <div key={index} className="chat-message">
                <div className="user-query bubble">{msg.query}</div>
                <div className="chat-response bubble">
                  {msg.response === "loading" ? (
                    <span className="loader"></span>
                  ) : (
                    <TypingText text={msg.response} />
                  )}
                </div>
              </div>
            ))}
            <div ref={endOfMessagesRef} />
          </section>
        </div>
       
        <form className="chat-input" onSubmit={handleSend}>
        
          <div className="input-container">
          <IoMdSettings
          title="Game Settings"
          className="game-settings-icon"
          onClick={() => setButtonPopup(true)}
        />
            <input
              type="text"
              className="inputruta"
              value={query}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
              placeholder="skriv nåt för fan..."
            />
            <button
              onClick={handleSend}
              disabled={!query.trim() || loading}
              className="sendButton"
            >
              {loading ? (
                <MdScheduleSend
                  onClick={handleSend}
                  disabled={!query.trim() || loading}
                  className="sendButton"
                  
                />
                
              ) : (
                <IoSend className="icon" />
              )}
            </button>
          </div>
        </form>
      </section>
      <GameSettingsPopup trigger={buttonPopup} setTrigger={setButtonPopup} />
    </>
  );
}