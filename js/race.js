$(document).ready(function() {
    initial();
    $(window).resize(function() {
        var divWidth = $(".wrapRace").width();
        var divHeight = $(".wrapRace").height();

        if (divWidth > 768) {}
        if (divWidth > 480 && divWidth <= 768) {
            roadObj = -100;
            roadSpeed = 100;
            distance = 10;
        } else if (divWidth < 480) {
            roadObj = -350;
            roadSpeed = 1000;
            distance = 15;
        }
    });
    var divWidth = $(".wrapRace").width();
    if (divWidth > 768) {}
    if (divWidth > 480 && divWidth <= 768) {
        roadObj = -100;
        roadSpeed = 100;
        distance = 10;
    } else if (divWidth < 480) {
        roadObj = -350;
        roadSpeed = 1000;
        distance = 15;
    }
});
var countdownnumber = 1; //倒數秒數
var countdownid, x;

var r1 = 10,
    r2 = 2,
    r3 = 1,
    r4 = 3,
    r5 = 6,
    r6 = 4,
    r7 = 5,
    r8 = 7,
    r9 = 9,
    r10 = 8; //接名次值
//1~10 => 3, 2, 4, 6, 7, 5, 8, 10, 9, 1
var roadSpeed, roadObj;
var last; //車子
var carTimer = true,
    roadRepeat = true,
    scoreTimer = true; //要停止的setTimeout
var endTime = -5;

var distance = 0; //排名位移距離

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

    var obj = {
        car_number1: r1,
        car_number2: r2,
        car_number3: r3,
        car_number4: r4,
        car_number5: r5,
        car_number6: r6,
        car_number7: r7,
        car_number8: r8,
        car_number9: r9,
        car_number10: r10
    };
    var objSorted = Object.keys(obj).sort( //obj排序 排完變成陣列
        function(a, b) {
            return obj[b] - obj[a]; //大到小
        }
    );

    if (countdownnumber > 0) { // 倒數數字
        num.src = "./images/sec_" + countdownnumber + ".png";
        if (countdownnumber == 1) {
            num.style.width = "80%";
        }
    }
    if (countdownnumber === 0) { // 倒數 GO
        light.src = "./images/green_light.png";
        num.src = "./images/sec_go.png";
        num.style.marginTop = "10px";
        num.style.width = "100%";
        //起點 消失
        $("#startLine").animate({
            top: "-300px",
            transition: ".7s"
        }, 100, "linear");
        //噴射
        $(".fire").css("opacity","1");
        // $(".fire").css("opacity","0").delay(3000);
        animateDiv(); //亂數 車子
        repeat(); // 賽道
        scoreRepeat(); //名次
    }
    if (countdownnumber == -1) { //倒數消失
        reciprocal.style.opacity = "0";
        reciprocal.style.transition = ".1s";
    }
    if (countdownnumber == (endTime + 1)) { //抵達終點前一秒
        endLine.animate({
            'bottom': '65px'
        }, 1000, 'linear', function() {});
        // 終點前 賽道 slowMotion blur
        $(".RaceSpace").animate({
            'backgroundPositionY': '-100px'
        }, 1000, 'linear', function() {}); //賽道變慢
        fullScreen.style.opacity = "0.7";
        carTimer = false;
        for (var i = 0; i <= 9; i++) {
            var z2 = objSorted[i].slice(10, 12);
            z1 = i * distance;
            $('#car' + z2).stop(true, false);
            $("#car" + z2).animate({
                "marginTop": "" + z1 + "px"
            }, 700, "linear", function() {
                $("#car" + z2).delay(750).stop(true, false);
            });
        }
    }

    if (countdownnumber == endTime) { //抵達終點
        //超過終點
        $('.car').stop(true, false);
        $(".car").animate({
            "marginTop": "150%"
        }, 400, "linear", function() {});
        endLine.stop(true, false);
        endLine.animate({
            'bottom': '110%'
        }, 500, 'linear', function() {});
        fullScreen.style.opacity = "0";
        roadRepeat = false;
        scoreTimer = false;
        clearInterval(countdownid); //清除interval
        clearTimeout(carTimer);
        clearTimeout(roadRepeat);
        clearTimeout(scoreTimer);
    }
    countdownnumber--;
}

function repeat() { // 賽道移動
    obj = roadObj;
    if (roadRepeat) {
        $(".RaceSpace").animate({
            'backgroundPositionY': '-800px'
        }, roadSpeed, 'linear', function() {
            repeat();
            $('.RaceSpace').css({
                backgroundPosition: '0px 0px'
            });
        });
    }
}

function goAhead() { //加速  位移
    var h = Math.floor(Math.random() * 10 + 30);
    return h;
}

function makeNewPosition() { //亂數 margin 的位移
    var h = $(window).height() - 50;
    var nh = Math.floor(Math.random() * 45 - 8);
    return nh;
}

function animateDiv() { //車子移動 animate
    var ranOne = Math.floor(Math.random() * 3);
    var ranTwo = Math.floor(Math.random() * 3);
    if (carTimer) {
        for (var i = 1; i <= 10; i++) {
            var newq = makeNewPosition();
            var go = goAhead();
            $('#car' + i).animate({
                marginTop: "" + newq + "%"
            }, calcSpeed(), function() {});
            if (ranOne == ranTwo) {
                $("#car" + i).stop(true, false);
                $('#car' + i).animate({
                    marginTop: "" + go + "%"
                }, speedUp(), function() {});
                //噴射
                $(".fire").css("opacity","1");
                // $(".fire").css("opacity","0").delay(3000);
            }
        }
    }
    carTimer = setTimeout(function() {
        animateDiv();
    }, 800);
}

function speedUp() { // 瞬間加速
    var speedUp = Math.floor(Math.random() * 1000 + 150);
    return speedUp;
}

function calcSpeed() { //車子平常速度
    var speed = Math.ceil(Math.random() * 1000 + 1000);
    return speed;
}

function scoreRepeat() { //抓取車子位移位置
    if (scoreTimer) {
        var carTop = [];
        var endPos = $("#endLine");

        for (var i = 1; i <= 10; i++) {
            var cari = document.getElementById('car' + i);
            carTop[i] = cari.offsetTop; //抓取車子的TOP
            var obj = {
                car_number1: carTop[1],
                car_number2: carTop[2],
                car_number3: carTop[3],
                car_number4: carTop[4],
                car_number5: carTop[5],
                car_number6: carTop[6],
                car_number7: carTop[7],
                car_number8: carTop[8],
                car_number9: carTop[9],
                car_number10: carTop[10]
            };
            var objSorted = Object.keys(obj).sort( //obj排序 排完變成陣列
                function(a, b) {
                    return obj[b] - obj[a];
                }
            );

            last = objSorted[9].substr(10, 12);

            for (var a = 0; a < objSorted.length; a++) { //更改名次圖片
                $('#score' + (a + 1)).find('img').attr("src", './images/' + objSorted[a] + '.png');
            }
            var first = $("#car" + objSorted[0].substr(10, 12));// 第一名

            console.log("offset()");
            console.log("car: " + first.offset().top);//車子TOP
            console.log("endline: " + endPos.offset().top);//終點線TOP
            console.log("   ");
            console.log("position()");
            console.log("car: " + first.position().top);
            console.log("endLine: " + endPos.position().top);
            console.log("   ");
            console.log("height()");
            console.log("car: " + first.height());
            console.log("endLine: " + endPos.height());
            console.log("   ");
            console.log("---------------------------------------------------------------------");
            // var ans = ( Math.floor(first.offset().top) + Math.floor(endPos.offset().top) );

            // $("#score"+i).animate({ left:""+ carTop[i] +"px"}, 1000);//分數移動
        }
        scoreTimer = setTimeout("scoreRepeat()", 100);
    }
}
// function backward(obj) { //氮氣gif
//     var fire = $("<img src='../images/speedUp.gif' id='fire'>");
//     $("#car" + obj + "").append(fire);
// }
//
// function removeFire(obj) {
//     $("#fire").remove();
// }
