// ALL answer options
const option1 = document.querySelector('.option1'),
    option2 = document.querySelector('.option2'),
    option3 = document.querySelector('.option3'),
    option4 = document.querySelector('.option4');

// ALL our options
const optionElements = document.querySelectorAll('.option');

const question = document.getElementById('question'); //вопрос

const numOfQuestion = document.getElementById('number-of-question'), //номер вопроса
    numOfAllQuestions = document.getElementById('number-of-all-questions') // количество всех вопросов

let indexOfQuestion, // индекс текущего вопроса
    indexOfPage = 0; // индекс страницы

const answersTracker = document.getElementById('answers-tracker'); //обертка для трекера
const btnNext = document.getElementById('btn-next'); // кнопка далее

let score = 0; // итоговый результат викторины

const correctAnswer = document.getElementById('correct-answer'), // количество правильных ответов
    numberOfAllQuestions2 = document.getElementById('number-of-all-questions-2'), // количество всех вопросов (в модальном окне)
    btnTryAgain = document.getElementById('btn-try-again'); // начать викторину заново

const questions = [
  {
  question: 'Javascript это:',
  options: [
    'Хирургический инструмент',
    'Язык программирования ',
    'Метод языка программирования Java',
    'Звук открывания ржавой консервы',
  ], 
  rightAnswer: 1,
},
{
  question: 'Результат выражения "2" - 7',
  options: [
    '27',
    '137',
    '-5',
    'null',
  ], 
  rightAnswer: 2,
},
{
  question: 'На Javascript нельзя писать:',
  options: [
    'Игры',
    'Скрипты для сайтов',
    'Десктопные приложения',
    '4K видео',
    
  ], 
  rightAnswer: 3,
},
];

numOfAllQuestions.innerHTML = questions.length; // выводим количество вопросов

const load = () => {
  question.innerHTML = questions[indexOfQuestion].question; //сам вопрос

  // мапим ответы
  option1.innerHTML = questions[indexOfQuestion].options[0];
  option2.innerHTML = questions[indexOfQuestion].options[1];
  option3.innerHTML = questions[indexOfQuestion].options[2];
  option4.innerHTML = questions[indexOfQuestion].options[3];

  numOfQuestion.innerHTML = indexOfPage + 1; // установка номера текущей страницы
  indexOfPage++; // увеличение индекса страницы
};

let completedAnswers = []; // массив для уже заданных вопросов

const randomQuestion = () => {
  let randomNumber = Math.floor(Math.random() * questions.length);
  let hitDuplicate = false; // якорь для проверки одинаковых вопросов

  if(indexOfPage === questions.length) {
    quizOver();
  } else {
    if(completedAnswers.length > 0) {
      completedAnswers.forEach((item) => {
        if(item === randomNumber) {
          hitDuplicate = true;
        }
      });
      if(hitDuplicate) {
        randomQuestion();
      } else {
        indexOfQuestion = randomNumber;
        load();
      }
    }
    if(completedAnswers.length == 0) {
      indexOfQuestion = randomNumber;
        load();
    }
  }
  completedAnswers.push(indexOfQuestion);
};

function checkAnswer(el) {
  if(el.target.dataset.id == questions[indexOfQuestion].rightAnswer) {
    el.target.classList.add('correct');
    upadteAnswerTracker('correct');
    score++;
  } else {
    el.target.classList.add('wrong');
    upadteAnswerTracker('wrong');
  }
  disabledOptions();
}

for(option of optionElements) {
  option.addEventListener('click', e => checkAnswer(e));
}

const disabledOptions = () => {
  optionElements.forEach((item) =>{
    item.classList.add('disabled');
    if(item.dataset.id ==questions[indexOfQuestion].rightAnswer) {
      item.classList.add('correct');
    }
  })
}

// Удаление всех классов со всех ответов
const enableOptions = () => {
  optionElements.forEach(item => {
    item.classList.remove('disabled', 'correct', 'wrong')
  })
}

const answerTracker = () => {
  questions.forEach(() => {
    const div = document.createElement('div');
    answersTracker.appendChild(div);
  })
}

const upadteAnswerTracker = status => {
  answersTracker.children[indexOfPage-1].classList.add(`${status}`);

}
const validate = () => {
  if(!optionElements[0].classList.contains('disabled')) {
    alert('Опрос так-то нужно пройти, это не цацки-пецки!');
  } else {
    randomQuestion();
    enableOptions();
  }
}
const quizOver = () => {
  document.querySelector('.quiz-over-modal').classList.add('active');
  correctAnswer.innerHTML = score;
  numberOfAllQuestions2.innerHTML = questions.length;
}

const tryArain = () => {
  window.location.reload();
}

btnTryAgain.addEventListener('click', tryArain);

btnNext.addEventListener('click', ()=>{
  validate()
})

window.addEventListener('load', ()=> {
  randomQuestion();
  answerTracker();
});


console.log('2'-7);