import {
  PLACE_SHIPS,
  WAITING_FOR_CPU,
  GUESS,
  OVER,
} from "./phases";

import * as classNames from "classnames";

const genMessageInfo = (gameState) => {
  switch (gameState.phase) {
    case PLACE_SHIPS:
      return {
        message: "Place all 5 of your ships",
        style: "messageLeft",
      }
    case GUESS:
      return {
        message: "Can you guess where CPU placed their ship?",
        style: "messageRight",
      };
    case OVER:
      return {
        message: `You have ${gameState.won ? "Won" : "Lost"}!`,
        style: "messageCenter"
      };
    case WAITING_FOR_CPU:
      return {
        message: "Waiting for CPU",
        style: "messageCenter",
      };
    default: 
      return {
        message: "",
        style: "",
      };
  }
};

const Message = (props) => {
  const messageInfo = genMessageInfo(props.gameState);
  return <div styleName={messageInfo.style}>{messageInfo.message}</div>;
};

export const GameState = CSSModules(styles)((props) => {
  <div styleName="message">
    <Message gameState={props.gameState}/>
    {
      (props.gameState.phase == OVER) ? <a onClick={props.newGame}>{"Click here to start a new game"}</a> : ""
    }
  </div>
});
