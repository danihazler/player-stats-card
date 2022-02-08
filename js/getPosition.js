/**
 * Not ideal approach, best would be to get desired position to be displayed directly from BE
 * or to be able to create a dictionary based on the position letter code, but in our case the letter "M"
 * represents 3 different positions, so I decided to follow as bellow
 */
export const getPosition = (position) => {
  if (position.toLowerCase().includes("defen")) return "Defender";
  if (position.toLowerCase().includes("wing")) return "Winger";
  if (position.toLowerCase().includes("strik")) return "Striker";
  return;
};
