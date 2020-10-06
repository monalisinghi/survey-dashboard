export const jsonGet = (url) => {
  return fetch(url)
    .then((response) => response.json())
    .catch((error) => console.log("Error: ", error));
};
