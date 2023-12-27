// Github 클래스 선언.
class Github {
  // constructor는 객체 내에 선언하여 객체의 초기상태를 설정할 수 있음.
  constructor() {
    this.client_id = '198e4ba389985c4b13a2';
    this.client_secret = 'c66b2f2ea78920af4ed85ac9237410e475ce1d4f';
    this.repos_count = 5;
    this.repos_sort = 'created: asc';
  }

  //비동기 async 이용한 코드
  async getUser(user) {
    const profileResponse =
    //const profileResponse에 fetch(비동기로 웹사이트에 요청하고 그 응답을 받아오는 함수)로 정보를 받아와 저장. await은 웹사이트에서 정보 요청 여부가 결정될때까지 대기.
      await fetch(
        `https://api.github.com/users/${user}?client_id=${this.client_id}&client_secret=${this.client_secret}`
      );

    const repoResponse =
    //const repoResponse도 await fetch ('link')비동기 요청을 통해 정보를 받아온다.
      await fetch(
        `https://api.github.com/users/${user}/repos?per_page=${this.repos_count}&sort=${this.repos_sort}&client_id=${this.client_id}&client_secret=${this.client_secret}`
      );

    const profile = await profileResponse.json();
    // json을 이용해 문자열로 profile에 값이 저장되는 것.
    // json에 대해 정확히 이해가 안된것같음. 강의를 추가적으로 들어보고 다시 오자...
    const repos = await repoResponse.json();
    // json을 이용해 문자열로 repo에 웹사이트의 응답으로 받아온 값이 저장되는 것.(상단 const profile과 동일.)

    return {
      profile,
      repos
      // getUser 함수로부터 profile과 repos가 반환되어진다.
      // 여기서 반환된 profile과 repos는 app.js의 line 31~50에서 사용될 것.
    }
  }
}