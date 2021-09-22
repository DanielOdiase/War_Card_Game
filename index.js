let deckId
let remCards=document.getElementById("rem-btn")
let imgHolder=document.getElementById("cards")
let countBtn=document.getElementById("counter")
let countBtn1=document.getElementById("counter1")
let winner=document.getElementById("winner-container")
let drawBtn=document.getElementById("draw-card")
let shuffBtn =document.getElementById("shuffle-btn")
let player1Score = 0
let player2Score=0
let suits= "KING"||"JACK"||"QUEEN"
let aceVal= "ACE"
let Card1
let Card2

let remBtnNum=0

function shuffleCard(){
    fetch("https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1")
    .then(res=>res.json())
    .then(data=>{
        console.log(data)
        remBtnNum=data.remaining
        remCards.textContent+=`${remBtnNum}`
        deckId=data.deck_id})
        drawBtn.disabled=false
}

function drawCard(){
    fetch( `https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=2`)
    .then(res=>res.json())
    .then(data=>{  console.log(data)
        shuffBtn.disabled=true
        for(let i=0; i < imgHolder.children.length;i++){
        remBtnNum=data.remaining
        remCards.textContent =`Remaining Cards:${remBtnNum}`
            imgHolder.children[i].innerHTML=`<img src=${data.cards[i].image} class="cardClass"/>`
                  Card1=data.cards[0].value
                  Card2 = data.cards[1].value
        }
          

                 decideWinner()
                 if (data.remaining===0){
                    shuffBtn.disabled=false
                    drawBtn.disabled= true
                    if(player1Score>player2Score){
                        winner.textContent="Game Over 🎊The Computer Wins"
                        player1Score=0
                        player2Score=0
                        countBtn.textContent = "Computer Score:"+ player1Score
                        countBtn1.textContent = "MyScore:"+ player2Score
                    }else if(player2Score>player1Score){
                        winner.textContent="Game Over 💪🏿 I win"
                        player1Score=0
                        player2Score=0
                        countBtn1.textContent = "MyScore:"+ player2Score
                        countBtn.textContent = "Computer Score:"+ player1Score
                    }
                    
                }
                
        })


}

function decideWinner(){
    
    if(cardValues[Card1] > cardValues[Card2]){
        player1Score++
        countBtn.textContent = "Computer Score:" +player1Score
        winner.textContent=`Computer Wins Hand !`
}else if(cardValues[Card1]===cardValues[Card2]){
    countBtn.textContent = "Computer Score:"+ player1Score
    countBtn1.textContent ="My Score:"+ player2Score
    winner.textContent=`TIE`
 }else{
    player2Score++
     countBtn1.textContent = "My Score:"+player2Score
    winner.textContent=`I Win Hand!`
 }


}


shuffBtn.addEventListener('click',shuffleCard)

drawBtn.addEventListener('click',drawCard)

let cardValues={
    2:2,
    3:3,
    4:4,
    5:5,
    6:6,
    7:7,
    8:8,
    9:9,
    10:10,
    JACK:11,
    QUEEN:12,
    KING:13,
    ACE:14
}



        