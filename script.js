const canvas = document.getElementById("gameCanvas");
const context = canvas.getContext("2d");

const box = 20;
let snake = [];
snake.push({ x: 9 * box, y: 10 * box }); // Mejorado para usar push

let apple = {
    // Generación más robusta de la manzana usando las dimensiones del canvas
    x: Math.floor(Math.random() * (canvas.width / box - 1) + 1) * box,
    y: Math.floor(Math.random() * (canvas.height / box - 1) + 1) * box
};

let direction;
let score = 0;

document.addEventListener("keydown", changeDirection);

document.getElementById("up").onclick = () => direction = "UP";
document.getElementById("down").onclick = () => direction = "DOWN";
document.getElementById("left").onclick = () => direction = "LEFT";
document.getElementById("right").onclick = () => direction = "RIGHT";

function changeDirection(event) {
    if (event.keyCode === 37 && direction !== "RIGHT") direction = "LEFT";
    else if (event.keyCode === 38 && direction !== "DOWN") direction = "UP";
    else if (event.keyCode === 39 && direction !== "LEFT") direction = "RIGHT";
    else if (event.keyCode === 40 && direction !== "UP") direction = "DOWN";
}

function draw() {
    context.clearRect(0, 0, canvas.width, canvas.height);

    for (let i = 0; i < snake.length; i++) {
        context.fillStyle = i === 0 ? "darkgreen" : "lightgreen";
        context.fillRect(snake[i].x, snake[i].y, box, box);
    }

    context.fillStyle = "red";
    context.fillRect(apple.x, apple.y, box, box);

    let snakeX = snake[0].x;
    let snakeY = snake[0].y;

    if (direction === "LEFT") snakeX -= box;
    if (direction === "UP") snakeY -= box;
    if (direction === "RIGHT") snakeX += box;
    if (direction === "DOWN") snakeY += box;

    if (snakeX === apple.x && snakeY === apple.y) {
        score++;
        // Actualiza el texto del elemento de puntuación
        document.getElementById("scoreDisplay").innerText = "Puntuación: " + score;
        apple = {
            // Generación más robusta de la manzana
            x: Math.floor(Math.random() * (canvas.width / box - 1) + 1) * box,
            y: Math.floor(Math.random() * (canvas.height / box - 1) + 1) * box
        };
    } else {
        snake.pop();
    }

    const newHead = { x: snakeX, y: snakeY };

    if (snakeX < 0 || snakeY < 0 || snakeX >= canvas.width || snakeY >= canvas.height || collision(newHead, snake)) {
        clearInterval(game);
        // Opcional: Aquí podrías añadir un mensaje de "Juego Terminado" o un botón de "Reiniciar"
        // Por ejemplo: alert("¡Juego Terminado! Tu puntuación fue: " + score);
    }

    snake.unshift(newHead);
}

function collision(head, body) {
    for (let i = 0; i < body.length; i++) {
        if (head.x === body[i].x && head.y === body[i].y) {
            return true;
        }
    }
    return false;
}

const game = setInterval(draw, 100);
