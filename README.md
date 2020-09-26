# 닷지각

> Dodge Angle by 일반인친구들

## 사용법

> 배포서버 주소 : http://j3a504.p.ssafy.io

### PreEnterPage
- 예시 데이터

```
달려라메기님이 로비에 참가하셨습니다.
정보통님이 로비에 참가하셨습니다. 
죽기장인님이 로비에 참가하셨습니다. 
끌라우드템뿔라님이 로비에 참가하셨습니다. 
하이드온부시님이 로비에 참가하셨습니다.
```

- 팀원 리스트 생성
  - 위 예시 데이터를 입장 전 페이지의 `입력창` 에 넣고 `입력 버튼` 을 `클릭`
- 아군 픽 순서 변경
  - 생성된 팀원 리스트 내 `팀원 블럭(파란색)` 을 `드래그`해서 원하는 순서에 `드랍`
  - 이때 팀원 블럭 간 순서 교환이 아닌, 현재 `팀원 블럭을 해당 위치에 삽입`하는 것임에 유의
- 포지션 지정
  - 팀원 블럭 내 `포지션 이미지`를 `클릭` 해서 포지션 지정
- "나"를 지정
  - 팀원 블럭 좌측의 `원형 이미지를` `클릭` 하여 `나` 를 지정
- `메인화면으로 이동`을 클릭하여 이동
  - 메인화면은 미구현

### MainPage

- 챔피언 검색
    - 화면 중앙 상단의 `입력창`에 이름으로 검색
- 챔피언 선택
    - `챔피언 이미지` `클릭`시 총 10개의 유저 목록 표시
    - `유저 목록` `클릭` 시 선택된 챔피언을 해당 유저에게 지정
## 프로젝트 개요

- **진행기간** : 2020.08.31 ~ 2020.10.08
- **목표**
  - 손 대면 톡~ 하고 트롤할 것 같은 그대~를 피하고 싶은 유저,
  - 즐겜러들 사이에서 고통받고 싶지 않은 유저,
  - 상대 픽의 약점인 카운터픽을 찾아 승리를 쟁취하고 싶은 유저 ,
  - 팀의 부족한 점을 채워주는 픽을 통해 승리에 기여하고 싶은 유저,
  - 이 모든 브실골 유저들을 위한 웹사이트 만들기

- **웹사이트 이름** : Dodge Angle (닷지각)

## 주요 사용 기술 스택 및 프레임워크

### FrontEnd

- React.js
- Redux

### BackEnd

- Django
- MySQL

### Infra

### <img src="./images/README/infra.png" alt="infra.png" style="zoom: 50%;" />

## 주요 기능

#### 닷지각

- 해당 게임을 진행할지 닷지할지 추천

#### 승률예측

- 아군 유저의 정보와 챔피언 픽을 활용하여 경기 승부 예측

#### 추천시스템

- 밴픽에 도움이 되는 여러 정보를 제공
  - 카운터 픽
  - 찰떡궁합 픽
  - 밸러스 픽

## 팀원 소개

> 일반인친구들

- <img src="./images/README/yuen_ashe.jpg" style="zoom:25%;" /> 박유은
  - BackEnd
- <img src="./images/README/hyeonjun_teemo.jpg" style="zoom:25%;" /> 장현준
  - FrontEnd
- <img src="./images/README/myeonju_amumu.jpg" style="zoom:25%;" /> 정명주
  - BackEnd
  - Infra
- <img src="./images/README/jinhwan_heimerdinger.jpg" style="zoom:25%;" /> 조진환
  - BackEnd
- <img src="./images/README/yeonbu_blitzcrank.jpg" style="zoom:25%;" /> 차영부
  - FrontEnd