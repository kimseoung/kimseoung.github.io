window.onload = function(){
    document.getElementById("userListFrm").style.visibility = "hidden";
}
class Signup{
    constructor(username, userId, password, repassword, snnum, phnum,address, datetime = Date.now()){
        this.username = username;
        this.userId = userId;
        this.password = password;
        this.repassword = repassword;
        this.snnum = snnum;
        this.phnum = phnum;
        this.address = address;
        this.datetime = datetime;
        
    }
}
const saveSignupList = () =>{
    //유효성검사
    let validation = validationCheck();
    if(validation == true){
        //사용자 입력값 처리 
        const usernameVal = username.value;
        const userIdVal = userId.value;
        const passwordVal = password.value;
        const repasswordVal = repassword.value;
        const snnumVal = snnum.value+'-'+snnum2.value;
        const phnumVal = phnum.value;
        const addressVal = address.value;
        //userSignUp 객체
        const userSignUp = new Signup(usernameVal, userIdVal,passwordVal, repasswordVal, snnumVal, phnumVal, addressVal);
        
        //배열에 저장    기존데이터가 있다면 왼쪽 사용 false 일시에 우항사용 
        const userSignUps = JSON.parse(localStorage.getItem("userSignUps")) || []; // 처음등록시 null 이라 문제발생
        userSignUps.push(userSignUp);
    
        //json
        const userdata = JSON.stringify(userSignUps);
        
        //localStorage 에 저장
        localStorage.setItem('userSignUps',userdata);
    
        //초기화
        document.userSignUpFrm.reset();
    
        //랜더링
        renderuserSignUp(userSignUps);
        // 회원목록 열람
        document.getElementById("userListFrm").style.visibility = "visible";
    }
};

const renderuserSignUp = (userSignUps = JSON.parse(localStorage.getItem("userSignUps"))) =>{
    const tbody = document.querySelector("#tb-userList tbody");
    tbody.innerHTML = "";
    userSignUps
        .map((userSignUp,index)=>{
        const {username, userId, password, snnum, phnum, address, datetime} = userSignUp;
        const replacesnnum = '******-*******';
        return `<tr>
            <td class = "tdnum">${index + 1}</td>
            <td class="tdusername">${username}</td>
            <td class="tduserId">${userId}</td>
            <td class="tdpassword">${password}</td>
            <td class="tdsnnum">${replacesnnum}</td>
            <td class="tdphnum">${phnum}</td>
            <td class="tdaddress">${address}</td>
            <td class="tddatetime">${datetimeFormatter(datetime)}</td>
        </tr>`;
    }) 
    .forEach((tr) => {
    tbody.innerHTML += tr;
    })
};

const datetimeFormatter = (millis)=>{
    const d = new Date(millis);
    const f = (n) =>n <10 ? '0' + n : n;
    const yyyy = d.getFullYear();
    const mm = f(d.getMonth() + 1);
    const dd = f(d.getDate());
    const hh = f(d.getHours());
    const mi = f(d.getMinutes());
    return `${yyyy}/${mm}/${dd} ${hh} : ${mi}`;
};
function validationCheck(){ 
   // 필수입력체크
    if(!username.value){
        alert("이름은 필수로 작성해 주세요")
        return false;
    }
    if(!userId.value){
        alert("이메일 아이디는 필수로 작성해 주세요")
        return false;
    } 
    if(!password.value){
        alert("비밀번호는 필수로 작성해 주세요")
        return false;
    } 
    if(!repassword.value){
        alert("비밀번호 재입력은 필수로 작성해 주세요")
        return false;
    }
    if(!snnum.value || !snnum2.value){
        alert("주민등록번호는 필수로 작성해 주세요")
        return false;
    }   
    // 아이디 중복 체크
    const userSignUps = JSON.parse(localStorage.getItem("userSignUps")) || [];
    let count = 0;
    userSignUps
    .map((userSignUp,index)=>{
        if(userSignUp.userId == userId.value) {
            count = count+1;
        }
    })
    if(count >0){
        alert("중복된 아이디입니다.");
        return false;
    } 

    // 비밀번호 자릿수(8~15) 체크
    // 비밀번호 숫자,영소문자,특수문자 포함
    const regExpArr = [/^.{8,15}$/, /\d/, /[a-zA-Z]/, /[\*!&/@]/];

    for (let i = 0; i < regExpArr.length; i++) {
      if (
        !regExpTest(
          regExpArr[i],
          password,
          "비밀번호는 8~15자리 숫자/문자/특수문자를 포함해야합니다."
        )
      ) {
        return false;
      }
    }

    // 비밀번호 재입력 동일 체크
    if (!isEqualPwd()) {
        return false;
      }

    // 주민등록번호 체크
    const regExp4 = /^\d{2}(0[1-9]|1[0-2])(0[1-9]|[1-2][0-9]|3[01])$/;
    const regExp5 = /^[1234]\d{6}$/;
    if (!regExpTest(regExp4, snnum, "숫자만 입력하세요.")) return false;
    if (!regExpTest(regExp5, snnum2, "숫자만 입력하세요.")) return false;

    if (!ssnCheck(snnum.value, snnum2.value)) {
      alert("올바른 주민번호가 아닙니다.");
      return false;
    }
    return true;
}
function isEqualPwd() {
    if (password.value == repassword.value) {
      return true;
    } else {
      alert("비밀번호가 일치하지 않습니다.");
      password.select();
      return false;
    }
  }

function regExpTest(regExp, el, msg) {
    if (regExp.test(el.value)) return true;
    //적합한 문자열이 아닌 경우
    alert(msg);
    el.value = "";
    el.focus();
    return false;
  }

  function ssnCheck(ssn1, ssn2) {
    const ssn = ssn1 + ssn2;
    /*
        주민등록번호 체계 및 유효성 검사 (javascript)	
        https://eyecandyzero.tistory.com/240	

        //900909-1234561
        const total = 9*2 + 0*3 + 0*4 + 9*5 + 0*6 + 9*7 + 1*8 + 2*9 + 3*2 + 4*3 + 5*4 + 6*5;//220
        const result = total%11;//0
        result = 11-0;//11
        result = result%10;//1
        if(result == 13번째자리수) return true;
        else return false;

    */
    let total = 0;
    for (let i = 0; i < 12; i++) {
      if (i < 8) {
        total += parseInt(ssn.substr(i, 1)) * (i + 2);
      } else {
        total += parseInt(ssn.substr(i, 1)) * (i - 6);
      }
    }
    //마지막수와 비교할 수 구하기
    const result = (11 - (total % 11)) % 10;
    //마지막수(13번째 자리)
    const num13 = parseInt(ssn.substr(12, 1));
    //결과
    if (result == num13) return true;
    else return false;
  }
