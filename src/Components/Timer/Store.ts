import { createStore, createEvent } from "effector";
import connectLocalStorage from "effector-localstorage";
import { useStore } from "effector-react";
import { time } from "console";
// import { start } from "repl";

export const startTimer = createEvent("start timer");
export const stopTimer = createEvent("stop timer");
export const resetTimer = createEvent("reset timer");
export const incTime = createEvent("dec timer");
export const decTime = createEvent("dec timer");

export const incWorkTimer = createEvent("inc work timer");
export const decWorkTimer = createEvent("dec work timer");

export const incBreakTimer = createEvent("inc break timer");
export const decBreakTimer = createEvent("dec break timer");

export const timerLocalStorage = connectLocalStorage("timer").onError((err) =>
  console.log(err)
);

export interface ITimer {
  timerId?: any;
  workTime: number;
  breakTime: number;
  time: number;
  running: boolean;
  status: string; //work or break
  launched: boolean;
  counter: number;
}

const initTimer: ITimer = {
  workTime: 25,
  breakTime: 5,
  time: 1500,
  running: false,
  status: "work",
  launched: false,
  counter: 1,
};

export const timerState = createStore(timerLocalStorage.init(initTimer))
  .on(decTime, (state) => {
    if (state.time == 0) {
      if (state.status == "work") {
        state.status = "break";
        if (state.counter == 4){
          state.time = 15 * 60;
        } else {
          state.time = state.breakTime * 60;
        }
        state.counter += 1;
      } else {
        state.status = "work";
        state.time = state.workTime * 60;
      }
    }
    state.time -= 1;
    let copy = Object.assign({}, state);
    return copy;
  })
  .on(startTimer, (state) => {
    state.running = true;
    state.launched = true;
    let copy = Object.assign({}, state);
    return copy;
  })
  .on(resetTimer, (state) => {
    state.running = false;
    return initTimer;
  })
  .on(stopTimer, (state) => {
    state.running = false;
    let copy = Object.assign({}, state);
    return copy;
  })
  .on(incWorkTimer, (state) => {
    state.workTime += 1;
    if (state.status == "work" && !state.launched) state.time += 60;
    let copy = Object.assign({}, state);
    return copy;
  })
  .on(decWorkTimer, (state) => {
    state.workTime -= 1;
    if (state.status == "work" && !state.launched) state.time -= 60;
    let copy = Object.assign({}, state);
    return copy;
  })
  .on(incBreakTimer, (state) => {
    state.breakTime += 1;
    if (state.status == "break" && !state.launched) state.time += 60;
    let copy = Object.assign({}, state);
    return copy;
  })
  .on(decBreakTimer, (state) => {
    state.breakTime -= 1;
    if (state.status == "break" && !state.launched) state.time -= 60;
    let copy = Object.assign({}, state);
    return copy;
  });

timerState.watch(timerLocalStorage);
