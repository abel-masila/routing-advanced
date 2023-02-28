//Local storage
export const fetchData = (key) => {
  return JSON.parse(localStorage.getItem(key));
};

export const deleteItem = ({ key }) => {
  return localStorage.removeItem(key);
};
