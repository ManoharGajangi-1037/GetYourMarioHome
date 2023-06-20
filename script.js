const numRows = 10;
const numCols = 10;
let maze = [];
let startRow = null;
let startCol = null;
let endRow = null;
let endCol = null;
let path = [];
const startbutton=document.getElementsByClassName("start-btn");
// Initialize the maze
   function initializeMaze() {
  maze = Array.from({ length: numRows }, () => Array(numCols).fill('cell'));
}


function ClearAll(){
    initializeMaze();
    const mazeContainer = document.querySelector('.maze-container');
  mazeContainer.innerHTML = '';
  document.body.style.backgroundColor="red";
  maze.forEach((row, rowIndex) => {
    row.forEach((cell, colIndex) => {
      const cellElement = document.createElement('div');
      cellElement.classList.add('cell');
           
      if (cell === 'obstacle') {
        cellElement.classList.add('cell');
      } else if (rowIndex === startRow && colIndex === startCol) {
            startRow = null;
            startCol = null;
            endRow = null;
            endCol = null;
        cellElement.classList.add('cell');
      } else if (rowIndex === endRow && colIndex === endCol) {
        cellElement.classList.add('cell');
      } else if (cell === 'path') {
        cellElement.classList.add('cell');
      }

      cellElement.addEventListener('click', function() {
        handleCellClick(rowIndex, colIndex);
      });

      mazeContainer.appendChild(cellElement);
    });
  });

}
// Render the maze
function renderMaze() {
  const mazeContainer = document.querySelector('.maze-container');
  mazeContainer.innerHTML = '';

  maze.forEach((row, rowIndex) => {
    row.forEach((cell, colIndex) => {
      const cellElement = document.createElement('div');
      cellElement.classList.add('cell');

      if (cell === 'obstacle') {
        cellElement.classList.add('obstacle');
      } else if (rowIndex === startRow && colIndex === startCol) {
        cellElement.classList.add('start');
      } else if (rowIndex === endRow && colIndex === endCol) {
        cellElement.classList.add('end');
      } else if (cell === 'path') {
        cellElement.classList.add('path');
      }

      cellElement.addEventListener('click', function() {
        handleCellClick(rowIndex, colIndex);
      });

      mazeContainer.appendChild(cellElement);
    });
  });
}

// Function to handle cell click events
function handleCellClick(row, col) {
  if (maze[row][col] === 'obstacle') {
    maze[row][col] = 'cell';
  } else if (maze[row][col] === 'cell') {
    if (startRow === null && startCol === null) {
      maze[row][col] = 'start';
      startRow = row;
      startCol = col;
    } else if (endRow === null && endCol === null) {
      maze[row][col] = 'end';
      endRow = row;
      endCol = col;
    } else {
      maze[row][col] = 'obstacle';
    }
  } else if (maze[row][col] === 'start') {
    maze[row][col] = 'cell';
    startRow = null;
    startCol = null;
  } else if (maze[row][col] === 'end') {
    maze[row][col] = 'cell';
    endRow = null;
    endCol = null;
  }
  renderMaze();
}


// Function to find the shortest path using breadth-first search (BFS)
function findShortestPath(row, col) {
    const queue = [[row, col]];
    const visited = Array.from({ length: numRows }, () => Array(numCols).fill(false));
    const parent = {};
  
    visited[row][col] = true;
  
    while (queue.length > 0) {
      const [currentRow, currentCol] = queue.shift();
  
      if (currentRow === endRow && currentCol === endCol) {
        document.body.style.backgroundColor = 'green';
        break; // Exit the loop if the end cell is reached
      }
  
      const neighbors = [
        [currentRow - 1, currentCol], // Up
        [currentRow + 1, currentCol], // Down
        [currentRow, currentCol - 1], // Left
        [currentRow, currentCol + 1] // Right
      ];
  
      for (const [neighborRow, neighborCol] of neighbors) {
        if (
          neighborRow >= 0 &&
          neighborRow < numRows &&
          neighborCol >= 0 &&
          neighborCol < numCols &&
          !visited[neighborRow][neighborCol] &&
          maze[neighborRow][neighborCol] !== 'obstacle'
        ) {
          queue.push([neighborRow, neighborCol]);
          visited[neighborRow][neighborCol] = true;
          parent[`${neighborRow},${neighborCol}`] = [currentRow, currentCol];
        }
      }
    }
  
    // Reconstruct the shortest path
    let currentCell = [endRow, endCol];
    const shortestPath = [];
  
    while (currentCell) {
      shortestPath.unshift(currentCell);
      currentCell = parent[`${currentCell[0]},${currentCell[1]}`];
    }
  
    return shortestPath;
  }
  
  // Function to handle the start button click event
  
  function handleStartClick() {
    if (startRow === null || startCol === null || endRow === null || endCol === null) {
      alert('Please set the start and end points.');
      return;
    }
  
    const shortestPath = findShortestPath(startRow, startCol);

    if (shortestPath.length > 0) {
     
      for (const [row, col] of shortestPath) {
        maze[row][col] = 'path';
      }
  
      renderMaze();
    } else {
      document.body.style.backgroundColor = 'red';
      alert('No valid path found.');
    }
  }
  

// Function to find the path using backtracking
// // Function to find the path using backtracking
// let shortestPath = null; // Variable to store the shortest path

// // Function to find the shortest path using depth-first search (DFS) with backtracking
// function findShortestPath(row, col, visited, currentPath) {
//   if (row < 0 || row >= numRows || col < 0 || col >= numCols || visited[row][col] || maze[row][col] === 'obstacle') {
//     return;
//   }

//   visited[row][col] = true;

//   if (row === endRow && col === endCol) {
//     if (shortestPath === null || currentPath.length < shortestPath.length) {
//       shortestPath = currentPath.slice(); // Store the current path as the new shortest path
//     }
//     visited[row][col] = false; // Reset visited flag for backtracking
//     return;
//   }

//   currentPath.push({ row, col });

//   // Explore the neighboring cells (up, down, left, right)
//   findShortestPath(row - 1, col, visited, currentPath); // Up
//   findShortestPath(row + 1, col, visited, currentPath); // Down
//   findShortestPath(row, col - 1, visited, currentPath); // Left
//   findShortestPath(row, col + 1, visited, currentPath); // Right

//   currentPath.pop(); // Remove the current cell from the current path
//   visited[row][col] = false; // Reset visited flag for backtracking
// }

// // Function to handle the start button click event
// function handleStartClick() {
//   if (startRow === null || startCol === null || endRow === null || endCol === null) {
//     alert('Please set the start and end points.');
//     return;
//   }

//   const visited = Array.from({ length: numRows }, () => Array(numCols).fill(false));
//   shortestPath = null;

//   findShortestPath(startRow, startCol, visited, []);

//   if (shortestPath !== null) {
//     maze[startRow][startCol] = 'start';
//     maze[endRow][endCol] = 'end';
//     document.body.style.backgroundColor = 'green';

//     for (const { row, col } of shortestPath) {
//       maze[row][col] = 'path';
//     }

//     renderMaze();
//   } else {
//     document.body.style.backgroundColor = 'red';
//     alert('No valid path found.');
//   }
// }

initializeMaze();
renderMaze();