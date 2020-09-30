const startButton = document.getElementById('start-btn')
const nextButton = document.getElementById('next-btn')
const questionContainerElement = document.getElementById('question-container')
const questionElement = document.getElementById('question')
const answerButtonsElement = document.getElementById('answer-buttons')
const hsButton = document.getElementById("hs-btn")
var rightAnswers = document.getElementById("right-answers")
let shuffledQuestions, currentQuestionIndex
var countRightAnswers = 0;
var sec = 10;

alert("Welcome to the Jurassic Park Movie Quiz! See if you can make it to the end! There are 10 questions and 10 seconds on the clock. Correct answers add 5 seconds and incorrect take 3 away.")

hsButton.addEventListener("click", () => {
  alert("High Scores: " + JSON.stringify(localStorage));
})

function gameEnd(){
   var hsname = prompt("What's your Name?")
   localStorage.setItem(hsname, countRightAnswers);
   document.location.reload()
}


startButton.addEventListener('click', startGame)
nextButton.addEventListener('click', () => {
  currentQuestionIndex++
  setNextQuestion()
})

function startGame() {
    
    var time = setInterval(myTimer, 1000);
    function myTimer() {
        document.getElementById('timer').innerHTML = sec + "sec left";
        sec--;
        if (sec == -1 || sec < -1) {
            clearInterval(time);
            $("#question-container").empty();
            $("#question-container").append("<h1> Quiz ended with a score of: " + countRightAnswers)
            setTimeout(() => {  gameEnd(); }, 2000);
        }
    }
  startButton.classList.add('hide')
  hsButton.classList.add('hide')
  rightAnswers.classList.remove('hide')
  shuffledQuestions = questions.sort(() => Math.random() - .5)
  currentQuestionIndex = 0
  questionContainerElement.classList.remove('hide')
  setNextQuestion()
}

function setNextQuestion() {
  resetState()
  showQuestion(shuffledQuestions[currentQuestionIndex])
}

function showQuestion(question) {
  questionElement.innerText = question.question
  question.answers.forEach(answer => {
    const button = document.createElement('button')
    button.innerText = answer.text
    button.classList.add('btn')
    if (answer.correct) {
      button.dataset.correct = answer.correct
    }
    button.addEventListener('click', selectAnswer)
    answerButtonsElement.appendChild(button)
  })
}

function resetState() {
  nextButton.classList.add('hide')
  while (answerButtonsElement.firstChild) {
    answerButtonsElement.removeChild(answerButtonsElement.firstChild)
  }
}

function selectAnswer(e) {
  const selectedButton = e.target
  const correct = selectedButton.dataset.correct
  Array.from(answerButtonsElement.children).forEach(button => {
    setStatusClass(button, button.dataset.correct)
  })
  if (selectedButton.dataset = correct) {
    countRightAnswers ++;
    sec += 5;
 }else {
   sec -= 3;
 }

  if (shuffledQuestions.length > currentQuestionIndex + 1) {
    nextButton.classList.remove('hide')
  } else {
    $("#question-container").empty();
    $("#question-container").append("<h1> Quiz ended with a score of: " + countRightAnswers)
    setTimeout(() => {  gameEnd(); }, 2000);
  }
 
}



function setStatusClass(element, correct) {
  clearStatusClass(element)
  if (correct) {
    element.classList.add('correct')
  } else {
    element.classList.add('wrong')
  }
}

function clearStatusClass(element) {
  element.classList.remove('correct')
  element.classList.remove('wrong')
}

const questions = [
  {
    question: 'What is the name of the fictional island Jurassic Park is situated on?',
    answers: [
      { text: 'Isla Nublar', correct: true },
      { text: 'Puerto Rico', correct: false },
      { text: 'Isla Puba', correct: false },
      { text: 'Oahu', correct: false },
    ]
  },
  {
    question: 'What type of DNA was used to help clone the dinosaurs in Jurassic Park?',
    answers: [
      { text: 'Frogs', correct: true },
      { text: 'Birds', correct: false },
      { text: 'Salamanders', correct: false },
      { text: 'Alligators', correct: false }
    ]
  },
  {
    question: 'What year was the original Jurassic Park released?',
    answers: [
      { text: '1989', correct: false },
      { text: '1995', correct: false },
      { text: '2000', correct: false },
      { text: '1993', correct: true }
    ]
  },
  {
    question: 'Who directed Jurassic Park',
    answers: [
      { text: 'Quentin Tarentino', correct: false },
      { text: 'Martin Scorsese', correct: false },
      { text: 'Stanley Kubrick', correct: false },
      { text: 'Steven Spielberg', correct: true }
    ]
  },
  {
    question: 'How long is Jurassic Park?',
    answers: [
      { text: '90 Minutes', correct: false },
      { text: '126 Minutes', correct: true },
      { text: '200 Minutes', correct: false },
      { text: '240 Minutes', correct: false }
    ]
  },
  {
    question: 'What does Dennis Nedry use to attempt to smuggle the embryos off Jurassic Park?',
    answers: [
      { text: 'Pringles Can', correct: false },
      { text: 'Back Pack', correct: false },
      { text: 'Fanny Pack', correct: false },
      { text: 'Shaving Cream Can', correct: true }
    ]
  },
  {
    question: 'Who was the Jurassic Parks programmer?',
    answers: [
      { text: 'Neil McKenzie', correct: false },
      { text: 'Dennis Nedry', correct: true },
      { text: 'Larry Bird', correct: false },
      { text: 'Mark Hamill', correct: false }
    ]
  },
  {
    question: 'Jurassic park is based on a book by the same title written by:',
    answers: [
      { text: 'Stephen King', correct: false },
      { text: 'J.K. Rowling', correct: false },
      { text: 'Michael Crichton', correct: true },
      { text: 'J.R.R. Tolkein', correct: false }
    ]
  },
  {
    question: 'Who composed the music for Jurassic Park?',
    answers: [
      { text: 'Trent Reznor', correct: false },
      { text: 'John Williams', correct: true },
      { text: 'Hans Zimmer', correct: false },
      { text: 'Daft Punk', correct: false }
    ]
  },
  {
    question: 'Who played Dr. Ian Malcolm',
    answers: [
      { text: 'Sam Neill', correct: false },
      { text: 'Wayne Knight', correct: false },
      { text: 'Jeff Goldblum', correct: true },
      { text: 'B.D. Wong', correct: false }
    ]
  }
]



