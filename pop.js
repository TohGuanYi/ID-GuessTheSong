startButton = document.getElementById('startButton')
nextButton = document.getElementById('nextButton')
questionContaineraElement = document.getElementById('questionContainer')
questionElement = document.getElementById('question')
answerButtonElement = document.getElementById('answerButton')

let shuffledQuestions, currentQuestionIndex

startButton.addEventListener('click',startGame)
nextButton.addEventListener('click',() => {
    currentQuestionIndex++
    nextQuestion()
})

function startGame() {
    console.log('started')
    startButton.classList.add('hide')
    shuffledQuestions = questions.sort(() => Math.random() - .5)
    currentQuestionIndex = 0
    questionContaineraElement.classList.remove('hide')
    nextQuestion()
}

function nextQuestion() {
    resetState()
    showQuestion(shuffledQuestions[currentQuestionIndex])
}

function showQuestion(question){
    questionElement.innerText = question.question
    question.answer.forEach(answer => {
        button = document.createElement('btn')
        button.innerText = answer.text
        button.classList.add('gameButton')
        if (answer.correct){
            button.dataset.correct = answer.correct
        }
        button.addEventListener('click', selectAnswer)
        answerButtonElement.appendChild(button)
    })
}

function resetState(){
    clearStatusClass(document.body)
    nextButton.classList.add('hide')
    while (answerButtonElement.firstChild){
        answerButtonElement.removeChild(answerButtonElement.firstChild)
    }
}

function selectAnswer(i){
    selectButton = i.target
    correct = selectButton.dataset.correct
    setStatusClass(document.body, correct)
    Array.from(answerButtonElement.children).forEach(button => {
        setStatusClass(button,button.dataset.correct)
    })
    if (shuffledQuestions.length>currentQuestionIndex + 1){
        nextButton.classList.remove('hide')
    }
    else{
        startButton.innerText = 'Restart'
        startButton.classList.remove('hide')
    }
}

function setStatusClass(element, correct){
    clearStatusClass(element)
    if (correct){
        element.classList.add('correct')
    }
    else{
        element.classList.add('wrong')
    }
}

function clearStatusClass(element){
    element.classList.remove('correct')
    element.classList.remove('wrong')
}

questions = [
    {
        question: "What is the name of the song?",
        answer: [
            { text: 'W', correct:true},
            { text: 'L', correct:false},
            { text: 'L', correct:false},
            { text: 'L', correct:false}
        ]
    },
    {
        question: "Who is the artist of this song?",
        answer: [
            { text: 'L', correct:false},
            { text: 'W', correct:true},
            { text: 'L', correct:false},
            { text: 'L', correct:false}
        ]
    },
    {
        question: "Which group sang this song?",
        answer: [
            { text: 'Wrong', correct:false},
            { text: 'Wrong', correct:false},
            { text: 'Wrong', correct:false},
            { text: 'Correct', correct:true}
        ]
    },
    {
        question: "Why did the chicken cross the road?",
        answer: [
            { text: 'Dumb', correct:false},
            { text: 'Stupid', correct:false},
            { text: 'W', correct:true},
            { text: 'Idiot', correct:false},
        ]
    },
    {
        question: "Why?",
        answer: [
            { text: 'L', correct:false},
            { text: 'W', correct:true},
            { text: 'L', correct:false},
            { text: 'L', correct:false},
        ]
    },
]