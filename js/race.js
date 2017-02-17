$(document).ready(function() {
    initial();
    var screenWidth = $(window).width();
    if( screenWidth > 480 && screenWidth <= 768){
        roadObj = -100;
        roadSpeed = 100;
    }else if(screenWidth < 480){
        roadObj = -350;
        roadSpeed = 1000;
    }
});
var countdownnumber = 5;
var countdownid, x;

var r1 = 10, r2 = 2, r3 = 1, r4 = 3, r5 = 6, r6 = 4, r7 = 5, r8 = 7, r9 = 9, r10 = 8;//接名次值
//1~10 => 3, 2, 4, 6, 7, 5, 8, 10, 9, 1
var roadSpeed, roadObj;
var one, two, three, four, five, six, seven, eight, last;//車子
var carTimer ,roadRepeat = true, scoreTimer;//要停止的setTimeout
var endTime = -5;
function initial() {
    x = document.getElementById("raceNum");
    x.innerHTML = countdownnumber;
    countdownnumber--;
    countdownid = window.setInterval(countdownfunc, 1000);
}

function countdownfunc() {
    x.innerHTML = countdownnumber;
    var num = document.getElementById("raceNum");
    var light = document.getElementById("raceLight");
    var reciprocal = document.getElementById('raceReciprocal');
    var startLine = document.getElementById("startLine");
    var fullScreen = document.getElementById("fullScreen");
    var endLine = $(".endLine");
    if (countdownnumber > 0) {// 倒數數字
        num.src="./images/sec_"+ countdownnumber +".png";
        if(countdownnumber == 1) {
            num.style.width = "80%";
        }
    }
    if (countdownnumber === 0) {// 倒數 GO
        light.src="./images/green_light.png";
        num.src="./images/sec_go.png";
        num.style.marginTop="10px";
        num.style.width = "100%";
        //起點 消失
        $("#startLine").animate({
            top: "-300px",
            transition: ".7s"
        }, 100, "linear");

        animateDiv();//亂數 車子
        repeat();// 賽道
        scoreRepeat();//名次
    }
    if (countdownnumber == -1) {//倒數消失
        reciprocal.style.opacity = "0";
        reciprocal.style.transition = ".1s";
    }
    if(countdownnumber == (endTime + 1)){//抵達終點前一秒
        endLine.animate({'bottom':'60px'}, 300,'linear', function(){});
        //終點前 賽道 slowMotion blur
        // $(".RaceSpace").animate({'backgroundPositionY':'-40px'}, 800, 'linear', function(){});//賽道變慢
        fullScreen.style.opacity = "0.7";

        var a = [];
        var z1 = 0;
        var obj = {
            car_number1:r1,
            car_number2:r2,
            car_number3:r3,
            car_number4:r4,
            car_number5:r5,
            car_number6:r6,
            car_number7:r7,
            car_number8:r8,
            car_number9:r9,
            car_number10:r10
        };
        var objSorted = Object.keys(obj).sort(//obj排序 排完變成陣列
            function(a, b){
                return obj[b] - obj[a];//大到小
            }
        );
        roadRepeat = false;
        for (var i = 0; i <= 9; i++){
            var z2 = objSorted[i].slice(10,12);
            z1 = i*5;
            $('#car'+ z2).stop(true,false);
            $("#car"+ z2).animate({"marginTop" : ""+ z1 +"%"},700,"linear", function() { });
         }
    }
    if(countdownnumber == endTime){//抵達終點
        fullScreen.style.opacity="0";
        //超過終點
        for(var i = 1; i <= 10; i++){
            $('#car'+ i).stop(true,false);
            $("#car"+ i).animate({"marginTop" : "200%"}, 700,"linear", function() { });
        }
        clearInterval(countdownid); //清除interval
        clearTimeout(carTimer);
        clearTimeout(roadRepeat);
        roadRepeat = false;
        clearTimeout(scoreTimer);
    }
    countdownnumber--;
}


function repeat() {// 賽道移動
    obj = roadObj;
    if (roadRepeat) {
        $(".RaceSpace").animate({'backgroundPositionY':'-800px'}, roadSpeed , 'linear', function(){
             repeat();
            $('.RaceSpace').css({backgroundPosition:'0px 0px'});
        });
    }
}

function goAhead() {//加速  位移
    // var a = Math.floor(Math.random() * 100 - 10);
    var h = Math.floor(Math.random() * 10 + 20);
    return h;
}

function makeNewPosition() { //亂數 margin 的位移
    var h = $(window).height() - 50;
    var nh = Math.floor(Math.random() * 45 - 8);
    return nh;
}

function animateDiv() {//車子移動 animate
    var go = goAhead();
    var ranOne = Math.floor(Math.random()* 3);
    var ranTwo = Math.floor(Math.random()* 3);
    if (roadRepeat) {
        for (var i=1 ; i<=10;i++) {
            var newq = makeNewPosition();
            $('#car' + i).animate({ marginTop: ""+ newq +"%"}, calcSpeed(), function(){});
            // if (ranOne == ranTwo){
            //     $('#car' + i).animate({ marginTop: ""+ go +"%" }, speedUp(), function(){});
            // }
        }
    }
    carTimer = setTimeout(function(){animateDiv();}, 800);
}

function speedUp() {// 瞬間加速
    var speedUp = Math.ceil(Math.random() * 900);
    return speedUp;
}

function calcSpeed() {//車子平常速度
    var speed = Math.ceil(Math.random() * 1000 + 1000 );
    return speed;
}

function scoreRepeat () {//抓取車子位移位置
    var carTop = [];
    for (var i = 1; i <= 10; i++){
        var cari = document.getElementById('car'+i);
        carTop[i] = cari.offsetTop;//抓取車子的TOP
        var obj = {
            car_number1:carTop[1],
            car_number2:carTop[2],
            car_number3:carTop[3],
            car_number4:carTop[4],
            car_number5:carTop[5],
            car_number6:carTop[6],
            car_number7:carTop[7],
            car_number8:carTop[8],
            car_number9:carTop[9],
            car_number10:carTop[10]
        };
        var objSorted = Object.keys(obj).sort(//obj排序 排完變成陣列
            function(a, b){
                return obj[b] - obj[a];
            }
        );
        if (countdownnumber == -5){//終點前slowMotion 前三名車子變亮*******(沒有變亮)
            one = objSorted[0].substr(10,11);
            two = objSorted[1].substr(10,11);
            three = objSorted[2].substr(10,11);
            if ( one == "0" || two == "0" || three == "0") {
                $("#car10").css("z-index" , "100");
            }
            $("#car"+one).css("z-index" , "100");
            $("#car"+two).css("z-index" , "100");
            $("#car"+three).css("z-index" , "100");
        }
        four = objSorted[4].substr(10,11);
        five = objSorted[5].substr(10,11);
        six = objSorted[6].substr(10,11);
        seven = objSorted[7].substr(10,11);
        eight = objSorted[8].substr(10,11);
        last = objSorted[9].substr(10,12);
        // setTimeout("backward("+ last +")",1000,function(){});//靠後的車子 開氮氣
        // removeFire();

        for (var a = 0 ;a < objSorted.length; a++) {//更改名次圖片
            $('#score'+(a+1)).find('img').attr("src", './images/'+ objSorted[a] +'.png');
        }
        // console.log("car"+i , carTop[i]);
        // $("#score"+i).animate({ left:""+ carTop[i] +"px"}, 1000);//分數移動
    }
    scoreTimer = setTimeout("scoreRepeat()", 100);
}


function backward(obj) {//氮氣gif
    var fire = $("<img src='./images/fire.gif' id='fire'>");
    $("#car"+ obj +"").append(fire);
}

function removeFire(obj) {
    $("#fire").remove();
}
