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
        song: 'songs/Jpop/Ghost.mp3',
        question: "What is the name of the song?", 
        answer: [
            { text: 'GHOST', correct:true},
            { text: 'Monster', correct:false},
            { text: 'Odo', correct:false},
            { text: 'Shutter', correct:false}
        ]
    },
    {
        song: 'songs/Jpop/Gunjou.mp3',
        question: "What is the name of the song?", 
        answer: [
            { text: 'Akeboshi', correct:false},
            { text: 'Gunjou', correct:true},
            { text: 'Marigold', correct:false},
            { text: 'Homura', correct:false}
        ]
    },
    {
        song: 'songs/Jpop/Gurenge.mp3',
        question: "Which artist sang this song?",
        answer: [
            { text: 'Ado', correct:false},
            { text: 'LiSA', correct:true},
            { text: 'E ve', correct:false},
            { text: 'Official HIGE DANdism', correct:false}
        ]
    },
    {
        song: 'songs/Jpop/Kataomoi.mp3',
        question: "Which artist sang this song?", 
        answer: [
            { text: 'Aimer', correct:true},
            { text: 'back number', correct:false},
            { text: 'Yuuri', correct:false},
            { text: 'YOASOBI', correct:false}
        ]
    },
    {
        song: 'songs/Jpop/Saikai.mp3',
        question: "What is the name of this song?", 
        answer: [
            { text: 'Leo', correct:false},
            { text: 'Suiheisen', correct:false},
            { text: 'Saikai', correct:true},
            { text: 'Cry Baby', correct:false}
        ]
    },
]