(function(){
  // Functions
  function startQuiz(){
    // variable to store the HTML output
    const output = [];

    // for each question...
    myQuestions.forEach(
      (currentQuestion, questionNumber) => {
        // variable to store the list of possible answers
        const answers = [];

        // and for each available answer...
        for(letter in currentQuestion.answers){
          // ...add an HTML radio button
          answers.push(
            `<label>
              <input type="radio" name="question${questionNumber}" value="${letter}">
              ${letter} :
              ${currentQuestion.answers[letter]}
            </label>`
          );
        }

        // add this question and its answers to the output
        output.push(
          `<div class="slide">
            <div class="question"> ${currentQuestion.question} </div>
            <div class="answers"> ${answers.join("")} </div>
          </div>`
        );
      }
    );

    // finally combine our output list into one string of HTML and put it on the page
    quizContainer.innerHTML = output.join('');
    // srat the timer
    countDown();
  }

  function countDown() {
    var timeleft = 60;
    var downloadTimer = setInterval(function(){
      if (timeleft <= 0) {
        clearInterval(downloadTimer);
        alert("Oh no Time's Up! Back to the Start!");
        return window.location.assign("index.html");
      } else if (timeleft === 1) {
        document.getElementById("timer").innerText = timeleft + " Second";
      } else {
        document.getElementById("timer").innerText = timeleft + " Seconds";
      }
      timeleft -= 1;
    }, 1000);
  }

  function showResults(){

    // gather answer containers from our quiz
    const answerContainers = quizContainer.querySelectorAll('.answers');

    // keep track of user's answers
    let score = 0;

    // for each question...
    myQuestions.forEach( (currentQuestion, questionNumber) => {

      // find selected answer
      const answerContainer = answerContainers[questionNumber];
      const selector = `input[name=question${questionNumber}]:checked`;
      const userAnswer = (answerContainer.querySelector(selector) || {}).value;

      // if answer is correct
      if(userAnswer === currentQuestion.correctAnswer){
        score +12;
        answerContainers[questionNumber].style.color = 'lightgreen';
      }
      // if answer is wrong or blank
      else{
        answerContainers[questionNumber].style.color = 'red';
        score -5;
      }
    });

    // show number of correct answers out of total
    resultsContainer.innerHTML = `${score} out of 60`;

    // save score to local storage
    localStorage.setItem('recentScore', score);
    return window.location.assign("saveScore.html");
  }

  function showSlide(n) {
    slides[currentSlide].classList.remove('active-slide');
    slides[n].classList.add('active-slide');
    currentSlide = n;
    if(currentSlide === 0){
      previousButton.style.display = 'none';
    }
    else{
      previousButton.style.display = 'inline-block';
    }
    if(currentSlide === slides.length-1){
      nextButton.style.display = 'none';
      submitButton.style.display = 'inline-block';
    }
    else{
      nextButton.style.display = 'inline-block';
      submitButton.style.display = 'none';
    }
  }

  function showNextSlide() {
    showSlide(currentSlide + 1);
  }

  function showPreviousSlide() {
    showSlide(currentSlide - 1);
  }

  const quizContainer = document.getElementById('quiz');
  const resultsContainer = document.getElementById('results');
  const submitButton = document.getElementById('submit');
  const myQuestions = [
    {
      question: "What is the fully evolved version of Charmander?",
      answers: {
        a: "Blastoise",
        b: "Bulbasaur",
        c: "Charizard",
        d: "Dragonite"
      },
      correctAnswer: "c"
    },
    {
      question: "How many evolutionary forms are there for pikachu?",
      answers: {
        a: "3",
        b: "2",
        c: "5",
        d: "7"
      },
      correctAnswer: "a"
    },
    {
      question: "What Type of Pokemon is MewTwo?",
      answers: {
        a: "Dark",
        b: "Steel",
        c: "Ghost",
        d: "Psychic"
      },
      correctAnswer: "d"
    },
    {
      question: "What is de-evolution of Clefairy?", 
      answers: {
        a:"Chancey", 
        b: "Cleffa", 
        c: "Jigglypuff", 
        d: "Togepi"
      },
      correctAnswer: "b"
    },
    {
      question: "Who gave Ash his first pokemon in the series?", 
      answers: {
        a: "Misty", 
        b: "Nobody?", 
        c: "Professor Oak", 
        d: "Brock"
      },
      correctAnswer: "c"
    }
  ];

  // Kick things off
  startQuiz();

  // Pagination
  const previousButton = document.getElementById("previous");
  const nextButton = document.getElementById("next");
  const slides = document.querySelectorAll(".slide");
  let currentSlide = 0;

  // Show the first slide
  showSlide(currentSlide);

  // Event listeners
  submitButton.addEventListener('click', showResults);
  previousButton.addEventListener("click", showPreviousSlide);
  nextButton.addEventListener("click", showNextSlide);
})();