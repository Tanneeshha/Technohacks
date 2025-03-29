document.addEventListener("DOMContentLoaded", () => {
    const quizData = [
        { question: "What is the capital of France?", options: ["London", "Berlin", "Paris", "Madrid"], correctAnswer: 2 },
        { question: "Which planet is known as the Red Planet?", options: ["Earth", "Mars", "Jupiter", "Venus"], correctAnswer: 1 },
        { question: "What is the largest mammal in the world?", options: ["Elephant", "Giraffe", "Blue Whale", "Polar Bear"], correctAnswer: 2 },
        { question: "Which of these elements has the chemical symbol 'O'?", options: ["Gold", "Oxygen", "Iron", "Silver"], correctAnswer: 1 },
        { question: "Who wrote 'Romeo and Juliet'?", options: ["Charles Dickens", "Jane Austen", "William Shakespeare", "Mark Twain"], correctAnswer: 2 }
    ];

    let currentQuestion = 0;
    let score = 0;
    let userAnswers = new Array(quizData.length).fill(-1);
    
    const questionText = document.getElementById('question-text');
    const optionsList = document.getElementById('options-list');
    const prevButton = document.getElementById('prev-btn');
    const nextButton = document.getElementById('next-btn');
    const currentQuestionSpan = document.getElementById('current-question');
    const totalQuestionsSpan = document.getElementById('total-questions');
    const progressBar = document.getElementById('progress');
    const resultContainer = document.getElementById('result');
    const quizBody = document.querySelector('.quiz-body');
    const scoreDisplay = document.getElementById('score');
    const resultDetails = document.getElementById('result-details');
    const restartButton = document.getElementById('restart-btn');

    function initQuiz() {
        totalQuestionsSpan.textContent = `/${quizData.length}`;
        loadQuestion();
        updateProgress();
    }

    function loadQuestion() {
        const question = quizData[currentQuestion];
        questionText.textContent = question.question;
        optionsList.innerHTML = '';

        question.options.forEach((option, index) => {
            const li = document.createElement('li');
            li.className = 'option';
            li.textContent = option;
            li.dataset.index = index;
            
            if (userAnswers[currentQuestion] === index) {
                li.classList.add('selected');
            }
            
            li.addEventListener('click', () => selectOption(index));
            optionsList.appendChild(li);
        });
        
        prevButton.disabled = currentQuestion === 0;
        nextButton.textContent = currentQuestion === quizData.length - 1 ? 'Finish' : 'Next';
        currentQuestionSpan.textContent = currentQuestion + 1;
    }

    function selectOption(optionIndex) {
        userAnswers[currentQuestion] = optionIndex;
        document.querySelectorAll('.option').forEach((option, index) => {
            option.classList.toggle('selected', index === optionIndex);
        });
    }

    function handleNext() {
        if (currentQuestion < quizData.length - 1) {
            currentQuestion++;
            loadQuestion();
            updateProgress();
        } else {
            showResults();
        }
    }

    function handlePrevious() {
        if (currentQuestion > 0) {
            currentQuestion--;
            loadQuestion();
            updateProgress();
        }
    }

    function updateProgress() {
        progressBar.style.width = `${((currentQuestion + 1) / quizData.length) * 100}%`;
    }

    function calculateScore() {
        return userAnswers.filter((answer, index) => answer === quizData[index].correctAnswer).length;
    }

    function showResults() {
        quizBody.style.display = 'none';
        resultContainer.style.display = 'block';
        
        score = calculateScore();
        scoreDisplay.textContent = `${score}/${quizData.length}`;
        resultDetails.textContent = `You answered ${score} out of ${quizData.length} questions correctly.`;
    }

    function restartQuiz() {
        currentQuestion = 0;
        userAnswers.fill(-1);
        quizBody.style.display = 'block';
        resultContainer.style.display = 'none';
        loadQuestion();
        updateProgress();
    }

    nextButton.addEventListener('click', handleNext);
    prevButton.addEventListener('click', handlePrevious);
    restartButton.addEventListener('click', restartQuiz);
    
    initQuiz();
});
