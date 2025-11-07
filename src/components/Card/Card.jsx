import backSide from "./assets/backpic.jpg";


function Card({ card, isFlipped, isMatched, handleChoice }) {
  return (
    <button
      className={isFlipped || isMatched ? "card flipped" : "card"}
      onClick={() => handleChoice(card)}
    >
      <img src={card.icon} className="frontSide" alt={card.name} />
      <img src={backSide} className="backSide" alt="Dos de la carte" />
    </button>
  );
}

export default Card;

