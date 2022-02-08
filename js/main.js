import { generateStats } from "./generateStats.js";
import { getPosition } from "./getPosition.js";

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
    /* put all player's info in one single object */
    players = data.players.map((player) => {
      return { ...player.player, stats: player.stats };
    });
    createSelector(players);
    /* call generate content, so we have a player on first load */
    generateContent(players[0].id);
  } catch (err) {
    console.log("Error: ", err);
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
  cardBottom.classList.add("card__bottom");

  if (isNaN(selected)) return;

  cardTop.innerHTML = `
    <figure>
        <img src="./assets/images/p${selected}.png" alt="">
    </figure>
  `;

  players.find((player) => {
    if (player.id === selected) {
      const name = `${player.name.first} ${player.name.last}`;
      const position = player.info.positionInfo;

      return (cardBottom.innerHTML = `
            <figure class="circle">
              <img 
                src="./assets/images/t${player.currentTeam.id}.png" 
                alt="${player.currentTeam.name} logo"
              >
            </figure>
            <h3 tabindex="0" aria-label='player name ${name}'>
              ${name}
            </h3>
            <p tabindex="0" aria-label="player position 
                ${getPosition(position)}
            ">
              ${getPosition(position)}
            </p>
            <ul class="stats" tabindex="0" aria-label="player stats">
              ${generateStats(player.stats)}
            </ul>
      `);
    }
    return;
  });
};

playerCard
  .appendChild(cardArticle)
  .appendChild(cardTop)
  .insertAdjacentElement("afterend", cardBottom);

loadPlayers();
