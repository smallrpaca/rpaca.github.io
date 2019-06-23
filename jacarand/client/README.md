<h1> 업데이트 내용 기록 </h1>

<h2> V 0.0.2 </h2> 19.06.12 <br />
  - 기존 작성된 코드 수정 <br/>
  - MobX를 사용한 상태관리 시작 <br/>
    + 로그인 페이지 ON / OFF ( file : Login.js , TopBar.js ) <br/>
  - 로그인 페이지 CSS 추가 <br/>

<h2> V 0.0.3 </h2> 19.06.13 <br />
  - 기존 작성된 코드 수정 <br/>
    + MeetBar.js : wishgender 내용 삭제 => GenderList.js 파일 추가 <br/>
  - 파일 추가 <br/>
    + GenderList.js <br/>
    + InterestList.js <br/>
    + GenderList.css <br/>
    + InterestList.css <br/>
  - 파일명 변경 <br/>
    + LoginOnOff.js => OnOff.js <br/>
    + 파일명 변경에 따른 일부 코드 수정 <br/>
  - 추후 계획 (완료일 미정) <br/>
    + 로그인 기능 구현(구글, 페이스북 API 활용 + 자체 회원 DB) <br/>
    + 페이지 구현 : 프로필, 채팅페이지(text, voice), 설정, 이에따른 서브페이지... <br/>

<h2> V 0.0.4 </h2> 19.06.16 <br />
  - 기존 작성된 코드 수정 <br />
    + Home.js : 커밍순 화면 구현 ( 웹 배포 : 기타 사항 확인 ) <br />
    + Adv.js : 페이지마다 표시 광고창 구현 (+css 포함) <br />
    + GenderList.js : 성별 체크박스 클릭 후 close 누르면 리셋되던 현상 수정 <br />
      : Store(MobX)에 OnOff.js 상태 추가 => genderFemaleValue, genderFemaleOnOff, genderMaleValue, genderMaleOnOff <br />
    + index.html <br />
      : meta 태그 추가 => title, desc, keywords, og, favicon, robots, Google Analytics, Google Ads <br />
  - 파일 추가 <br />
    + subpages : MeetVideo.js, Profile.js => Css 구현 필요 <br />
    + public : favicon.ico, robots.txt, sitemap.xml

<h1> 기타 사항 </h1>
<h2> 웹 배포 </h2>
  - Google App Engine 사용 <br />
    + express 서버 구현 <br />
  - 웹 추적 : 구글 애널리틱스 <br />
  - 웹 최적화 확인 : 네이버 웹 마스터 도구 <br />
  - 배포 전 파일 추가 <br />
    + favicon.ico : 파비콘 웹 상단 태그 아이콘 표시 <br /> 
    + robots.txt : 검색 로봇들이 웹사이트 내용을 확인하고 감 / 내용에 sitemap 표시 <br />
    + sitemap.xml : robots.txt와 비슷...(?) <br />
