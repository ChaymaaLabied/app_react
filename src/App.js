import { useState, useEffect } from "react";
import Card from "./components/Card/Card";
import { deck } from "./data/cards";
import "./App.css";

function App() {
  const shuffleCards = (array) => {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  };
  //Tous useStates initialisés

  const [cards, setCards] = useState(() => shuffleCards(deck));
  const [choiceOne, setChoiceOne] = useState(null);
  const [choiceTwo, setChoiceTwo] = useState(null);
  const [isDisabled, setIsDisabled] = useState(false);
  const [victory, setVictory] = useState(false);

  //Tous les useEffects
  // Comparer les cartes sélectionnées
  useEffect(() => {
    if (choiceOne && choiceTwo) {
      setIsDisabled(true);
      if (choiceOne.pairId === choiceTwo.pairId) {
        // Les cartes matchent
        setCards((prevCards) =>
          prevCards.map((card) =>
            card.pairId === choiceOne.pairId
              ? { ...card, isMatched: true }
              : card
          )
        );
        resetTurn();
      } else {
        // Les cartes ne matchent pas alors on les retourne après 1s
        setTimeout(() => {
          setCards((prevCards) =>
            prevCards.map((card) =>
              card.id === choiceOne.id || card.id === choiceTwo.id
                ? { ...card, isFlipped: false }
                : card
            )
          );
          resetTurn();
        }, 900);
      }
    }
  }, [choiceOne, choiceTwo]);

  // Réinitialiser les choix et débloquer le clic
  const resetTurn = () => {
    setChoiceOne(null);
    setChoiceTwo(null);
    setIsDisabled(false);
  };

  // Vérifier la victoire
  useEffect(() => {
    if (cards.every((card) => card.isMatched)) {
      setVictory(true);
    }
  }, [cards]);
  // les évenements
  // Fonction pour gérer le clic sur une carte
  const handleChoice = (card) => {
    if (isDisabled || card.isFlipped || card.isMatched) return; // On ne fait rien si la carte est déjà retournée, matchée, ou si le clic est bloqué
    setCards((prevCards) =>
      prevCards.map((c) => (c.id === card.id ? { ...c, isFlipped: true } : c))
    );
    choiceOne ? setChoiceTwo(card) : setChoiceOne(card);
  };
  // Recommencer la partie
  const handleNewGame = () => {
    setCards(
      shuffleCards(
        deck.map((card) => ({ ...card, isFlipped: false, isMatched: false }))
      )
    );
    resetTurn();
    setVictory(false);
  };

  // Rendu JSX
  return (
    <div className="App">
      {victory ? (
        // Affiche message de victoire + bouton nouvelle partie
        <div className="victory">
          <h2>Bravo ! Tu as gagné 🎉</h2>
          <button onClick={handleNewGame}>Nouvelle partie</button>
        </div>
      ) : (
        // Sinon, affiche les cartes
        <div className="card-grid">
          {cards.map((card) => (
            <Card
              key={card.id}
              card={card}
              isFlipped={card.isFlipped}
              isMatched={card.isMatched}
              handleChoice={handleChoice}
            />
          ))}
        </div>
      )}
    </div>
  );
}
export default App;
