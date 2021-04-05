(function(){
    let highScores = JSON.parse(localStorage.getItem("leaderBoard"));
    document.getElementById("scores").innerText = highScores[0].name + ": " 
    + highScores[0].result;
})();