document.addEventListener('DOMContentLoaded', () => {
    const setupContainer = document.getElementById('setup-container');
    const questionContainer = document.getElementById('question-container');
    const tableNumberInput = document.getElementById('table-number');
    const startQuizButton = document.getElementById('start-quiz');

    const questionEl = document.getElementById('question');
    const answerInput = document.getElementById('answer');
    const submitButton = document.getElementById('submit-answer');
    const feedbackEl = document.getElementById('feedback');
    const nextButton = document.getElementById('next-question');

    let numbers = [];
    let currentIndex = 0;
    let tableNumber = 1;

    function askQuestion() {
        const currentQuestion = numbers[currentIndex];
        questionEl.textContent = `What is ${tableNumber} x ${currentQuestion}?`;
        answerInput.value = '';
        answerInput.focus();
    }

    function shuffle(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    }

    function checkAnswer() {
        const userAnswer = parseInt(answerInput.value, 10);
        const correctAnswer = tableNumber * numbers[currentIndex];

        if (userAnswer === correctAnswer) {
            feedbackEl.textContent = 'Correct!';
            feedbackEl.style.color = 'green';
        } else {
            feedbackEl.textContent = `Wrong! The correct answer is ${correctAnswer}.`;
            feedbackEl.style.color = 'red';
        }
        submitButton.style.display = 'none';
        nextButton.style.display = 'inline';
    }

    function nextQuestion() {
        currentIndex++;
        if (currentIndex < numbers.length) {
            askQuestion();
            feedbackEl.textContent = '';
            submitButton.style.display = 'inline';
            nextButton.style.display = 'none';
        } else {
            feedbackEl.textContent = 'Great job! You answered all questions!';
            questionEl.textContent = '';
            answerInput.style.display = 'none';
            submitButton.style.display = 'none';
            nextButton.style.display = 'none';
        }
    }

    startQuizButton.addEventListener('click', () => {
        tableNumber = parseInt(tableNumberInput.value, 10);
        if (tableNumber >= 1 && tableNumber <= 9) {
            numbers = [...Array(12).keys()].map(i => i + 1);
            shuffle(numbers);
            currentIndex = 0;

            setupContainer.style.display = 'none';
            questionContainer.style.display = 'block';

            askQuestion();
        } else {
            alert('Please enter a number between 1 and 9.');
        }
    });

    submitButton.addEventListener('click', checkAnswer);
    nextButton.addEventListener('click', nextQuestion);
});
