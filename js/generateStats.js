export const generateStats = (statsInfo) => {
  if (!statsInfo || !statsInfo.length)
    return `<li class="stats__item" tabindex="0">Player stats not found</li>`;

  const toDisplay = {
    Appearances: 0,
    Goals: 0,
    Assists: 0,
    "Goals per match": 0,
    "Passes per minute": 0,
  };
  let totalPasses = 0;
  let mins_played = 0;

  statsInfo.find((val) => {
    let f_pass = val.name === "fwd_pass" ? val.value : 0;
    let b_pass = val.name === "backward_pass" ? val.value : 0;
    val.name === "mins_played" ? (mins_played += val.value) : 0;
    totalPasses += f_pass += b_pass;

    if (val.name === "appearances") toDisplay.Appearances = val.value;
    if (val.name === "goals") toDisplay.Goals = val.value;
    if (val.name === "goal_assist") toDisplay.Assists = val.value;
    toDisplay["Goals per match"] = (
      toDisplay.Goals / toDisplay.Appearances
    ).toFixed(2);
    toDisplay["Passes per minute"] = (totalPasses / mins_played).toFixed(2);
  });

  let statsHTML = "";

  for (let key in toDisplay) {
    statsHTML += `
          <li class="stats__item" tabindex="0">
            <p>${key}</p>
            <span>${toDisplay[key]}</span>
          </li>
        `;
  }

  return statsHTML;
};
