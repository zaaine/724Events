import { useEffect, useState } from "react";
import { useData } from "../../contexts/DataContext";
import { getMonth } from "../../helpers/Date";

import "./style.scss";

const Slider = () => {
  const { data } = useData();
  const [index, setIndex] = useState(0);
  // Scenario 1 = modification de la fonction sort (inversion evtB, evtA)
  const byDateDesc = data?.focus.sort((evtA, evtB) =>
    new Date(evtB.date) < new Date(evtA.date) ? -1 : 1
  );
  const nextCard = () => {
    setTimeout(
      // Scenario 2 : A la fin du défilement le slider revient au début sans slide blanche
      // Ajout d'un -1 à  byDateDesc.length vérifie si l'index actuel est inférieur au dernier index valide du tableau
      () => setIndex(index < byDateDesc.length - 1 ? index + 1 : 0),
      5000
    );
  
};
  useEffect(() => {
    nextCard();
  });
  return (
    <div className="SlideCardList">
      {byDateDesc?.map((event, idx) => (
        <>
          <div
            key={event.title}
            className={`SlideCard SlideCard--${
              index === idx ? "display" : "hide"
            }`}
          >
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
              {byDateDesc.map((_, radioIdx) => (
                // Scénario 3 : warning console modification de la key qui doit être unique.
                // readOnly permet de synchro le bulletpoint sur la slide en cours
                   <input
                     key={`${_.title}`}
                     type="radio"
                     name="radio-button"
                     checked={index === radioIdx}
                     readOnly
                   />
              ))}
            </div>
          </div>
        </>
      ))}
    </div>
  );
};

export default Slider;
