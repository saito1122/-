document.onkeydown=kdown;

var miss = document.getElementById("misscount"); 
var count = 0;
var WordCount = 0;

var startTime;
var elapsedTime = 0; //経過時間
var timerId;
var pastTime = 0;
var running = false;

var que = document.getElementById("question");
var ans = document.getElementById("answer");
var newg = document.getElementById("newgame");
var Mondai = new Array("こんにちは","ありがとう","おはよう","たいぴんぐ","ぷろぐらみんぐ");

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

function ShowLength(str){
    document.getElementById("inputlength").innerHTML = str.length;
    WordCount = str.length;  
 }

 var input = document.getElementById("ansfield");
 input.addEventListener("keyup", function(){
    if( this.value.match(/^[ぁ-ん]+$/) ){
        this.blur();
        this.focus();
    }
});

function kdown(e){
    input = document.getElementById("ansfield").value;
    target = document.getElementById("answer");
    target.innerHTML = input;

    
    
    if(event.keyCode===13){  //enterが押されたら判定
        start();
        que.innerHTML = Mondai[j];
        if(que.innerHTML == ans.innerHTML){　　//問題と答えが一致
            j++; 
            ans.innerHTML = "";  
            document.getElementById( "ansfield" ).value = "";
            que.innerHTML = Mondai[j];
            WordCount = 0;
        }
        if(j == 5){
            stop();
            que.innerHTML = "終了";
        }
    } 
    
    if(event.keyCode == 8){       
        if(WordCount != 0){
            count++;
            miss.innerHTML = "ミス:"+count;
            WordCount--;
        }  
    }
}

document.getElementById("button").onclick = function() {
    location.reload();
}