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
        song: 'songs/Pop/BlindingLights.mp3',
        question: 'Which artist sang this song?', /*Blinding Lights*/
        answer: [
            { text: 'The Weekend', correct:true},
            { text: 'Shawn Mendes', correct:false},
            { text: 'Harry Styles', correct:false},
            { text: 'Ed Sheeran', correct:false}
        ]
    },
    {
        song: 'songs/Pop/Levitating.mp3',
        question: "What is the name of the song?", /*Levitating*/
        answer: [
            { text: 'Dont Start Now', correct:false},
            { text: 'Levitating', correct:true},
            { text: 'Physical', correct:false},
            { text: 'Break My Heart', correct:false}
        ]
    },
    {
        song: 'songs/Pop/Stay.mp3',
        question: "Which artist sang this song?", /*Stay*/
        answer: [
            { text: 'Justin Timberlake', correct:false},
            { text: 'Bruno Mars', correct:false},
            { text: 'Charlie Puth', correct:false},
            { text: 'Justin Bieber', correct:true}
        ]
    },
    {
        song: 'songs/Pop/WatermelonSugar.mp3',
        question: "Which artist sang this song?", /*Watermelon Sugar*/
        answer: [
            { text: 'John Legend', correct:false},
            { text: 'Nick Jonas', correct:false},
            { text: 'Harry Styles', correct:true},
            { text: 'Zayn', correct:false}
        ]
    },
    {
        song: 'songs/Pop/Good4u.mp3',
        question: "Which artist sang this song?", /*Good 4 u*/
        answer: [
            { text: 'Ariana Grande', correct:false},
            { text: 'Olivia Rodrigo', correct:true},
            { text: 'Taylor Swift', correct:false},
            { text: 'Billie Eilish', correct:false}
        ]
    },
    {
        song: 'songs/Pop/CheatingOnYou.mp3',
        question: "What is the name of the song?", /*Cheating On You*/
        answer: [
            { text: 'See You Again', correct:false},
            { text: 'Cheating On You', correct:true},
            { text: 'Attention', correct:false},
            { text: 'Done For Me', correct:false}
        ]
    },
    {
        song: 'songs/Pop/BadHabits.mp3',
        question: "What is the name of the song?", /*Bad Habits*/
        answer: [
            { text: 'Perfect', correct:false},
            { text: 'Bad Habits', correct:true},
            { text: 'Shape Of You', correct:false},
            { text: 'Photograph', correct:false}
        ]
    },
    {
        song: 'songs/Pop/OverAgain.mp3',
        question: "What is the name of the song?", /*Over Again*/
        answer: [
            { text: 'Last First Kiss', correct:false},
            { text: 'DONDA', correct:false},
            { text: 'One Thing', correct:false},
            { text: 'Over Again', correct:true}
        ]
    },
    {
        song: 'songs/Pop/StuckWithU.mp3',
        question: "What is the name of the song?", /*StuckWithU*/
        answer: [
            { text: 'Sorry', correct:false},
            { text: 'Stuck With U', correct:true},
            { text: 'Bad Blood', correct:false},
            { text: 'Love Yourself', correct:false}
        ]
    },
    {
        song: 'songs/Pop/IntoYou.mp3',
        question: "Which artist sang this song?", /*Into You*/
        answer: [
            { text: 'Ariana Grande', correct:true},
            { text: 'Nicki Minaj', correct:false},
            { text: 'Taylor Swift', correct:false},
            { text: 'Carly Rae Jepsen', correct:false}
        ]
    },
]