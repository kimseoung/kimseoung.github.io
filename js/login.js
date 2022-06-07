
//로그인시 아이디 비밀번호 일치하는지 검사!
function login(){
    const userSignUps = JSON.parse(localStorage.getItem("userSignUps")) || [];
    console.log("login");
    let successcount = 0;
    let logincount = 0;
    userSignUps
    .map((userSignUp,index)=>{
        if(userSignUp.userId == userId.value) {
            logincount = logincount + 1;
            if(userSignUp.password == password.value){
                successcount = successcount + 1;
            }
        }
    })
    if(successcount>0){
        location.href="index.html";
        alert("로그인 성공!");
    }else{
        // 아이디가 회원가입 정보에 들어가있는 것과 일치하는지 확인 아이디가
        //일치 한다면 비밀번호 오류! 일치 하지 않는다면 아이디가 없다!
        if(logincount > 0){
            alert("비밀번호가 틀렸습니다");
        }else{
            alert("일치하는 아이디가 없습니다");
        }

    }
}