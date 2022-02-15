startButton = document.getElementById('start-button')
nextButton = document.getElementById('next-button')
questionContaineraElement = document.getElementById('question-container')
questionElement = document.getElementById('question')
answerButtonElement = document.getElementById('answer-button')

let shuffledQuestions, currentQuestionIndex

startButton.addEventListener('click',startGame)
nextButton.addEventListener('click',() => {
    currentQuestionIndex++
    nextQuestion()
})

function startGame() {
    console.log('started')
    startButton.classList.add('hide')
    shuffledQuestions = quesions.sort(() => Math.random() - .5)
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
        const button = document.createElement('button')
        button.innerText.add('button')
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
    Array.from(answerButtonsElement.children).forEach(button => {
        setStatusClass(button,button.dataset.correct)
    })
    if (shuffledQuestions.length>currentQuestionIndex + 1){
        nextButton.classList.remove('hide')
    }
    else{
        startButton.innerText = 'Restart'
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
        question: "What is the song's name?",
        answer: [
            { text: 'W', correct:true},
            { text: 'L', correct:false},
            { text: 'L', correct:false},
            { text: 'L', correct:false},
        ]
    }
]