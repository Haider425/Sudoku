function buildHighScoresTable(scores) {
    const container = document.createElement('div');
    container.className = 'high-scores-container';
    
    const title = document.createElement('h2');
    title.textContent = 'High Scores';
    title.style.textAlign = 'center';
    title.style.marginBottom = '1.5rem';
    title.style.color = '#2d3748';
    container.appendChild(title);

    if (!scores || scores.length === 0) {
        const noScores = document.createElement('div');
        noScores.className = 'no-scores';
        noScores.textContent = 'No scores recorded yet. Complete a game to see your score here!';
        container.appendChild(noScores);
        document.getElementById('highScores').appendChild(container);
        return;
    }

    const table = document.createElement('table');
    const thead = document.createElement('thead');
    const tbody = document.createElement('tbody');


    const headers = ['Date', 'Duration'];
    const headerRow = document.createElement('tr');
    headers.forEach(header => {
        const th = document.createElement('th');
        th.textContent = header;
        headerRow.appendChild(th);
    });
    thead.appendChild(headerRow);

    const sortedScores = [...scores].sort((a, b) => {
        const [aMin, aSec] = a.duration.split(':').map(Number);
        const [bMin, bSec] = b.duration.split(':').map(Number);
        return (aMin * 60 + aSec) - (bMin * 60 + bSec);
    });

    sortedScores.forEach((score, index) => {
        const tr = document.createElement('tr');
        
        const dateCell = document.createElement('td');
        const date = new Date(score.date);
        const formattedDate = `${date.getFullYear()}/${String(date.getMonth() + 1).padStart(2, '0')}/${String(date.getDate()).padStart(2, '0')}`;
        dateCell.textContent = formattedDate;

        tr.appendChild(dateCell);
        
        const durationCell = document.createElement('td');
        const durationParts = score.duration.split(':').map(Number);
        const formattedDuration = `${String(durationParts[0]).padStart(2, '0')}:${String(durationParts[1]).padStart(2, '0')}`;
        durationCell.textContent = formattedDuration;

        tr.appendChild(durationCell);
        tbody.appendChild(tr);
    });

    table.appendChild(thead);
    table.appendChild(tbody);
    container.appendChild(table);
    document.getElementById('highScores').appendChild(container);
}

const highScores = [
    { "date": "2024/01/14", "duration": "2:51" },
    { "date": "2024/01/13", "duration": "3:45" },
    { "date": "2024/01/12", "duration": "2:30" },
    { "date": "2024/01/11", "duration": "4:15" },
    { "date": "2024/01/10", "duration": "3:20" }
];

document.addEventListener('DOMContentLoaded', () => {
    buildHighScoresTable(highScores);
});

const navbarBurger = document.querySelector('.navbar-burger');
  const navbarMenu = document.querySelector('.navbar-menu');
  if (navbarBurger && navbarMenu) {
      navbarBurger.addEventListener('click', () => {
          navbarBurger.classList.toggle('is-active');
          navbarMenu.classList.toggle('is-active');
      });
  }
