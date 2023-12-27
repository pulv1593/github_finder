class UI {
  //UI 클래스 선언
  constructor() {
    //ui의 객체의 초기상태
    this.profile = document.getElementById('profile');
    //
  }

  // Display profile in UI
  showProfile(user) {
  // showProfile (user)
  // ui의 profile에 innerHTML을 이용해 html을 입력해주기 위한 코드
  // this는 user인가? 그렇다면 user.profile은 getElemetById에 의해 index.html에서 id='profile'을 가져오는 것?
    this.profile.innerHTML = `
      <div class="card card-body mb-3">
        <div class="row">
          <div class="col-md-3">
            <img class="img-fluid mb-2" src="${user.avatar_url}">
            <a href="${user.html_url}" target="_blank" class="btn btn-primary btn-block mb-4">View Profile</a>
          </div>
          <div class="col-md-9">
            <span class="badge badge-primary">Public Repos: ${user.public_repos}</span>
            <span class="badge badge-secondary">Public Gists: ${user.public_gists}</span>
            <span class="badge badge-success">Followers: ${user.followers}</span>
            <span class="badge badge-info">Following: ${user.following}</span>
            <br><br>
            <ul class="list-group">
              <li class="list-group-item">Company: ${user.company}</li>
              <li class="list-group-item">Website/Blog: ${user.blog}</li>
              <li class="list-group-item">Location: ${user.location}</li>
              <li class="list-group-item">Member Since: ${user.created_at}</li>
            </ul>
          </div>
        </div>
      </div>
      <h3 class="page-heading mb-3">Latest Repos</h3>
      <div id="repos"></div>
    `; // 위의 내용은 div에 input될 html이다. 저 $는 어떤 거였더라? user에 대한 정보는 github에서 불러오는 것일터.
    // user.xxx는 github 웹사이트의 변수명을 이용한것인가? 어떤 사이드에 요청할 때 해당 웹사이트의 html을 뜯어 value가 저장되어있는 이름을 확인해야 되는가?
    // 아니라면 저 변수들은 어디서 불러와지는가?(별도의 user에 대한 지정은 따로 해주지 않았을텐데??)
  }
  // ${}이게 뭐였지? 기억이 잘 안난다;;

  // Show user repos
  showRepos(repos) {
    // 사용자가 입력한 userText에 해당하는 id를 갖는 user의 최근 repo를 불러와 html에 입력해주는 부분인듯함.
    let output = '';
    //-->output 변수 초기화. 이전에 저장된 output값을 초기화 해주기 위함인 듯.

    repos.forEach(function(repo) {
      // forEach로 repos_count(*count=5)만큼 반복실행하여 최근 5개의 repo를 불러와 output에 저장.
      output += `
        <div class="card card-body mb-2">
          <div class="row">
            <div class="col-md-6">
              <a href="${repo.html_url}" target="_blank">${repo.name}</a>
            </div>
            <div class="col-md-6">
            <span class="badge badge-primary">Stars: ${repo.stargazers_count}</span>
            <span class="badge badge-secondary">Watchers: ${repo.watchers_count}</span>
            <span class="badge badge-success">Forks: ${repo.forms_count}</span>
            </div>
          </div>
        </div>
      `;
      // output에 저장된 1개의 repo의 html. count 1개마다 저 html이 한번씩 저장됨.
      // +=는 output = output + XXXX의 축약 표현
    });

    // Output repos
    document.getElementById('repos').innerHTML = output;
    // foreach로 불러와 저장된 output을 index.html에 작성
    // **** 얘는 index.html에서 어느 부분에 작성되는 거지?
    // line 41의 div profile에 profile 아래에 기입되는건가? 그러면 단락구분은 어떻게? 
    // 작성된 html에 의해 단락이 구분되는 걸까? 근데 그러면 <h1>latest repo</h1>는 언제 작성되는거지?
    // 별도의 입력이 없는데...?
  }

  // Show alert message
  showAlert(message, className) {
    // userText로 user  data를 불러오지 못했을 경우 alert를 표기해주기 위한 함수의 소스코드
    // Clear any remaining alerts
    this.clearAlert();
    // this는? --> message('User not found')? className('alert alert-danger')? 아니면 ui?
    // 해결: app.js line 38 ui.showAlert로 보아 this = ui이다.

    // Create div
    const div  =  document.createElement('div');
    // div는 왜 만든거지? 요소를 왜 만들어준걸까?
    // 

    // Add classes
    div.className = className;

    // Add text
    div.appendChild(document.createTextNode(message));
    // div의 요소 맨뒤에 text 요소를 추가해 준듯하다. message는 'User not found'

    // Get parent
    const container =  document.querySelector('.searchContainer');
    // container에 querySelctor를 이용해 index.html의 line 26의 searchContainer를 불러옴.
    // 부모요소를 불러온것 같은데...? 왜지?

    // Get search box
    const search = document.querySelector('.search');

    // Insert alert
    container.insertBefore(div, search);
    // insertBefore란??
    // --> 특정위치 앞에 노드를 삽입할수 있게 해주는 함수. 
    // --> 지금의 경우 기준이 되는 노드는 search / 삽입될 노드는 상단의 div
    // 이렇게 작성했을때 html에 어떻게 작성되는가?
    // <div class='className(=alert alert-danger)'>
    //    User not found
    // </div>

    // Timeout after 3 sec
    setTimeout(() => {
      this.clearAlert();
    }, 3000);
    // 3초가 지난 이후 alert가 제거됨.
    // **this = ui? 상단에 this가 ui라 여기도 ui일 것이라 생각됨. 아닌가?
  }

  // Clear alert message
  clearAlert() {
    // 생성된 alert를 초기화해주기 위해 작성된 함수
    const currentAlert = document.querySelector('.alert');
    // currentAlert는 현재 작성된 alert로 class가 .alert인 부분을 불러오면 됨.
    // why? className에 alert와 alert-danger가 저장되어있기때문.
    // alert를 호출하면 class : alert가 불러와짐 
    if(currentAlert){
      currentAlert.remove();
      // 만약 현재 alert가 저장되어 있으면 if문 아래 코드가 수행됨
      // remove()는 요소를 삭제한다. 위의 경우 currentAlert
    }
  }

  // Clear profile
  clearProfile() {
    this.profile.innerHTML = '';
    //profile 초기화
  }
}