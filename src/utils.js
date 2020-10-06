// fetch data from API endpoint
export const jsonGet = (url) => {
  return fetch(url).then((response) => response.json());
};

// return participation %
export const participation = (participation) => {
  if (participation === 1) {
    return `${participation * 100} %`;
  } else {
    return `${(participation * 100).toFixed(2)} %`;
  }
};
