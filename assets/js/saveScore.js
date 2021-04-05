  
const username = document.querySelector('#username');
const saveBtn = document.querySelector('#save');
const results = document.querySelector('#results');

const leaderBoard = [];
const scoresKept = 5

saveScore = event =>{
    event.preventDefault()

    let yourScore = JSON.parse(localStorage.getItem("recentScore"));

    const score = {
        result: yourScore,
        name: username.value
    }

    console.log(score)
    leaderBoard.push(score);
    leaderBoard.sort((a,b)=>{
        return b.score - a.score
    })
    leaderBoard.splice(5)
    localStorage.setItem('leaderBoard',JSON.stringify(leaderBoard))
    window.location.assign('scores.html')
}

username.addEventListener('keyup', ()=>{
    saveBtn.disabled = !username.value
})

saveBtn.addEventListener('click', saveScore);