// $(document).ready(function() {
//     initial();
//     var screenWidth = $(window).width();
//     if( screenWidth > 480 && screenWidth <= 768){
//         roadObj = -100;
//         roadSpeed = 100;
//     }else if(screenWidth < 480){
//         roadObj = -350;
//         roadSpeed = 800;
//     }
// });
// var countdownnumber = 5;
// var countdownid, x;
//
// var roadSpeed, roadObj;
// var one, two, three, four, five, six, seven, eight, last;//車子
// var carTimer ,roadRepeat, scoreTimer;//要停止的
// var endTime = -5;
// function initial() {
//     x = document.getElementById("raceNum");
//     x.innerHTML = countdownnumber;
//     countdownnumber--;
//     countdownid = window.setInterval(countdownfunc, 1000);
// }
//
// function countdownfunc() {
//     x.innerHTML = countdownnumber;
//     var num = document.getElementById("raceNum");
//     var light = document.getElementById("raceLight");
//     // num.addClass("rubberBand");
//     if (countdownnumber > 0) {// 倒數數字
//         num.src="./images/sec_"+ countdownnumber +".png";
//         if(countdownnumber == 1) {
//             num.style.width = "80%";
//         }
//     }
//     if (countdownnumber === 0) {// 倒數 GO
//         light.src="./images/green_light.png";
//         num.src="./images/sec_go.png";
//         num.style.marginTop="10px";
//         num.style.width = "100%";
//         //起點 消失
//         var startLine = document.getElementById("startLine");
//         $("#startLine").animate({
//             top: "-300px",
//             transition: ".7s"
//         }, 100, "linear");
//
//         animateDiv();//亂數 車子
//         repeat();// 賽道
//         scoreRepeat();//名次
//     }
//     if (countdownnumber == -1) {//倒數消失
//         var reciprocal = document.getElementById('raceReciprocal');
//         reciprocal.style.opacity = "0";
//         reciprocal.style.transition = ".3s";
//     }
//     if(countdownnumber == -5){//抵達終點前一秒
//         var fullScreen = document.getElementById("fullScreen");
//         var endLine = $(".endLine");
//         endLine.animate({'bottom':'60px'}, 300,'linear', function(){});
//
//         //終點前 賽道 slowMotion
//         $(".RaceSpace").animate({'backgroundPositionY':'-40px'}, 800, 'linear', function(){});//賽道變慢
//         fullScreen.style.opacity = "0.7";
//     }
//     if(countdownnumber == endTime){//抵達終點
//         // 終點前BLUR
//         var fullScreen = document.getElementById("fullScreen");
//         fullScreen.style.opacity="0";
//         // 終點 賽道 停止()
//         $(".RaceSpace").animate({'backgroundPositionY':'0px'}, 800, 'linear', function(){});//賽道停止
//         clearInterval(countdownid); //清除interval
//         //超過終點
//         clearTimeout(carTimer);
//         for (var i=1 ; i<=10;i++) {
//             $('#car' + i).animate({ marginTop: "200%"}, calcSpeed(), function(){});
//         }
//     }
//     countdownnumber--;
// }
//
// // 賽道移動
// function repeat() {
//     obj = roadObj;
//     // $(".RaceSpace").css('background-position-y':'0px');
//     $(".RaceSpace").animate({'backgroundPositionY':''+ obj +'px'}, roadSpeed , 'linear', function(){
//         $('.RaceSpace').css({backgroundPosition:'0px 0px'});
//         roadRepeat = setTimeout("repeat()", 30);
//     });
// }
// //加速  位移
// function goAhead() {
//     // var a = Math.floor(Math.random() * 100 - 10);
//     var h = Math.floor(Math.random() * 10 + 20);
//     return h;
// }
//
// //亂數 位移
// function makeNewPosition() { //margin 的位移
//     var h = $(window).height() - 50;
//     var nh = Math.floor(Math.random() * 45 - 8);
//     return nh;
// }
//
// function animateDiv() {//車子移動 animate
//     var newq = makeNewPosition();
//     var go = goAhead();
//     var ranOne = Math.floor(Math.random()* 3);
//     var ranTwo = Math.floor(Math.random()* 3);
//     for (var i=1 ; i<=10;i++) {
//         $('#car' + i).animate({ marginTop: ""+ newq +"%"}, calcSpeed(), function(){});
//         if (ranOne == ranTwo){
//             $('#car' + i).animate({ marginTop: ""+ go +"%" }, speedUp(), function(){});
//         }
//     }
//
//     carTimer = setTimeout(function(){animateDiv();}, 800);
//     if ( countdownnumber == endTime){
//         clearTimeout("carTimer");
//     }
//     //var carTimer = setInterval("animateDiv()", 800);
// }
// function speedUp() {
//     var speedUp = Math.ceil(Math.random() * 900);
//     return speedUp;
// }
// function calcSpeed() {//車子速度
//     var speed = Math.ceil(Math.random() * 1000 + 1000 );
//     return speed;
// }
//
// function scoreRepeat () {//抓取車子位移位置
//     var carTop = [];
//     for (var i = 1; i <= 10; i++){
//         var cari = document.getElementById('car'+i);
//         carTop[i] = cari.offsetTop;//抓取車子的TOP
//         console.log(carTop[i]);
//         var obj = {
//             car_number1:carTop[1],
//             car_number2:carTop[2],
//             car_number3:carTop[3],
//             car_number4:carTop[4],
//             car_number5:carTop[5],
//             car_number6:carTop[6],
//             car_number7:carTop[7],
//             car_number8:carTop[8],
//             car_number9:carTop[9],
//             car_number10:carTop[10]
//         };
//         var objSorted = Object.keys(obj).sort(//obj排序 排完變成陣列
//             function(a, b){
//                 return obj[b] - obj[a];
//             }
//         );
//         if (countdownnumber == -5){//終點前slowMotion 前三名車子變亮*******(沒有變亮)
//             one = objSorted[0].substr(10,11);
//             two = objSorted[1].substr(10,11);
//             three = objSorted[2].substr(10,11);
//             if ( one == "0" || two == "0" || three == "0") {
//                 $("#car10").css("z-index" , "100");
//             }
//             // $("#car"+one).css("z-index" , "100");
//             // $("#car"+two).css("z-index" , "100");
//             // $("#car"+three).css("z-index" , "100");
//         }
//
//         four = objSorted[4].substr(10,11);
//         five = objSorted[5].substr(10,11);
//         six = objSorted[6].substr(10,11);
//         seven = objSorted[7].substr(10,11);
//         eight = objSorted[8].substr(10,11);
//         last = objSorted[9].substr(10,11);
//         // setTimeout("backward("+ last +")",1000,function(){});//靠後的車子 開氮氣
//         // removeFire();
//
//         //更改名次圖片
//         for (var a = 0 ;a < objSorted.length; a++) {
//             $('#score'+(a+1)).find('img').attr("src", './images/'+ objSorted[a] +'.png');
//         }
//         // console.log("car"+i , carTop[i]);
//         // $("#score"+i).animate({ left:""+ carTop[i] +"px"}, 1000);//分數移動
//         if(carTop[i] >= 160){
//             // debugger
//             clearTimeout(roadRepeat);
//             clearTimeout(scoreTimer);
//         }
//     }
//     scoreTimer = setTimeout("scoreRepeat()", 100);
//     // var scoreTimer = setInterval("scoreRepeat()", 100);
// }
//
// //氮氣gif
// function backward(obj) {
//     var fire = $("<img src='./images/fire.gif' id='fire'>");
//     $("#car"+ obj +"").append(fire);
// }
//
// function removeFire(obj) {
//     $("#fire").remove();
// }
