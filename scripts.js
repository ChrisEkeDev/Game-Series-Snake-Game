document.addEventListener('DOMContentLoaded', () => {
    const gameSquares = document.querySelectorAll('.game_square');
    const gameScore = document.getElementById('score');
    const finalScore = document.getElementById('final_score');
    const startGameBtn = document.getElementById('start_btn');
    let gameOver = document.getElementById('game_over');
    const gameOverBtn = document.getElementById('restart_btn');

    const width = 10;
    let currentIndex = 0;
    let appleIndex = 0;
    let snake = [2,1,0]; // 2 = Head, 0 = Tail, 1 = Body
    let direction = 1;
    let score = 0;
    let speed = 0.9;
    let intervalTime = 0;
    let interval = 0;

    function startGame() {
        snake.forEach(index => gameSquares[index].classList.remove('snake'));
        gameSquares[appleIndex].classList.remove('apple');
        clearInterval(interval);
        score = 0;
        randomApple();
        direction = 1;
        gameScore.innerText = score;
        intervalTime = 1000;
        snake = [2,1,0];
        currentIndex = 0
        snake.forEach(index => gameSquares[index].classList.add('snake'));
        interval = setInterval(moveOutcomes, intervalTime)
    }


    function moveOutcomes() {
        if (
            (snake[0] + width >= (width * width)) && (direction === width ) || // if snake hits the bottom
            (snake[0] % width === width - 1 && direction === 1) || /// if snake hits the right wall
            (snake[0] % width === 0 && direction === -1 ) || // If the snake hits the lft wall
            (snake[0] - width < 0 && direction === -width) ||
            gameSquares[snake[0] + direction].classList.contains('snake') // If the snake hits the top wall
        )   {
            // this will end the game
            clearInterval(interval);
            gameOver.style.display = 'flex';
            finalScore.textContent = score;
            return
        }

        const tail = snake.pop(); // Remove tail of the snake and shows it
        gameSquares[tail].classList.remove('snake'); // Removes the class of snake from the tail
        snake.unshift(snake[0] + direction); //gives direction to the head of the snake (array)

        if (gameSquares[snake[0]].classList.contains('apple')) {
            gameSquares[snake[0]].classList.remove('apple');
            gameSquares[tail].classList.add('snake');
            snake.push(tail);
            randomApple();
            score++;
            gameScore.textContent = score;
            clearInterval(interval);
            intervalTime = intervalTime * speed;
            interval = setInterval(moveOutcomes, intervalTime)
        }

        gameSquares[snake[0]].classList.add('snake');
    }

    function randomApple() {
        do {
            appleIndex = Math.floor(Math.random() * gameSquares.length)
        } while (gameSquares[appleIndex].classList.contains('snake'))
        gameSquares[appleIndex].classList.add('apple');
    }


    function controlSnake(e) {
        gameSquares[currentIndex].classList.remove('snake');
        if (e.keyCode === 39) {
            direction = 1; // If we press right, the snak will go right one div
        } else if (e.keyCode === 38) {
            direction = -width; // If we press up, the snake will go back ten divs, appearing to go up
        } else if (e.keyCode === 37) {
            direction = -1; // If we press left, snake head will go left 1 div
        } else if (e.keyCode === 40) {
            direction = +width; // If we press down, snake head will appear in the div 10 divs from current position
        }
    }

    document.addEventListener('keyup', controlSnake);
    startGameBtn.addEventListener('click', startGame);
    gameOverBtn.addEventListener('click', function() {
        window.location.reload();
    })
})
