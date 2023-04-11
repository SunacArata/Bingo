'use strict';

{
    const currentNumber = document.getElementById('current-number');
    const startButton = document.getElementById('start-button');
    const result = document.getElementById('result');

    const from = 1;
    const to = 84;
    const lotteryNumbers = [];

    const resetLotteryNumbers = nums => {
        for (let i = from; i <= to; i++) {
            nums.push(i);
        }
    };
    resetLotteryNumbers(lotteryNumbers);

    const fragment = document.createDocumentFragment();
    let row;

    lotteryNumbers.forEach((num, index) => {
        if (index % 15 === 0) {
            row = fragment.appendChild(document.createElement('div'));
            row.classList.add('row');
        }

        const column = document.createElement('div');
        column.textContent = num;
        column.classList.add('column');

        row.appendChild(column);
    });

    result.appendChild(fragment);

    const resetBingo = () => {
        currentNumber.textContent = '?';
        startButton.textContent = 'Go!!';

        const hits = result.querySelectorAll('.hit');
        hits.forEach(hit => {
            hit.classList.remove('hit');
        });

        resetLotteryNumbers(lotteryNumbers);
    };

    startButton.addEventListener('click', () => {
        const randomNumber = Math.floor(Math.random() * lotteryNumbers.length);
        const winningNumber = lotteryNumbers.splice(randomNumber, 1);

        if (lotteryNumbers.length === 0) {
            startButton.textContent = 'Reset';
        }

        if (winningNumber.length === 0) {
            resetBingo();
            return;
        }

        currentNumber.textContent = winningNumber[0];

        const columns = result.querySelectorAll('.column');
        columns[winningNumber[0] - 1].classList.add('hit');
    });
}
