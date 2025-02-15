document.addEventListener('DOMContentLoaded', () => {
   
    let activeNumber = null;
    let moves = [];
  
    const boardArray = [
      [-1, 1, -1, -1, -1, -1, -1, 9,  -1],
      [-1, -1, 4, -1, -1, -1, 2, -1,  -1],
      [-1, -1, 8, -1, -1, 5, -1, -1,  -1],
      [-1, -1, -1, -1, -1, -1, -1, 3, -1],
      [2, -1, -1, -1, 4, -1, 1, -1,   -1],
      [-1, -1, -1, -1, -1, -1, -1, -1,-1],
      [-1, -1, 1, 8, -1, -1, 6, -1,   -1],
      [-1, 3, -1, -1, -1, -1, -1, 8,  -1],
      [-1, -1, 6, -1, -1, -1, -1, -1, -1]
    ];
    
  
    function buildGameBoard() {
      const gridContainer = document.getElementById('sudoku-grid');
      
      const table = document.createElement('table');
      table.classList.add('sudoku-grid');
      const tbody = document.createElement('tbody');
  
      for (let i = 0; i < 9; i++) {
        const row = document.createElement('tr');
        for (let j = 0; j < 9; j++) {
          const cell = document.createElement('td');
          cell.classList.add('sudoku-cell');
          
          if (j % 3 === 2) cell.classList.add('border-right');
          if (i % 3 === 2) cell.classList.add('border-bottom');
          if (j === 0) cell.classList.add('border-left');
          if (i === 0) cell.classList.add('border-top');
  
          if (boardArray[i][j] !== -1) {
            cell.textContent = boardArray[i][j];
            cell.classList.add('initial');
          } else {
            cell.addEventListener('click', () => {
              if (activeNumber !== null && !cell.classList.contains('initial')) {
                const oldValue = cell.textContent;
                const cellIndex = i * 9 + j;
                
                moves.push({
                  index: cellIndex,
                  value: oldValue,
                  newValue: activeNumber
                });
                
                cell.textContent = activeNumber;
                checkConflicts();
              }
            });
          }
  
          row.appendChild(cell);
        }
        tbody.appendChild(row);
      }
  
      table.appendChild(tbody);
      gridContainer.appendChild(table);
    }
  

    function buildControls() {
      const controlsContainer = document.getElementById('sudoku-controls');
      controlsContainer.innerHTML = ''; 
      
      const table = document.createElement('table');
      table.classList.add('sudoku-controls');
      const tr = document.createElement('tr');
  
      
      for (let i = 1; i <= 10; i++) {
        const td = document.createElement('td');
        td.classList.add('sudoku-cell');
        td.textContent = i;
        td.addEventListener('click', () => {
          activeNumber = i;
          document.querySelectorAll('.sudoku-controls .sudoku-cell').forEach(cell => {
            cell.classList.remove('selected');
          });
          td.classList.add('selected');
        });
        tr.appendChild(td);
  
        if(i === 10){
          td.textContent = '';
          td.classList.add('sudoku-cell');
          td.innerHTML = '<img src="images/undo.png" alt="Undo" width="20px">';
          td.addEventListener('click', () => {
            activeNumber = null;
            document.querySelectorAll('.sudoku-controls .sudoku-cell').forEach(cell => {
              cell.classList.remove('selected');
            });
            td.classList.add('selected');
  
            const cells = document.querySelectorAll('.sudoku-grid .sudoku-cell');
            const lastMove = moves.pop();
            if (lastMove) {
              const cell = cells[lastMove.index];
              cell.textContent = lastMove.value || ''; 
              checkConflicts();
            }
          });
        }
      }
  
      table.appendChild(tr);
      controlsContainer.appendChild(table);
    }
  
    function checkConflicts() {
      const cells = document.querySelectorAll('.sudoku-grid .sudoku-cell');
      
      cells.forEach(cell => cell.classList.remove('error'));
  
      for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
          const cell = cells[i * 9 + j];
          if (!cell.textContent) continue;
  
          for (let k = 0; k < 9; k++) {
            if (k !== j && cells[i * 9 + k].textContent === cell.textContent) {
              cell.classList.add('error');
              cells[i * 9 + k].classList.add('error');
            }
          }
  
          for (let k = 0; k < 9; k++) {
            if (k !== i && cells[k * 9 + j].textContent === cell.textContent) {
              cell.classList.add('error');
              cells[k * 9 + j].classList.add('error');
            }
          }
  
          const boxRow = Math.floor(i / 3) * 3;
          const boxCol = Math.floor(j / 3) * 3;
          for (let r = 0; r < 3; r++) {
            for (let c = 0; c < 3; c++) {
              const index = (boxRow + r) * 9 + (boxCol + c);
              if (index !== i * 9 + j && cells[index].textContent === cell.textContent) {
                cell.classList.add('error');
                cells[index].classList.add('error');
              }
            }
          }
        }
      }
    }
  
    buildGameBoard();
    buildControls();
  });