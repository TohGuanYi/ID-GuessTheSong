startButton = document.getElementById('startButton')
nextButton = document.getElementById('nextButton')
homeButton = document.getElementById('homeButton')
questionContaineraElement = document.getElementById('questionContainer')
questionElement = document.getElementById('question')
answerButtonElement = document.getElementById('answerButton')
lottieTimer = document.querySelector("lottie-player");

points = document.getElementById('points')
pointsCount = 0
points.innerText = pointsCount

let shuffledQuestions, currentQuestionIndex, music

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
    lottieTimer.play()
    showQuestion(shuffledQuestions[currentQuestionIndex])
}

function showQuestion(question){
    music = new Audio(question.song);
    music.play()
    questionElement.innerText = question.question
    question.answer.forEach(answer => {
        button = document.createElement('btn')
        button.innerText = answer.text
        button.classList.add('gameButton')
        lottieTimer.addEventListener('complete', selectAnswer)  //Timers up
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
    lottieTimer.stop()
    music.pause()
    selectButton = i.target
    correct = selectButton.dataset.correct
    if (correct){
        pointsCount += 100
        points.innerText = pointsCount
    }
    setStatusClass(document.body, correct)
    Array.from(answerButtonElement.children).forEach(button => {
        setStatusClass(button,button.dataset.correct)
    })
    if (shuffledQuestions.length>currentQuestionIndex + 1){
        nextButton.classList.remove('hide')
    }
    else{
        homeButton.classList.remove('hide')
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
        song: 'songs/KPop/Blueming.mp3',
        question: 'Which artist sang this song?', /*Blueming*/
        answer: [
            { text: 'IU', correct:true},
            { text: 'Taeyeon', correct:false},
            { text: 'Blackpink', correct:false},
            { text: 'HWASA', correct:false}
        ]
    },
    {
        song: 'songs/KPop/AsIfItsYourLast.mp3',
        question: "What is the name of the song?", /*As If It's Your Last*/
        answer: [
            { text: 'DDU-DU DDU-DU', correct:false},
            { text: 'As If It\'s Your Last', correct:true},
            { text: 'Playing With Fire', correct:false},
            { text: 'Ice Cream', correct:false}
        ]
    },
    {
        song: 'songs/KPop/FakeLove.mp3',
        question: "Which artist sang this song?", /*Fake Love*/
        answer: [
            { text: 'EXO', correct:false},
            { text: 'SEVENTEEN', correct:false},
            { text: 'ATEEZ', correct:false},
            { text: 'BTS', correct:true}
        ]
    },
    {
        song: 'songs/KPop/GangnamStyle.mp3',
        question: "What is the name of this song?", /*Gangnam Style*/
        answer: [
            { text: 'Gentleman', correct:false},
            { text: 'MOVE', correct:false},
            { text: 'Gangnam Style', correct:true},
            { text: 'Airplane', correct:false}
        ]
    },
    {
        song: 'songs/KPop/PolaroidLove.mp3',
        question: "Which artist sang this song?", /*PolaroidLove*/
        answer: [
            { text: 'BTS', correct:false},
            { text: 'ENHYPEN', correct:true},
            { text: 'NCT', correct:false},
            { text: 'Stray Kids', correct:false}
        ]
    },
]