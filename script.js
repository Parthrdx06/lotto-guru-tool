// --- CORE NUMBER GENERATION FUNCTION ---
function generateUniqueNumbers(count, max) {
    const numbers = new Set();
    while (numbers.size < count) {
        // Generates a random integer between 1 and max (inclusive)
        const num = Math.floor(Math.random() * max) + 1;
        numbers.add(num);
    }
    // Convert Set to Array and Sort them for cleaner display
    return Array.from(numbers).sort((a, b) => a - b);
}

// --- FUNCTION TO DISPLAY A SINGLE GAME LINE ---
function displayGameLine(game, gameIndex, resultsDiv) {
    let mainCount, mainMax, powerMax;

    // Set parameters based on the selected game (Official Rules)
    switch (game) {
        case 'Powerball':
            mainCount = 7;
            mainMax = 35;
            powerMax = 20; 
            break;
        case 'OzLotto':
            mainCount = 7;
            mainMax = 47;
            powerMax = 0;
            break;
        case 'GoldLotto':
            mainCount = 6;
            mainMax = 45;
            powerMax = 0;
            break;
        case 'SetForLife':
            mainCount = 7;
            mainMax = 44;
            powerMax = 0;
            break;
        default:
            return;
    }

    // --- GENERATE NUMBERS ---
    const mainNumbers = generateUniqueNumbers(mainCount, mainMax);
    let powerball = null;
    if (powerMax > 0) {
        powerball = generateUniqueNumbers(1, powerMax)[0]; 
    }

    // --- CREATE HTML STRUCTURE FOR ONE GAME ---
    const gameLine = document.createElement('div');
    gameLine.className = 'game-line';
    
    // Add the Game Label (e.g., "Game 1:")
    const label = document.createElement('span');
    label.textContent = `Game ${gameIndex}:`;
    label.className = 'game-line-label';
    gameLine.appendChild(label);
    
    // Display Main Numbers
    mainNumbers.forEach(num => {
        const ball = document.createElement('span');
        // Pad single-digit numbers with a leading zero
        ball.textContent = String(num).padStart(2, '0');
        ball.className = 'ball main-ball';
        gameLine.appendChild(ball);
    });

    // Display Powerball (if applicable)
    if (powerball !== null) {
        // Add a separator
        const separator = document.createElement('span');
        separator.textContent = '|';
        separator.className = 'separator';
        gameLine.appendChild(separator);

        // Add the Powerball
        const powerBallElement = document.createElement('span');
        powerBallElement.textContent = String(powerball).padStart(2, '0');
        powerBallElement.className = 'ball power-ball';
        gameLine.appendChild(powerBallElement);
    }
    
    // Append the entire game line to the results area
    resultsDiv.appendChild(gameLine);
}

// --- MASTER FUNCTION TO HANDLE ALL GENERATION ---
function generateAllGames() {
    const game = document.getElementById('lottoGame').value;
    const gameCountInput = document.getElementById('gameCount');
    const resultsDiv = document.getElementById('results');
    
    const numberOfGames = parseInt(gameCountInput.value);

    // Basic Input Validation
    if (isNaN(numberOfGames) || numberOfGames < 1 || numberOfGames > 50) {
        resultsDiv.innerHTML = '<p style="color:red; text-align:center;">Please enter a valid number of games (1-50).</p>';
        return;
    }

    // Clear previous results before starting the loop
    resultsDiv.innerHTML = ''; 

    // LOOP: Run the display function for the requested number of times
    for (let i = 1; i <= numberOfGames; i++) {
        displayGameLine(game, i, resultsDiv);
    }
}

// Attach the master function to the button click event
document.getElementById('generateBtn').addEventListener('click', generateAllGames);