import { createContext, useContext, useEffect, useState } from "react";

const ListContext = createContext();

export function ListProvider({ children }) {

  const [myList, setMyList] = useState(() => {
    try {
      const saved = localStorage.getItem("netflixMyList");
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });


  useEffect(() => {
    localStorage.setItem(
      "netflixMyList",
      JSON.stringify(myList)
    );
  }, [myList]);


  const addToList = (movie) => {
    setMyList((prev) => {
      const exists = prev.some(
        item => item.id === movie.id
      );

      return exists ? prev : [...prev, movie];
    });
  };


  const removeFromList = (id) => {
    setMyList((prev) =>
      prev.filter(
        movie => movie.id !== id
      )
    );
  };


  const toggleList = (movie) => {
    setMyList((prev) => {

      const exists = prev.some(
        item => item.id === movie.id
      );

      if (exists) {
        return prev.filter(
          item => item.id !== movie.id
        );
      }

      return [...prev, movie];

    });
  };


  const clearList = () => {
    setMyList([]);
  };


  const isInList = (id) => {
    return myList.some(
      movie => movie.id === id
    );
  };


  return (
    <ListContext.Provider value={{
      myList,
      addToList,
      removeFromList,
      toggleList,
      clearList,
      isInList
    }}>
      {children}
    </ListContext.Provider>
  );
}


export function useList() {
  return useContext(ListContext);
}