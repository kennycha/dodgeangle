# <img src="./images/README/logo.png" alt="logo.png" style="zoom: 40%;" />

> Dodge Angle by 일반인친구들

## ✏️ 사용법

> 배포서버 주소 : http://j3a504.p.ssafy.io

### 1. PreEnterPage
- 예시 데이터

```
섭섭한면상님이 로비에 참가하셨습니다.
Keep oaring KR님이 로비에 참가하셨습니다.
쑤 택님이 로비에 참가하셨습니다.
옆집에사는뽀로로님이 로비에 참가하셨습니다.
모 까님이 로비에 참가하셨습니다.
```

- 팀원 리스트 생성
  - 위 예시 데이터를 입장 전 페이지의 `입력창` 에 넣고 `팀원 입력 완료`버튼 을 `클릭`
- 아군 픽 순서 변경
  - 생성된 팀원 리스트 내 `팀원 블럭` 을 `드래그`해서 원하는 순서에 `드랍`
  - 이때 팀원 블럭 간 `Swap`임에 유의
- 포지션 지정
  - 팀원 블럭 내 `포지션 이미지`를 `클릭` 해서 포지션 지정
  - 
- "본인"을 지정
  - 팀원 배치가 완료되면 `팀원 배치 완료` 버튼을 클릭 하면 "본인"을 지정하는 모달 창이 팝업
  - "본인"에 해당하는 블럭을 `클릭`하여 "본인"을 지정
- `밴픽화면으로 이동`버튼을 클릭하여 이동

### 2. MainPage

- 챔피언 검색 & 포지션별 보기
    - 화면 중앙 상단의 `입력창`에 이름으로 검색
    - `포지션`버튼을 클릭하여 포지션별 챔피언 리스트만 보기 가능
- (밴픽공통) 챔피언 선택
    - `챔피언 이미지` `클릭`시 10명의 유저와 각각 매치되는 `픽`버튼 팝업
    - 해당하는 `픽`버튼 `클릭` 시 선택된 챔피언을 해당 유저에게 지정
- 페이즈 변경
    - 초기 페이즈는 `벤`
    - 벤 완료후 중앙의 `벤 완료` 버튼을 클릭 시, alert 창이 팝업되고 `확인`버튼을 누르면  `픽` 페이즈로 변경
    - 픽 완료후 중앙의 `픽 완료` 버튼을 클릭 시, alert 창이 팝업되고 `확인`버튼을 누르면  `완료` 페이즈로 변경
## 📆 프로젝트 개요

- **진행기간** : 2020.08.31 ~ 2020.10.08
- **목표**
  - 손 대면 톡~ 하고 트롤할 것 같은 그대~를 피하고 싶은 유저,
  - 즐겜러들 사이에서 고통받고 싶지 않은 유저,
  - 상대 픽의 약점인 카운터픽을 찾아 승리를 쟁취하고 싶은 유저 ,
  - 팀의 부족한 점을 채워주는 픽을 통해 승리에 기여하고 싶은 유저,
  - 이 모든 브실골 유저들을 위한 웹사이트 만들기

- **웹사이트 이름** : Dodge Angle (닷지각)

## 🔧 주요 사용 기술 스택 및 프레임워크

### FrontEnd

- React.js
- Redux

### BackEnd

- Django
- MySQL

  ### Infra

### <img src="./images/README/infra.png" alt="infra.png" style="zoom: 50%;" />

## 📖 주요 기능

#### 닷지각

- 해당 게임을 진행할지 닷지할지 추천

#### 승률예측

- 아군 유저의 정보와 챔피언 픽을 활용하여 경기 승부 예측

#### 추천시스템

- 밴픽에 도움이 되는 여러 정보를 제공
  - 예상 픽
  - 카운터 픽
  - 추천 픽

## 팀원 소개

> 일반인친구들

- <img src="./images/README/yuen_ashe.jpg" style="zoom:10%;" /> 박유은
  - BackEnd
- <img src="./images/README/hyeonjun_teemo.jpg" style="zoom:10%;" /> 장현준
  - FrontEnd
- <img src="./images/README/myeonju_amumu.jpg" style="zoom:10%;" /> 정명주
  - BackEnd
  - Infra
- <img src="./images/README/jinhwan_heimerdinger.jpg" style="zoom:10%;" /> 조진환
  - BackEnd
- <img src="./images/README/yeonbu_blitzcrank.jpg" style="zoom:10%;" /> 차영부
  - FrontEnd

## ⚙️Install and Usage

### FrontEnd

```bash
cd frontend
npm install
npm start
```

### BackEnd