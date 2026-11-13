
let yaku = null;
let d1 = null;
let d2 = null;
let d3 = null;
let d4 = null;
let d5 = null;
let added = null;
let alls = [];
let pl_name = ["pl1", "pl2"];
let pl_sum = [0, 0];
let diceChara =[null,"⚀","⚁","⚂","⚃","⚄","⚅"];

let sys = {
    turnLeft: 8,
    TryLeft: 3,
    playerNum: 1
}

let keep = {
    d1: false,
    d2: false,
    d3: false,
    d4: false,
    d5: false
}

let point = [0,0,0,0,0,0,0,0];

function game(){
    document.getElementById("startGame").disabled = true;
    turnLeft = 8;
    playerNum = 1;
    aTurn();
}
function aTurn(){

    document.getElementById("dicing").disabled = false;
    document.getElementById("buttonSet").disabled = true;
    sys.TryLeft = 3;
    if(sys.turnLeft <= 0){
        document.getElementById("whoseTurn").innerHTML = "の勝ち！"
    }
    sys.turnLeft -=1;
    if(sys.playerNum === 0){
        sys.playerNum = 1;
        document.getElementById("whoseTurn").innerHTML = "ティグのターン"
    } else{
        sys.playerNum = 0;
        document.getElementById("whoseTurn").innerHTML = "ルポのターン"
    }
   

    for(let i=0; i<=7; i+=1){
        if(document.getElementById(`${i+2}_${pl_name[sys.playerNum]}`).innerHTML !== "-"){
            document.getElementsByName("pl_check")[i].disabled = true;
            document.getElementsByName("pl_check")[i].checked = false;
        }
    }
    for(let i=1; i<=5; i+=1){
        document.getElementById(`d${i}_k`).checked  = false;
        document.getElementById(`d${i}_k`).disabled  = true;
    }
}

function aDice(){
    let me = Math.floor(Math.random() * 6) + 1;
    return me;
}
function isFourCard(){
    if(d1 !== d2 && d2 === d3 && d3 === d4 && d4 === d5 && d5 !== d1){
        return true;
    } else if(d1 !== d2 && d2 !== d3 && d3 === d4 && d4 === d5 && d5 === d1){
        return true;
    } else if(d1 === d2 && d2 !== d3 && d3 !== d4 && d4 === d5 && d5 === d1){
        return true;
    } else if(d1 === d2 && d2 === d3 && d3 !== d4 && d4 !== d5 && d5 === d1){
        return true;
    } else if(d1 === d2 && d2 === d3 && d3 === d4 && d4 !== d5 && d5 !== d1){
        return true;
    } else{
        return false;
    }
}

function writeP(combi, who, lPoint){
    document.getElementById(`${combi}_${who}`).innerHTML = lPoint;
}

function dices(){
    sys.TryLeft -= 1;
    if(sys.TryLeft <= 0){
        document.getElementById("dicing").disabled = true;
    }
    yaku = null;

    for(let i=1; i<=5; i+=1){
        document.getElementById(`d${i}_k`).disabled  = false;
    }

    if(!document.getElementById("d1_k").checked){d1 = aDice();}
    if(!document.getElementById("d2_k").checked){d2 = aDice();}
    if(!document.getElementById("d3_k").checked){d3 = aDice();}
    if(!document.getElementById("d4_k").checked){d4 = aDice();}
    if(!document.getElementById("d5_k").checked){d5 = aDice();}
    added = d1 + d2 + d3 + d4 + d5;
    alls = new Set([d1, d2, d3, d4, d5]);
    console.log(alls);

    if(alls.size === 1) {
        yaku = "ヨット";
    } else if(alls.size === 5 && added === 15 || alls.size === 5 && added === 20){
        yaku = "ラージストレート";
    } else if(alls.size === 2 && !isFourCard()){
        yaku = "フルハウス";
    } else{
        yaku = ""
    }
    document.getElementById("gameArea").innerHTML = `${diceChara[d1]} ${diceChara[d2]} ${diceChara[d3]} ${diceChara[d4]} ${diceChara[d5]}<br>${yaku}`; 
    combis();
    document.getElementById("buttonSet").disabled = false;
}


function combis() {
    point = [0,0,0,0,0,0,0,0];
    for(let i=2; i<=6; i+=1){
        if(i === d1){
            point[i-2] += i;
        }
        if(i === d2){
            point[i-2] += i;
        }
        if(i === d3){
            point[i-2] += i;
        }
        if(i === d4){
            point[i-2] += i;
        }
        if(i === d5){
            point[i-2] += i;
        }
    }
    if(yaku === "フルハウス"){
        point[5] = added;
    }
    if(yaku === "ラージストレート"){
        point[6] = 30;
    }
    if(yaku === "ヨット"){
        point[7] = 50;
    }
    console.log(point);

    for(let i=0; i<=7; i+=1){
        writeP(i+2, "now", point[i]);
    }
}

function cmbSet(){
    let target = 0;
    let localPoint = 0;
    for(let i=0; i<=7; i+=1){
        if(document.getElementsByName("pl_check")[i].checked){
            target = document.getElementsByName("pl_check")[i].value;
            localPoint = point[i];
        }
    }
    if(target){
        writeP(target, pl_name[sys.playerNum], localPoint);
        pl_sum[sys.playerNum] += localPoint;
        writeP("sum", pl_name[sys.playerNum], pl_sum[sys.playerNum]);
        aTurn();
    }
    
}