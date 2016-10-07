import {
  PLACE_SHIPS,
  WAITING_FOR_CPU,
  GUESS,
  OVER,
} from "./phases";

import {NUMBER_OF_SHIPS} from "../utils/constants";

const genMessageInfo = (gameState) => {
  switch (gameState.phase) {
    case PLACE_SHIPS:
      return {
        message: `Place all ${NUMBER_OF_SHIPS} of your ships`,
        style: "messageLeft",
      }
    case GUESS:
      return {
        message: "Can you guess where CPU placed their ships?",
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

const Message = CSSModules(styles)((props) => {
  const messageInfo = genMessageInfo(props.gameState);
  return <div styleName={messageInfo.style}>{messageInfo.message}</div>;
});

export const GameState = CSSModules(styles)((props) => {
  return <div styleName="message">
    <Message gameState={props.gameState}/>
    {
      (props.gameState.phase == OVER) ? <a styleName="newGame" onClick={props.newGame}>{"Click here to start a new game"}</a> : ""
    }
  </div>
});
