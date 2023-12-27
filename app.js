// const: 선언 이후 재선언 할 수 없고 값이 변하지 않음(파이썬의 상수 개념과 유사)
// new는 왜 써준거지? 이거 분명 배웠던 내용같은데... 무슨 다른 js파일의 객체를 가져오기 위함이었던가? 아니면 새로운 클래스?객체?를 선언후 다른 js파일에서 사용하기 위함인가?

// Init Github
const github = new Github;
// Init UI
const ui = new UI;

// Search input
const searchUser = document.getElementById('searchUser'); 
// --> document.getElementById라는 doc를 사용하여 index.html 에서 id가 #searchUser인 요소를 가져옴.
// index.html의 검색바에서 입력된 값이 searchUser id값을 갖는데 id의 value를 가져오기 때문에 사용자가 입력한 값을 받아올 수 있다. 
//****(다른 html파일에서 요소를 불러오고자 할땐 별도의 경로 지정이 필요할까?)

// Search input event listener
searchUser.addEventListener('keyup', (e) => {
// --> const searchUser에 사용자가 키보드를 눌렀다가 땔 때(keyup), addEventListener를 사용하면 키보드 입력(keyup, keydown, keypress)을 감지할 수 있다.
// 여기서는 이벤트(keyup)를 감지하고 아래 동작을 수행한다.
// ****여기서 'e'는 어떤 value를 뜻하는 걸까?

  // Get input text
  const userText = e.target.value;
// --> const userText에 
// target은 이벤트가 발생한 요소를 반환해준다. 아마 여기서는 e에 keyup이라는 이벤트가 발생하였기 때문에 e에 입력된 value가 반환될 것이라고 추측된다.
// ****여기서 abc가 입력되었을 때 e는 'a','b','c' 한 글자 단위인가 아니면 'abc'로 value를 입력을 받는가?

  if(userText !== ''){
// 만약 userText(searchbar에 사용자가 입력한 내용.)에 입력이 있다면, 아래 코드를 수행.

   // Make http call
   github.getUser(userText)
// -->github클래스의 요소인 github.js의 비동기 함수인 getUser(usertext)를 불러오기 및 실행.
   .then(data => {
// -->.then: promise 메서드로 프로미스가 이행되거나 거부될 때의 callback함수를 호출해준다고 한다.
      if(data.profile.message === 'Not Found') {
// 아래 코드의 경우 if는 거부 될 때('not found')
        // Show alert
        ui.showAlert('User not found', 'alert alert-danger');
// --> 대체 message를 ui에 alert로 출력 

      } else {
// --> 그 외 사용자가 userText를 입력한 경우 ui에 
        // Show profile
        ui.showProfile(data.profile);
        ui.showRepos(data.repos);
        // 여기서 ui.js의 this는 data인가?
        // showrepos(repos)가 불러와 지는 것 같음. repos --> data.repos로 들어가는 듯.
        // 어떤 식으로 동작하는가? ui.js의 코드를 확인해볼 예정.
      }
    })
  } else {
    // Clear profile
    ui.clearProfile();
    //입력이 없는 경우 ui의 clearProfile을 실행하여 초기화.
    // 얘는 어디서 불러와지는거지? --> ui.js에 class UI의 함수가 불러와지는 것.
    // *ui.js의 line 100 참조.
  }
}); 

