window.onload = function(){
    clickWelcome();
    document.querySelector("#intro").addEventListener('click',show);
    document.querySelector("#hobby").addEventListener('click',show);
    document.querySelector("#devel").addEventListener('click',show);
    document.querySelector("#close").addEventListener('click', close);
}
//화면 호출시 애니메이션 실행 js 
function clickWelcome(){    
    document.getElementById("welcome").style.animation = "showWelcome 3s 0s";
    const hello =
            "<p style='font-size: 50pt; font-weight:bold;'>WELCOME</p>"+
            "<p style='font-size: 15pt;'>WELCOME TO MY PAGE. THIS PAGE IS MY FIRST PERSONAL PROJECT.<br>"+
            "THANK YOU!"+
            "</p>";
            setTimeout(function(){
                document.getElementById("text1").innerHTML = hello;
            },3000);
}
function show () {
    document.querySelector(".background").className = "background show";
    document.getElementById("tableMain").style.animation = "";
}

function close () { 
    document.querySelector(".background").className = "background";
    document.getElementById("tableMain").style.visibility = "visible";
    document.getElementById("tableMain").style.animation = "showMain 1s 0s";
}
function clickEvent(submenu){
    //submenu 선택시 메인 테이블 숨김처리
    document.getElementById("tableMain").style.visibility = "hidden";

    if(submenu === "intro") {
        document.getElementById("popIntro").style.visibility = "visible";
        document.getElementById("popHobby").style.visibility = "hidden";
        document.getElementById("popDevelop").style.visibility = "hidden";
    }else if(submenu === "hobby") {
        document.getElementById("popIntro").style.visibility = "hidden";
        document.getElementById("popHobby").style.visibility = "visible";
        document.getElementById("popDevelop").style.visibility = "hidden";
    }else if(submenu === "devel") {
        document.getElementById("popIntro").style.visibility = "hidden";
        document.getElementById("popHobby").style.visibility = "hidden";
        document.getElementById("popDevelop").style.visibility = "visible";
    }else if(submenu === "log") {
        document.getElementById("popIntro").style.visibility = "hidden";
        document.getElementById("popHobby").style.visibility = "hidden";
        document.getElementById("popDevelop").style.visibility = "hidden";          
    }
}
