import {
  PLACE_SHIPS,
  WAITING_FOR_CPU,
  GUESS,
  OVER,
} from "./phases";

const message = (gameState) => {
  switch (gameState.phase) {
    case PLACE_SHIPS:
      return "Place all 5 of your ships";
    case GUESS:
      return "Can you guess where CPU placed their ship?";
    case OVER:
      return `You have ${gameState.won ? "Won" : "Lost"}!`;
    case WAITING_FOR_CPU:
      return "Waiting for CPU's move";
    default: 
      "";
  }
};

export const GameState = (props) => (
  <div>
    <div>{message(props.gameState)}</div> 
    {
      (props.gameState.phase == OVER) ? <a onClick={props.newGame}>{"Click here to start a new game"}</a> : ""
    }
  </div>
)
