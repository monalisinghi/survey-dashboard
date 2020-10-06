// Return participation %
export const participation = (participation) => {
  if (participation === 1) {
    return `${participation * 100} %`;
  } else {
    return `${(participation * 100).toFixed(2)} %`;
  }
};

// Calculate question rating based on responses
export const questionRating = (responses) => {
  const validResponses = responses
    ? responses.filter((response) => response.response_content !== "")
    : [];
  const totalResponses = validResponses.reduce(
    (acc, response) => acc + parseInt(response.response_content),
    0
  );
  return totalResponses !== 0 && validResponses.length > 0
    ? (totalResponses / validResponses.length).toFixed(1)
    : 0;
};
