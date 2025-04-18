import React, { useState } from 'react';
import DesignCard from './DesignCard';
import './DesignCard.css';

function App() {
  const [cards, setCards] = useState([
    {
      title: 'Design System',
      tasks: [
        { name: 'Design Tokens', done: true },
        { name: 'Color System', done: true },
        { name: 'Type System', done: true },
        { name: 'Documentation', done: false }
      ],
      priority: 'Urgent',
      status: 'In Progress',
      people: ['🧑‍💻 Chloe', '👩 Anna', '🧔‍💻 Ramesh']
    }
  ]);

  const addCard = () => {
    setCards([
      ...cards,
      {
        title: 'New Card',
        tasks: [],
        priority: 'Medium',
        status: 'Not Started',
        people: []
      }
    ]);
  };

  const updateCard = (index, updatedCard) => {
    const updated = [...cards];
    updated[index] = updatedCard;
    setCards(updated);
  };

  const deleteCard = (index) => {
    const updated = [...cards];
    updated.splice(index, 1);
    setCards(updated);
  };

  return (
    <div className="App-container">
      <button className="add-button" onClick={addCard}>➕ Add New Card</button>
      <div className="card-grid">
        {cards.map((card, index) => (
          <DesignCard
            key={index}
            card={card}
            onChange={(updatedCard) => updateCard(index, updatedCard)}
            onDelete={() => deleteCard(index)}
          />
        ))}
      </div>
    </div>
  );
}

export default App;
