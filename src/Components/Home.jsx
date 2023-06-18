import React, { useState, useEffect } from "react";
import "./Home.css";
import events from "../assets/events.json";
import correctSound from "../assets/correct.mp3";
import incorrectSound from "../assets/incorrect.mp3";

function Home() {
  const [year, setYear] = useState(1963);
  const [score, setScore] = useState(0);
  const [life, setLife] = useState(100);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [highestScore, setHighestScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [popupVisible, setPopupVisible] = useState(false);
  const [loading, setLoading] = useState(true); // New state variable for loading
  const [showInstructions, setShowInstructions] = useState(true); // New state variable for instructions

  useEffect(() => {
    const storedHighestScore = localStorage.getItem("highestScore");
    if (storedHighestScore) {
      setHighestScore(parseInt(storedHighestScore));
    }
    random();
  }, []);

  function random() {
    setLoading(true);
    const randomIndex = Math.floor(Math.random() * events.length);
    const initialEvent = events[randomIndex];

    setTimeout(() => {
      setSelectedEvent(initialEvent);
      setLoading(false);
    }, 500);
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

  function playAudio() {
    const audio1 = new Audio(correctSound);
    const audio2 = new Audio(incorrectSound);
    if (selectedEvent.year === year) {
      audio1.play();
    } else {
      audio2.play();
    }
  }

  useEffect(() => {
    if (life <= 0) {
      if (score > highestScore) {
        setHighestScore(score);
        localStorage.setItem("highestScore", score.toString());
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
    playAudio();
  }

  function hidePopup() {
    setPopupVisible(false);
    formHandler(event);
  }

  function closeInstructions() {
    setShowInstructions(false);
  }

  return (
    <div className="center-container">
      {showInstructions && ( // Display the instructions pop-up if showInstructions is true
        <div
          className="starting-popup"
        >
          <h2>How to Play</h2>
          <p>Guess the year in which the event shown on the screen occurred.</p>
          <p>Use the slider to select your guess and click "CONFIRM".</p>
          <p>
            Gain points for correct guesses and lose life for incorrect ones.
          </p>
          <button onClick={closeInstructions} className="submit-button">
            Start Game
          </button>
        </div>
      )}
      {!showInstructions && !gameOver && selectedEvent && (
        <div className="selected-event">
          <div className="boxes-container">
            <div className="box">
              <p>
                score: <span style={{ color: "goldenrod" }}>{score}</span>
              </p>
            </div>
            <div className="box">
              <p>
                lives: <span style={{ color: "green" }}>{life}</span>
              </p>
            </div>
          </div>
          {loading ? (
            <div className="loading">Loading...</div>
          ) : (
            <img
              src={selectedEvent.link}
              alt="event-image"
              className="event-image"
            />
          )}
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
                <h3 className="yellow">{year}</h3>
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
