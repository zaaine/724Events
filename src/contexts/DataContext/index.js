import PropTypes from "prop-types";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

const DataContext = createContext({});

export const api = {
  loadData: async () => {
    const json = await fetch("/events.json");
    return json.json();
  },
};

export const DataProvider = ({ children }) => {
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);
  // Ajout du statut 'last'
  const [last, setLast] = useState(null);
  const getData = useCallback(async () => {
    try {
      // Fonction appelée que si 'data' est nul
      if(!data) {
        // Charge les données en utilisant 'api.loadData'
        setData(await api.loadData());
      }
    } catch (err) {
      setError(err);
    }
  }, [data]);
  
  useEffect(() => {
    // if (data) return;
    // Appel de la fonction 'getData' pour charger les données lorsqu'elles n'ont pas encore été chargées.
    getData();
    // L'effet ce joueras à chaque fois que 'getData' sera mis en condition
  }, [getData]);

  // Ajout d'un effet pour calculer et mettre à jour le props 'last'
  useEffect(() => {
    // Si des données et des données 'events' (prestation) sont présente
    if (data && data.events){
      // Utilise la fonction pour comparer les dates et en extraire la valeur la plus haute
      setLast(data.events.sort((evtA, evtB) => new Date(evtB.date) - new Date(evtA.date))[0])
    }
    // L'effet ce joueras à chaque fois que 'data' sera mis en condition.
  }, [data])
  
  return (
    <DataContext.Provider
      // eslint-disable-next-line react/jsx-no-constructed-context-values
      value={{
        data,
        error,
        // Ajout du props 'last' pour récupérer la valeur
        last
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

DataProvider.propTypes = {
  children: PropTypes.node.isRequired,
}

export const useData = () => useContext(DataContext);

export default DataContext;
