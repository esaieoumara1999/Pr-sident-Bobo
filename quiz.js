// select all elements
const start = document.getElementById("start");
const quiz = document.getElementById("quiz");
const question = document.getElementById("question");
const qImg = document.getElementById("qImg");
const choiceA = document.getElementById("A");
const choiceB = document.getElementById("B");
const choiceC = document.getElementById("C");
const counter = document.getElementById("counter");
const timeGauge = document.getElementById("timeGauge");
const progress = document.getElementById("progress");
const scoreDiv = document.getElementById("scoreContainer");

// create our questions
let questions = [
    {
        question : "Qui utilise les toilettes sans tirer la chasse eau ?",
        imgSrc : "img/codeloccol.jpg",
        choiceA : "Wahab",
        choiceB : "Rachid",
        choiceC : "Richard",
        correct : "C"
    },{
        question : "Qui rofle le plus ?",
        imgSrc : "img/codeloccol.jpg",
        choiceA : "Daouda",
        choiceB : "Imran",
        choiceC : "Moctar",
        correct : "C"
    },{
        question : "Qui se promene torse nue en serviette ?",
        imgSrc : "img/codeloccol.jpg",
        choiceA : "Richard",
        choiceB : "Omar",
        choiceC : "ben Omar",
        correct : "A"
    },{
        question : "Qui n'as jamais joué à la PS ?",
        imgSrc : "img/codeloccol.jpg",
        choiceA : "Mahamadou T",
        choiceB : "Indi",
        choiceC : "Mahamadou S",
        correct : "C"
    },{
        question : "Qui veut profiter d'une formation au USA et rester là bas ?",
        imgSrc : "img/codeloccol.jpg",
        choiceA : "Taro",
        choiceB : "Rachid",
        choiceC : "Namagaré",
        correct : "B"
    },{
        question : "Qui aime la fraicheur ?",
        imgSrc : "img/codeloccol.jpg",
        choiceA : "Daouda",
        choiceB : "Eve",
        choiceC : "Rabiou",
        correct : "A"
    },{
        question : "Qui fait la plus grande LOMA en mangeant ?",
        imgSrc : "img/codeloccol.jpg",
        choiceA : "Namagaré",
        choiceB : "Richard",
        choiceC : "Wakasso",
        correct : "B"
    },{
        question : "Il faut que tu lui fait tout le site pour que ce #CS comprennent le projet ?",
        imgSrc : "img/codeloccol.jpg",
        choiceA : "Madame",
        choiceB : "Rainatou",
        choiceC : "Harrirra",
        correct : "A"
    },{
        question : "Qui peut dormir pendant 12h ?",
        imgSrc : "img/codeloccol.jpg",
        choiceA : "Daouda",
        choiceB : "Esaie",
        choiceC : "Nafiou",
        correct : "B"
    },{
        question : "A cause d'un morceau de viande, ce #CS peut ne plut te parler 🤣  ?",
        imgSrc : "img/codeloccol.jpg",
        choiceA : "Rachid",
        choiceB : "Youssouf",
        choiceC : "Richard",
        correct : "C"
    },{
        question : "Qui est vieux et fait semblant d'être un jeune ?",
        imgSrc : "img/codeloccol.jpg",
        choiceA : "Adamou",
        choiceB : "Imran",
        choiceC : "Mahamadou T",
        correct : "B"
    },{
        question : "Qui n'aime pas la musique ?",
        imgSrc : "img/codeloccol.jpg",
        choiceA : "Adamou",
        choiceB : "Wakasso",
        choiceC : "Youssouf",
        correct : "C"
    },{
        question : "Qui est toujours en retard en venant de Niamey ?",
        imgSrc : "img/codeloccol.jpg",
        choiceA : "BIG Hassia",
        choiceB : "Eve",
        choiceC : "Soufiane",
        correct : "C"
    },{
        question : "Celui qui ne fait pas partie des #CS?",
        imgSrc : "img/codeloccol.jpg",
        choiceA : "Lourwanne",
        choiceB : "Houssein",
        choiceC : "Rouffaye",
        correct : "B"
    },{
        question : "Qui est toujours en retard en quittant Codeloccol ?",
        imgSrc : "img/codeloccol.jpg",
        choiceA : "BIG Hassia",
        choiceB : "Eve",
        choiceC : "Soufiane",
        correct : "A"
    },{
        question : "Qui est la plus gentille des #CS ?",
        imgSrc : "img/codeloccol.jpg",
        choiceA : "BIG Hassia",
        choiceB : "Haoua",
        choiceC : "Small Hassia",
        correct : "B"
    },{
        question : "Qui a conçu ce quiz ?",
        imgSrc : "img/codeloccol.jpg",
        choiceA : "Esaie",
        choiceB : "Esaie",
        choiceC : "Esaïe",
        correct : "C"
    }
];

// create some variables

const lastQuestion = questions.length - 1;
let runningQuestion = 0;
let count = 0;
const questionTime = 10; // 10s
const gaugeWidth = 150; // 150px
const gaugeUnit = gaugeWidth / questionTime;
let TIMER;
let score = 0;

// render a question
function renderQuestion(){
    let q = questions[runningQuestion];
    
    question.innerHTML = "<p>"+ q.question +"</p>";
    qImg.innerHTML = "<img src="+ q.imgSrc +">";
    choiceA.innerHTML = q.choiceA;
    choiceB.innerHTML = q.choiceB;
    choiceC.innerHTML = q.choiceC;
}

start.addEventListener("click",startQuiz);

// start quiz
function startQuiz(){
    start.style.display = "none";
    renderQuestion();
    quiz.style.display = "block";
    renderProgress();
    renderCounter();
    TIMER = setInterval(renderCounter,1000); // 1000ms = 1s
}

// render progress
function renderProgress(){
    for(let qIndex = 0; qIndex <= lastQuestion; qIndex++){
        progress.innerHTML += "<div class='prog' id="+ qIndex +"></div>";
    }
}

// counter render

function renderCounter(){
    if(count <= questionTime){
        counter.innerHTML = count;
        timeGauge.style.width = count * gaugeUnit + "px";
        count++
    }else{
        count = 0;
        // change progress color to red
        answerIsWrong();
        if(runningQuestion < lastQuestion){
            runningQuestion++;
            renderQuestion();
        }else{
            // end the quiz and show the score
            clearInterval(TIMER);
            scoreRender();
        }
    }
}

// checkAnwer

function checkAnswer(answer){
    if( answer == questions[runningQuestion].correct){
        // answer is correct
        score++;
        // change progress color to green
        answerIsCorrect();
    }else{
        // answer is wrong
        // change progress color to red
        answerIsWrong();
    }
    count = 0;
    if(runningQuestion < lastQuestion){
        runningQuestion++;
        renderQuestion();
    }else{
        // end the quiz and show the score
        clearInterval(TIMER);
        scoreRender();
    }
}

// answer is correct
function answerIsCorrect(){
    document.getElementById(runningQuestion).style.backgroundColor = "#0f0";
}

// answer is Wrong
function answerIsWrong(){
    document.getElementById(runningQuestion).style.backgroundColor = "#f00";
}

// score render
function scoreRender(){
    scoreDiv.style.display = "block";
    
    // calculate the amount of question percent answered by the user
    const scorePerCent = Math.round(100 * score/questions.length);
    
    // choose the image based on the scorePerCent
    let img = (scorePerCent >= 80) ? "img/5.png" :
              (scorePerCent >= 60) ? "img/4.png" :
              (scorePerCent >= 40) ? "img/3.png" :
              (scorePerCent >= 20) ? "img/2.png" :
              "img/1.png";
    
    scoreDiv.innerHTML = "<img src="+ img +">";
    scoreDiv.innerHTML += "<p>"+ scorePerCent +"%</p>";
}





















