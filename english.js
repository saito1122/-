document.onkeydown=kdown;

var miss = document.getElementById("misscount"); 
var count = 0;
var WordCount = 0;

var startTime;
var elapsedTime = 0;
var timerId;
var pastTime = 0;
var running = false;

var que = document.getElementById("question");
var ans = document.getElementById("answer");
var newg = document.getElementById("newgame");
var Mondai = new Array("dump","priority","continue","contact","progress","sustain","occupy","fluently");

var Kcode = new Array(65,66,67,68,69,70,71,72,73,74,75,76,77,78,79,80,
                      81,82,83,84,85,86,87,88,89,90);
var Alphabet = new Array("a","b","c","d","e","f","g","h","i",
                         "j","k","l","m","n","o","p","q","r",
                         "s","t","u","v","w","x","y","z");

function changeDec(){   //時間表記を整える
    var m = Math.floor(elapsedTime / 60000);
    var s = Math.floor(elapsedTime % 60000 / 1000);
    var ms = elapsedTime % 1000; 

    m = ('0' + m).slice(-2);
    s = ('0' + s).slice(-2);
    ms = ('00' + ms).slice(-3);

    timer.textContent = m + ':' + s + '.' + ms;
}

function countUp(){
    timerId = setTimeout(function(){
        elapsedTime = Date.now() - startTime + pastTime;
        changeDec();
        countUp();
    },10);
}

function start(){　　//タイマースタート
    if(running == true){
        return;
    }
    running = true;
    startTime = Date.now();
    countUp();
} 

function stop(){　//タイマーストップ
    clearTimeout(timerId);
    pastTime　+= Date.now()　-　startTime;
}

for(i=Mondai.length-1;i>0;i--){
        var j = Math.floor(Math.random()*(i+1));
        var tmp = Mondai[i];
        Mondai[i] = Mondai[j];
        Mondai[j] = tmp;
}

function kdown(e){
    var k = 0;
    if(event.keyCode===13){  //enterが押されたら判定
        start();
        que.innerHTML = Mondai[j];
        if(que.innerHTML == ans.innerHTML){　　//問題と答えが一致
            j++; 
            ans.innerHTML = "";  
            que.innerHTML = Mondai[j];
            WordCount = 0;
        }
        if(j == 5){
            stop();
            que.innerHTML = "Finish!";
            Object.freeze(count);
        }
    }
    k = event.keyCode - 65;
    if(event.keyCode == Kcode[k]){
        ans.innerHTML = ans.innerHTML+Alphabet[k];
        WordCount++;
        }
    if(event.keyCode == 8){
            if(WordCount != 0){
                ans.innerHTML = ans.innerHTML.slice(0,-1);
                count++;
                miss.innerHTML = "miss:"+count;
                WordCount--;
            }  
        }     
}

document.getElementById("button").onclick = function() {
    location.reload();
};