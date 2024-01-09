export const MONTHS = {
  1: "janvier",
  2: "février",
  3: "mars",
  4: "avril",
  5: "mai",
  6: "juin",
  7: "juillet",
  8: "août",
  9: "septembre",
  10: "octobre",
  11: "novembre",
  12: "décembre",
};

// Ajout +1 à la l'indice pour que la fonction getMonth commence avec l'indice 1 et non 0 
export const getMonth = (date) => MONTHS[date.getMonth() + 1];
