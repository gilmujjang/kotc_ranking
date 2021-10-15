# Play, And[Play, &]

## 개요
테니스 동아리 활동과 Ello Rating System에 착안하여 시작한 프로젝트입니다.<br />
Play And 라는 이름은 즐겁게 운동한 이후의 여운을 해소한다는 의미를 함축적으로 표현하였습니다.

![main](https://user-images.githubusercontent.com/48178101/127119650-2146d1e0-5aad-48b0-aa9b-d38c2ed66ba6.png)
___
## 제작자
https://github.com/gilmujjang : Admin 페이지와 Ello Rating System 담당<br />
https://github.com/Hyeon-Gwang : 메인 페이지와 Public 페이지 담당

2인 제작이며 모두 프론트엔드 개발을 하기에 백엔드는 파이어베이스를 이용하였습니다.
___
## 사용 기술
<img src="https://img.shields.io/badge/HTML-eb4d4b?style=for-the-badge&logo=HTML5&logoColor=white">&nbsp;
<img src="https://img.shields.io/badge/CSS-22a6b3?style=for-the-badge&logo=CSS3&logoColor=white">&nbsp;
<img src="https://img.shields.io/badge/Next.JS-30336b?style=for-the-badge&logo=Next.js&logoColor=white"/>&nbsp;
<img src="https://img.shields.io/badge/FIREBASE-f9ca24?style=for-the-badge&logo=Firebase&logoColor=white">&nbsp;
<img src="https://img.shields.io/badge/Semantic UI React-eb4d4b?style=for-the-badge&logo=Semantic UI React&logoColor=white">
___

## 특징
프론트엔드는 Next JS, 백엔드는 파이어베이스를 이용하였습니다.
기능적인 특징으로는 레이팅 책정, 랭킹 확인, 게시판, 멤버 상세정보 확인 기능이 있습니다.

![리스트_censored](https://user-images.githubusercontent.com/48178101/127119925-b2d3ef4e-b70b-4e76-8dc3-2a2ce5337a6a.jpg)
![상세_censored](https://user-images.githubusercontent.com/48178101/127119940-771c6186-3709-4028-a97b-ec19919f59ef.jpg)
___

# 레이팅 책정 방법 (ELO)
## ELO 시스템의 가정
1. A가 B를 10배 이기고 B가 C를 2배 이기면 A는 C를 20배 이긴다. -> 실력이 경기결과에 미치는 영향이 선형적이다.
2. 승률이 10배 차이나면 Rating은 400점 차이나게 한다. -> Rating과 실력은 로그차트를 그린다. (400점은 임의적임)

## ELO 시스템 공식
![image](https://user-images.githubusercontent.com/40172373/137491719-9acc1e13-706e-42fd-989b-e93aa2c11c06.png)
단식의 경우 이렇지만 복식의 경우 생각하기가 까다로웠다.
게임 데이터는 2021.02 ~ 2021.06 기간동안 10명의 190여경기의 데이터를 수집해 입력후 나온 결과를 보고 이래저래 조작해 본 결과
복식의 경우 양 팀의 레이팅을 계산후 단식과 마찬가지로 레이팅을 증감한다.
다만 이때 실력차가 크거나 상성에 따라 경기능력이 상이할 것이다. 그래서 레이팅 차이가 클수록 레이팅 반영이 작아지도록 설정했다. 
복식의 경우 각 팀의 레이팅은 레이팅이 낮은 사람을 2배 가중하는 가중평균을 구했다. Rating=(R1+2*R2)/3   (이때 R1 > R2)

## ELO 사용처
통칭 엘로 시스템은 상당히 많은 곳에서 쓰인다. 공식적 으로는 체스의 레이팅시스템, FIFA 등에서 쓰인다.
온라인 게임에서는 Match Making Rating 통칭 MMR, 레이팅, 티어 등의 이름으로 사용된다.

# 버전 정보
## v1
- 구글을 통한 회원가입
- 그룹 생성/가입 가능
- 그룹 멤버들의 레이팅 순위 확인 가능
- 그룹 멤버들에 한하여 멤버들의 개인기록(경기기록, 레이팅 변화, 전적) 확인 가능
- 그룹 관리자에 한하여 멤버의 경기기록 추가 가능
- 포스팅 가능
- 주의!
  - 그룹에 가입한 사람(멤버)과 관리자가 생성한 플레이어는 별도의 존재
  - 멤버는 그룹 페이지 접속 권한과 포스팅 권한만 있을뿐
  - 관리자가 그룹 내의 플레이어 정보를 생성하고 관리해주어야 함
