import React, { useState, useEffect } from "react";
import "./Home.css";
import events from "../assets/events.json";

function Home() {
  const [year, setYear] = useState(1963);
  const [score, setScore] = useState(0);
  const [life, setLife] = useState(100);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [highestScore, setHighestScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [popupVisible, setPopupVisible] = useState(false);

  useEffect(() => {
    random();
  }, []);

  function random() {
    const randomIndex = Math.floor(Math.random() * events.length);
    const initialEvent = events[randomIndex];
    setSelectedEvent(initialEvent);
  }

  function formHandler(event) {
    event.preventDefault();
    if (selectedEvent && selectedEvent.year === year) {
      setScore(score + 1);
    } else if (selectedEvent) {
      const lifeDiff = Math.abs(selectedEvent.year - year);
      setLife(life - lifeDiff);
    }
    random();
  }

  useEffect(() => {
    if (life <= 0) {
      if (score > highestScore) {
        setHighestScore(score);
      }
      setGameOver(true);
      setTimeout(() => {
        setScore(0);
        setLife(100);
      }, 1000);
    }
  }, [life]);

  function closeModal() {
    setGameOver(false);
  }

  function showPopup() {
    setPopupVisible(true);
  }

  function hidePopup() {
    setPopupVisible(false);
    formHandler(event);
  }

  return (
    <div className="center-container">
      {!gameOver && selectedEvent && (
        <div className="selected-event">
          <div className="boxes-container">
            <div className="box">
              <p>score: {score}</p>
            </div>
            <div className="box">
              <p>lives: {life}</p>
            </div>
          </div>
          <img
            src={selectedEvent.link}
            alt="event-image"
            className="event-image"
          />
          <h3 className="event-text">{selectedEvent.event}</h3>
          <script
            async
            src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-5153251866096968"
            crossOrigin="anonymous"
          ></script>
          <ins
            className="adsbygoogle"
            style={{ display: "block" }}
            data-ad-client="ca-pub-5153251866096968"
            data-ad-slot="7419026991"
            data-ad-format="auto"
            data-full-width-responsive="true"
          ></ins>
          <script>(adsbygoogle = window.adsbygoogle || []).push({});</script>
        </div>
      )}
      {!gameOver && (
        <form className="form-container">
          <div className="center">
            <div className="answer-boxes">
              <div className="guess-box">
                <h4>Guess</h4>
                <hr width="100%" />
                <h3>{year}</h3>
              </div>
              {popupVisible && (
                <div className="guess-box green">
                  <h4>Answer</h4>
                  <hr width="100%" />
                  <h3>{selectedEvent.year}</h3>
                </div>
              )}
              {popupVisible && (
                <div className="guess-box red">
                  <h4>Diff.</h4>
                  <hr width="100%" />
                  <h3>{Math.abs(selectedEvent.year - year)}</h3>
                </div>
              )}
            </div>
            {!popupVisible && (
              <div className="min-max">
                <p>1900</p>
                <p>2022</p>
              </div>
            )}
            {!popupVisible && (
              <input
                type="range"
                name="year"
                id="yearselector"
                value={year}
                onChange={(event) => {
                  setYear(parseInt(event.target.value));
                }}
                min="1900"
                max="2022"
                className="range"
              />
            )}
          </div>
          {!popupVisible && (
            <input
              type="submit"
              value="CONFIRM"
              className="submit-button"
              onClick={showPopup}
            />
          )}
          {popupVisible && (
            <input
              type="submit"
              value="NEXT"
              className="submit-button"
              onClick={hidePopup}
            />
          )}
        </form>
      )}
      {gameOver && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2>Game Over!</h2>
            <p>Score: {score}</p>
            <p>Highest Score: {highestScore}</p>
            <button onClick={closeModal}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Home;
