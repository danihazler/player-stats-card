const playerCard = document.getElementById("player-card");
const cardArticle = document.createElement("article");
const cardTop = document.createElement("div");
const cardBottom = document.createElement("div");
cardArticle.classList.add("card");
let players = [];

const loadPlayers = async () => {
  try {
    const res = await fetch("../data/player-stats.json");
    const data = await res.json();
    players = data.players.map((player) => {
      return { ...player.player, stats: player.stats };
    });
    createSelector(players);
    /* call generate content, so we have a player on first load */
    generateContent(players[0].id);
  } catch (err) {
    console.log(err);
  }
};

const createSelector = (players) => {
  const selector = document.createElement("select");
  selector.name = "players";
  selector.id = "players";

  const options = players.map((player) => {
    return `<option value='${player.id}'>${player.name.first} ${player.name.last}</option>`;
  });

  selector.innerHTML = `${options.join("")}`;

  selector.addEventListener("change", (e) =>
    generateContent(Number(e.target.value))
  );

  return cardArticle.appendChild(selector);
};

const generateContent = (selected) => {
  cardTop.classList.add("card__top");

  if (isNaN(selected)) return;

  cardTop.innerHTML = `
        <figure>
          <img src="./assets/images/p${selected}.png" alt="">
        </figure>
      `;
};

playerCard.appendChild(cardArticle).appendChild(cardTop);

loadPlayers();
