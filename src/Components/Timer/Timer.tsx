import React, { useEffect } from "react";
import { Header, Button, Container, Progress } from "semantic-ui-react";
import { useStore } from "effector-react";
import {
  timerState,
  incBreakTimer,
  incWorkTimer,
  decBreakTimer,
  decWorkTimer,
  decTime,
  startTimer,
  stopTimer,
  resetTimer,
} from "./Store";

import "./Timer.css";

export const Timer = () => {
  const time = useStore(timerState);

  useEffect(() => {
    // console.log(time);
    if (time.running) {
      time.timerId = setInterval(() => decTime(), 1000);
    }
    return () => {
      clearInterval(time.timerId);
    };
  });

  return (
    <Container>
      <Header as="h2">Its time to {time.status}!</Header>
      <Header as="h1">
        {Math.floor(time.time / 60) +
          ":" +
          (time.time % 60).toString().padStart(2, "0")}
      </Header>

      <div className="controlButtons">
        <Button onClick={startTimer} content="Start" />
        <Button onClick={stopTimer} content="Stop" />
        <Button onClick={resetTimer} content="Reset" />

        <Progress percent={11} />

        <Container className="work">
          <Button onClick={decWorkTimer} content="-" />{" "}
          <div className="buttonText"> Work time: {time.workTime} </div>
          <Button onClick={incWorkTimer} content="+" />
        </Container>
        <Container className="break">
          <Button onClick={decBreakTimer} content="-" />{" "}
          <div className="buttonText"> Break time: {time.breakTime} </div>
          <Button onClick={incBreakTimer} content="+" />
        </Container>
      </div>
    </Container>
  );
};
