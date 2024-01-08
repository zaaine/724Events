import { useEffect, useState } from "react";
import { useData } from "../../contexts/DataContext";
import { getMonth } from "../../helpers/Date";

import "./style.scss";

const Slider = () => {
  const { data } = useData();
  const [index, setIndex] = useState(0);

  // Tri les données focus par ordre Décroissant
  const byDateDesc = data?.focus.sort((evtA, evtB) =>
    new Date(evtA.date) < new Date(evtB.date) ? -1 : 1
  );

  useEffect(() => {
    // Deplacement de la logique de transition automatique (fonction 'nextCard')
    // création d'une variable pour le timer
    const timeOutId = setTimeout(() => {
      // Verification de l'index par rapport à l'index précèdent (-1 pour éviter l'affichage d'une image blanche)
      setIndex((prevIndex) => (prevIndex < (byDateDesc?.length || 0) - 1 ? prevIndex + 1 : 0));
    }, 5000);
    // Nettoyage du timer lorsqu'un composant est démonté ou que l'index change
    return () => clearTimeout(timeOutId);

    // Effet déclenché par les changements de l'index et des données reçues
  }, [index, byDateDesc]);

  // Fonction pour changer manuellement l'indice en sélectionnant un input radio
  const handleChangeRadio = (radioIdx) => {
    // Mise à jour de l'index en fonction de l'indice de l'inputRadio
    setIndex(radioIdx);
    // Annulation du timer de transition automatique
    clearTimeout();
  };

  return (
    <div className="SlideCardList">
      {byDateDesc?.map((event, idx) => (
        <div key={event.title}>
          <div
            key={event.id}
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
              {byDateDesc.map((e, radioIdx) => (
                <input
                  key={`${e.title}`}
                  type="radio"
                  name="radio-button"
                  checked={radioIdx === index}
                  // Selection manuel de l'input
                  onChange={()=> handleChangeRadio(radioIdx)}
                />
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Slider;
