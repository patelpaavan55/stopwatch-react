import React, { useState, useEffect, useLayoutEffect } from "react";
import logo from "./logo.svg";
import "./App.css";
import "./fonts/MyFont-UltraLight.otf";
import "./fonts/SanFranciscoDisplayRegular.ttf";

const START_TEXT = "Start";
const STOP_TEXT = "Stop";
const LAP_TEXT = "Lap";
const RESET_TEXT = "Reset";

const START_COLOR = "green";
const STOP_COLOR = "red";

function getFormattedTime(totalTime) {
  const totalTimeinSeconds = totalTime / 1000;
  const minutes = Math.floor(totalTimeinSeconds / 60);
  const seconds = Math.floor(totalTimeinSeconds % 60);
  const centiseconds = Math.floor((totalTime % 1000) / 10);
  // prettier-ignore
  return `${minutes.toString(10).padStart(2, 0)}:${seconds.toString(10).padStart(2, 0)}.${centiseconds.toString(10).padStart(2, 0)}`
}

function App() {
  const [currentElapsedTime, setCurrentElapsedTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [startTime, setStartTime] = useState(0);
  const [stopTime, setStopTime] = useState(0);
  const [overallTime, setOverallTime] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);

  function handleStartStop() {
    if (!isRunning) {
      setStartTime(Date.now());
      console.log("START HANDLE" + startTime);
      setIsRunning(true);
    } else {
      setStopTime(Date.now());
      setIsRunning(false);
    }
  }

  let lapList = undefined;
  function runLapLogic(currentLapButtonPressedTimeStamp = Date.now()) {}

  function handleLapReset() {
    const lapResetState = isRunning || !startTime ? LAP_TEXT : RESET_TEXT;
    if (lapResetState === LAP_TEXT) {
      console.log("THis is the Lap State........." + lapResetState);
      runLapLogic();
    } else if (lapResetState === RESET_TEXT) {
      // setIsLapDisabled(true);
      setCurrentTime(0);
      setStartTime(0);
      setStopTime(0);
      setCurrentElapsedTime(0);
      setOverallTime(0);
    }
  }

  // Sec 13, 18, 23

  useEffect(() => {
    console.log("Stoptime: " + stopTime);
  }, [stopTime]);
  useEffect(() => {
    console.log("Starttime: " + startTime);
  }, [startTime]);
  useEffect(() => {
    console.log("Overalltime: " + overallTime);
  }, [overallTime]);

  useEffect(() => {
    let intervalId;
    if (isRunning) {
      function updateCurrentTime() {
        setCurrentTime(Date.now());
      }
      intervalId = setInterval(updateCurrentTime, 10);
    }

    return () => clearInterval(intervalId);
  }, [isRunning]);

  useEffect(() => {
    setCurrentElapsedTime(currentTime - startTime + overallTime);
  }, [currentTime, startTime]);

  useEffect(() => {
    setOverallTime(
      (previousOverallTime) => previousOverallTime + (stopTime - startTime)
    );
  }, [stopTime]);

  return (
    <div className='App'>
      <div className='layout-container'>
        <div className='card'>
          <div className='timer-display'>
            {getFormattedTime(currentElapsedTime)}
          </div>
          <div className='timer-control-buttons'>
            <button
              className='btn-lap-reset round-button gray'
              disabled={!startTime}
              onClick={handleLapReset}
            >
              {isRunning || !startTime ? LAP_TEXT : RESET_TEXT}
            </button>
            <button
              className={`btn-start-stop round-button ${
                isRunning ? STOP_COLOR : START_COLOR
              }`}
              onClick={handleStartStop}
            >
              {isRunning ? STOP_TEXT : START_TEXT}
            </button>
          </div>
          <ul className='laps-container'>
            <li className='top'>{}</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
export default App;
