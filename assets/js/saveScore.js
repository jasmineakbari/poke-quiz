  
const username = document.querySelector('#username');
const saveBtn = document.querySelector('#save');
const yourScore = document.querySelector('#results');

const leaderBoard = [];
const scoresKept = 5
yourScore.innerText = localStorage.getItem(recentScore, num) + "out of 60!";

username.addEventListener('keyup', ()=>{
    saveBtn.disabled = !username.value
})

saveScore = event =>{
    event.preventDefault()

    const score = {
        score: recentScore,
        name: username.value
    }

    leaderBoard.push(score);
    leaderBoard.sort((a,b)=>{
        return b.score - a.score
    })
    leaderBoard.splice(5)
    localStorage.setItem('leaderBoard',JSON.stringify(leaderBoard))
    window.location.assign('scores.html')
}