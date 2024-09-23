document.addEventListener('DOMContentLoaded', () => {
    const numbers = [...Array(12).keys()].map(i => i + 1);
    shuffle(numbers);
    let currentIndex = 0;
    let currentQuestion = numbers[currentIndex];

    const questionEl = document.getElementById('question');
    const answerInput = document.getElementById('answer');
    const submitButton = document.getElementById('submit-answer');
    const feedbackEl = document.getElementById('feedback');
    const nextButton = document.getElementById('next-question');

    function askQuestion() {
        questionEl.textContent = `What is 9 x ${currentQuestion}?`;
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
        const correctAnswer = 9 * currentQuestion;

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
            currentQuestion = numbers[currentIndex];
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

    submitButton.addEventListener('click', checkAnswer);
    nextButton.addEventListener('click', nextQuestion);

    askQuestion();
});

