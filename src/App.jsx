import React, { useState } from 'react';
import Card from './Components/Card';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { TouchBackend } from 'react-dnd-touch-backend';
import update from 'immutability-helper';
import img1 from './assets/img.png';
import img2 from './assets/2.png';
import img3 from './assets/3.png';
import img4 from './assets/4.png';

// Function to detect touch devices
const isTouchDevice = () => {
  return (('ontouchstart' in window) || (navigator.maxTouchPoints > 0) || (navigator.msMaxTouchPoints > 0));
}

// Your App component
function App() {
  const [cards, setCards] = useState([
    { id: 1, name: 'Galamour', description: 'Fashion Photographer | Coach | Mentor it is a long established fact that a  reader whill be distracted by the ...', img: img1 },
    { id: 2, name: 'Galamour', description: 'Fashion Photographer | Coach | Mentor it is a long established fact that a  reader whill be distracted by the ...', img: img2 },
    { id: 3, name: 'Galamour', description: 'Fashion Photographer | Coach | Mentor it is a long established fact that a  reader whill be distracted by the ...', img: img3 },
    { id: 4, name: 'Galamour', description: 'Fashion Photographer | Coach | Mentor it is a long established fact that a  reader whill be distracted by the ...', img: img4 },
  ]);

  const moveCard = (dragIndex, hoverIndex) => {
    const dragCard = cards[dragIndex];
    setCards(
      update(cards, {
        $splice: [
          [dragIndex, 1],
          [hoverIndex, 0, dragCard],
        ],
      })
    );
  };

  // Choose backend based on device
  const backend = isTouchDevice() ? TouchBackend : HTML5Backend;

  return (
    <div className='flex justify-center items-center h-auto md:h-screen'>
      <DndProvider backend={backend}>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-2 max-w-[1200px]">
          {cards.map((card, index) => (
            <Card
              key={card.id}
              id={card.id}
              name={card.name}
              img={card.img}
              description={card.description}
              index={index}
              moveCard={moveCard}
            />
          ))}
        </div>
      </DndProvider>
    </div>
  );
}

export default App;
