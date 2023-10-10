// Events/index.js
import { useState} from "react";
import EventCard from "../../components/EventCard";
import Select from "../../components/Select";
import { useData } from "../../contexts/DataContext";
import Modal from "../Modal";
import ModalEvent from "../ModalEvent";

import "./style.css";

const PER_PAGE = 9;

// Quand on slectionne un element du tableau, il faut que la section EventList se rafraichisse
// En prenant en compte le type selectionné pour afficher les bons events
// Il faut comparer le type selectionné et le type des events pour les mettre dans un tableau
// Pour le moment le useState type est null meme quand on change de selection

const EventList = () => {
  const { data, error } = useData();
  const [type, setType] = useState();
  // eslint-disable-next-line no-unused-vars
  const [currentPage, setCurrentPage] = useState(1);
  const filteredEvents = (
    (!type ? data?.events : data?.events.filter((event)=> event.type === type) ))

  // Faire un nouveau tableau depuis le filteredEvents if type === element.type ? 
  // Probleme : cela ne prend en compte que les element affiché dans la page courante


  // Faire un nouveau tableau depuis data.events if type === element.type ?
  // Quand type change , actualiser la liste afficher pour la comparer avec type
  // Si type est null alors toute la filteredEvents est affiché
  // Si type est non null alors faire la liste des elements === a type et les afficher
  // Comment faire pour que la liste se rafraichisse quand on change de type ?

  // Si !type ? filteredEvents.map((event) => <Modal key={event.id} Content={<ModalEvent event={event} />}>{({ setIsOpened }) => (<EventCard onClick={() => setIsOpened(true)} imageSrc={event.cover} title={event.title} date={new Date(event.date)} label={event.type}/>)}</Modal>)) : filteredType.map((event) => <Modal key={event.id} Content={<ModalEvent event={event} />}>{({ setIsOpened }) => (<EventCard onClick={() => setIsOpened(true)} imageSrc={event.cover} title={event.title} date={new Date(event.date)} label={event.type}/>)}</Modal>))



  const pageNumber = Math.floor((filteredEvents?.length || 0) / PER_PAGE) + 1;
  // Le tableau de filtres
  const typeList = new Set(data?.events.map((event) => event.type));


  const changeType = (evtType) => {
    setCurrentPage(1);
    setType(evtType);
  }


  return (
    <>
      {error && <div>An error occured</div>}
      {data === null ? (
        "loading"
      ) : (
        <>
          <h3 className="SelectTitle">Catégories</h3>
          <Select
            id="inputSelection"
            // selection n'existe pas dans le select 
            selection={Array.from(typeList)}
            // Si value est null alors on affiche tout les elements mais si il est comme l'une des valeurs
            // du tableau alors on affiche que les elements qui ont le type selectionné
            onChange={(value) => 
              (value ? changeType(value) : changeType(null))
            
            }
          />
          <div id="events" className="ListContainer">
            {filteredEvents.map((event) => (
              <Modal key={event.id} Content={<ModalEvent event={event} />}>
                {({ setIsOpened }) => (
                  <EventCard
                    onClick={() => setIsOpened(true)}
                    imageSrc={event.cover}
                    title={event.title}
                    date={new Date(event.date)}
                    label={event.type}
                  />
                )}
              </Modal>
            ))}
          </div>
          <div className="Pagination">
            {[...Array(pageNumber || 0)].map((_, n) => (
              // eslint-disable-next-line react/no-array-index-key
              <a key={n} href="#events" onClick={() => setCurrentPage(n + 1)}>
                {n + 1}
              </a>
            ))}
          </div>
        </>
      )}
    </>
  );
};

export default EventList;
