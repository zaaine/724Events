import PropTypes from "prop-types";
import { createContext, useCallback, useContext, useEffect, useState, useMemo } from "react";

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
  const [last, setLast] = useState(null);

  const getData = useCallback(async () => {
    try {
      const loadedData = await api.loadData();
      setData(loadedData);

      if (loadedData && loadedData.events) {
        const sortedEvents = loadedData.events.sort(
          (a, b) => new Date(b.date) - new Date(a.date)
        );
        setLast(sortedEvents[0]);
      }
    } catch (err) {
      setError(err);
    }
  }, []);

  useEffect(() => {
    if (data) return;
    getData();
  }, [getData, data]);

  const contextValue = useMemo(() => ({
    data,
    error,
    last,
  }), [data, error, last]);

  return (
    <DataContext.Provider value={contextValue}>
      {children}
    </DataContext.Provider>
  );
};

DataProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export const useData = () => useContext(DataContext);

export default DataContext;