const PLAYER_SPEED = 5;
const ENEMY_SPEED = 2;
const SPAWN_INTERVAL = 1000; // in milliseconds


let canvas = document.getElementById("gameCanvas");
let ctx = canvas.getContext("2d");
let scoreDisplay = document.getElementById("score");
let score = 0;
let player = {
    x: canvas.width / 2,
    y: canvas.height - 30,
    width: 20,
    height: 20
};
let enemies = [];

// Function to move the player
function movePlayer(event) {
    // Update player position based on arrow key presses
    switch (event.key) {
        case "ArrowUp":
            player.y -= PLAYER_SPEED;
            break;
        case "ArrowDown":
            player.y += PLAYER_SPEED;
            break;
        case "ArrowLeft":
            player.x -= PLAYER_SPEED;
            break;
        case "ArrowRight":
            player.x += PLAYER_SPEED;
            break;
    }
}

// Function to spawn enemies
function spawnEnemy() {
    let enemy = {
        x: canvas.width,
        y: Math.random() * (canvas.height - 20),
        width: 20,
        height: 20
    };
    enemies.push(enemy);
}

// Function to move enemies towards the player
function moveEnemies() {
    enemies.forEach(enemy => {

        //calculates distance between player and enemy
        let dx = player.x - enemy.x;
        let dy = player.y - enemy.y;

        // Calculate the Euclidean distance between the enemy and the player
        let distance = Math.sqrt(dx * dx + dy * dy);

        // Calculate the velocity components in the x and y directions towards the player
        // by dividing the distance by the total distance and multiplying by the enemy speed
        let velocityX = (dx / distance) * ENEMY_SPEED;
        let velocityY = (dy / distance) * ENEMY_SPEED;
        
        // Update the enemy's position by adding the velocity components
        enemy.x += velocityX;
        enemy.y += velocityY;
    });
}

// Function to draw player
function drawPlayer() {
    ctx.beginPath();
    ctx.rect(player.x, player.y, player.width, player.height);
    ctx.fillStyle = "blue";
    ctx.fill();
    ctx.closePath();
}

// Function to draw enemies
function drawEnemies() {
    enemies.forEach(enemy => {
        ctx.beginPath();
        ctx.rect(enemy.x, enemy.y, enemy.width, enemy.height);
        ctx.fillStyle = "red";
        ctx.fill();
        ctx.closePath();
    });
}

// Main draw function
function draw() {
    // Clear the canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    drawPlayer();
    drawEnemies();
    scoreDisplay.textContent = `Score: ${score}`;
}

// Main game loop
setInterval(() => {
    moveEnemies();
    draw();
}, 100);

setInterval(spawnEnemy, SPAWN_INTERVAL);

// Event listener for player movement
document.addEventListener("keydown", movePlayer);