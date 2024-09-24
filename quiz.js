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
    const timerEl = document.createElement('p');
    const logEl = document.createElement('div'); // Element to display log

    let numbers = [];
    let currentIndex = 0;
    let tableNumber = 1;
    let wrongAnswers = [];
    let timer;
    let timeLeft = 90; // 90 seconds

    questionContainer.insertBefore(timerEl, questionEl); // Add timer display above the question
    questionContainer.appendChild(logEl); // Add log display below the questions
    logEl.style.marginTop = '20px'; // Styling for log display

    function startTimer() {
        timerEl.textContent = `Time left: ${timeLeft} seconds`;
        timer = setInterval(() => {
            timeLeft--;
            timerEl.textContent = `Time left: ${timeLeft} seconds`;

            if (timeLeft <= 30) {
                timerEl.style.color = 'red'; // Change to red when 30 seconds are left
            }

            if (timeLeft <= 0) {
                clearInterval(timer);
                endQuiz();
            }
        }, 1000);
    }

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
            wrongAnswers.push(`${tableNumber} x ${numbers[currentIndex]} = ${correctAnswer}`); // Log incorrect answer
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
        } else if (wrongAnswers.length > 0) {
            // Re-ask wrong answers
            numbers = wrongAnswers.map(answer => parseInt(answer.split(' ')[2], 10)); // Extract the questions from wrong answers
            wrongAnswers = [];
            currentIndex = 0;
            shuffle(numbers);
            askQuestion();
            feedbackEl.textContent = '';
            submitButton.style.display = 'inline';
            nextButton.style.display = 'none';
        } else {
            endQuiz();
        }
    }

    function endQuiz() {
        clearInterval(timer);
        feedbackEl.textContent = timeLeft <= 0
            ? 'Your time is up, you need to be faster next time!'
            : 'Great job! You answered all questions correctly!';
        questionEl.textContent = '';
        answerInput.style.display = 'none';
        submitButton.style.display = 'none';
        nextButton.style.display = 'none';
        timerEl.style.display = 'none';

        // Log results
        const logTime = new Date().toLocaleString();
        logEl.innerHTML = `<strong>Quiz Completed:</strong> ${logTime}<br>`;
        if (wrongAnswers.length > 0) {
            logEl.innerHTML += `<strong>Wrong Answers:</strong> <br>${wrongAnswers.join('<br>')}`;
        } else {
            logEl.innerHTML += `<strong>No wrong answers!</strong>`;
        }
    }

    startQuizButton.addEventListener('click', () => {
        tableNumber = parseInt(tableNumberInput.value, 10);
        if (tableNumber >= 1 && tableNumber <= 12) {
            numbers = [...Array(12).keys()].map(i => i + 1);
            shuffle(numbers);
            currentIndex = 0;

            setupContainer.style.display = 'none';
            questionContainer.style.display = 'block';

            startTimer();
            askQuestion();
        } else {
            alert('Please enter a number between 1 and 12.');
        }
    });

    submitButton.addEventListener('click', checkAnswer);
    nextButton.addEventListener('click', nextQuestion);
});
