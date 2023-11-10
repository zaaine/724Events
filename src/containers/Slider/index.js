import React, { useEffect, useState } from 'react';
import { useData } from "../../contexts/DataContext";
import { getMonth } from "../../helpers/Date";
import "./style.scss";

const Slider = () => {
  const { data } = useData();
  const [index, setIndex] = useState(0);
  const [sortedData, setSortedData] = useState([]);

  useEffect(() => {
    const sorted = [...(data?.focus || [])].sort((evtA, evtB) =>
      new Date(evtA.date) - new Date(evtB.date) 
    );
    setSortedData(sorted);
  }, [data]);

  const nextCard = () => {
    setTimeout(() => {
      setIndex((currentIndex) => (currentIndex < sortedData.length - 1 ? currentIndex + 1 : 0));
    }, 5000);
  };

  useEffect(() => {
    const timer = setTimeout(nextCard, 5000);
    return () => clearTimeout(timer);
  }, [index, sortedData.length]);

  return (
    <div className="SlideCardList">
      {sortedData.map((event, idx) => (
        <React.Fragment key={event.id ? event.id : idx}>
          <div className={`SlideCard SlideCard--${index === idx ? "display" : "hide"}`}>
            <img src={event.cover} alt="forum" />
            <div className="SlideCard__descriptionContainer">
              <div className="SlideCard__description">
                <h3>{event.title}</h3>
                <p>{event.description}</p>
                <div>{getMonth(new Date(event.date))}</div>
              </div>
            </div>
          </div>
          <div className="SlideCard__paginationContainer">
          <div className="SlideCard__pagination">
            {sortedData.map((_, radioIdx) => (
              <input
                key={event.id ? `${event.id}-${radioIdx}` : `radio-${idx}-${radioIdx}`}
                type="radio"
                name="radio-button"
                checked={index === radioIdx}
                onChange={() => setIndex(radioIdx)}
                readOnly
              />
            ))}
          </div>
        </div>
      </React.Fragment>
      ))}
    </div>
  );
};

export default Slider;
