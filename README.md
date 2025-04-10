# 202030334 한동렬


## 04월 10일 수업내용
```
react-1 submain 브랜치에서 틱택토 내용 readme 와 js파일 수정
```
## 04월 03일 수업내용
### 화면업데이트하기
- unstate로부터 현재의 state를 지정할 수 있는 변수인 count와 이름 업데이트할 수 있는 함수인 setCount를 얻을 수 있습니다.
- 변수이름과 변수 이름 앞에 set을 붙인 업데이트 함수를 관용적으로 사용

### Hook 사용하기
- use로 시작하는 함수를 Hook이라고 함
- usestate는 React에서 제공하는 내장 Hook임
- 다른 내장 Hook은 API 참고서에서 찾아볼 수 있음
- 또한 기존의 것들을 조합하여 자신만의 Hook 작성할 수 있음
- Hook은 다른 홤수보다 더 제한적
``` 
- component 또는 다른 Hook의 상단에서만 Hook을 호출할 수 있음.
- 조건이나 반복문에서 useState를 사용하고 싶다면 새 컴포넌트를 추출하여 그곳에 넣으세요.
```

### Hook 사용규칙
- 최상위에서만 호출해야함
- if, for, while 등의 블록 내부에서 Hooks를 호출하면 안 됨
- 함수의 조건문 내부에서 호출하면 실행 순서가 달라질 수 있기 떄문
- React 함수형 component 또는 사용자 Hook 내부에서만 사용 가능
```
React의 동작을 예측가능하고, 안정성을 높이기 위해 필요한 규칙입니다.
- rendering 순서를 보장하기 위해
- 불필요한 사이드 이펙트 방지
```

### 왜 function형 컴포넌트에만 Hook을 사용할까?
- Class형 component는 lifecycle 함수를 통해서 상태 관리를 했습니다.
- 그런 이유 떄문에 Class형 component는 유지보수가 어렵고 복잡해질 수 있었습니다.
- React는 component의 상태 관리와 로직을 더 간결하게 만들기 위해 Hooks를 도입함. 



## 03월 27일 수업내용

### Component의 생성 및 nesting(중첩)
- component는 고유한 로직, 모양을 가진 ui일부
- component는 버튼처럼 작을 수도 있고, 전체 페이지처럼 클 수도 있습니다.
- component는 마크엄을 반환하는 javascript 함수웁니다.
- Nesting은 CSS 선택자의 중첩구조를 생각하면 쉽게 이해가능

### export dafault와 export의 차이
```
Name Exports
- 하나의 파일안에 여러개의 component가 있을 때 사용
- component를 사용하는 쪽에서는 component 정확한 이름을 반드시 명시

default Exports
- 하나의 파일안에서 하나의 component만 내보내는 경우 사용
- component를 사용하는 쪽에서는 어떤 이름을 사용해도 됨
```

### JSX로 마크업 작성
- JSX는 HTML보다 더욱 엄격한 문법을 적용 합니다.
- JSX에서는 <"br" />같이 싱글 태그라도 태그를 닫아여 합니다
- React에서는 여러 개의 component를 JSX 태그로 반활할 수 있습니다.

### 스타일 추가하기
- React에서는 className으로 CSS 클래스를 지정합니다.
- className은 HTML의 class 속성과 동일한 방식으로 동작합니다.
- CSS규칙은 별도의 CSS 파일에 작성합니다. 그런데 React는 CSS 파일을 추가하는 방법을 규정하지는 않습니다.
> 정적 페이지를 작성할 때와 동일한 방법 지원
- 가장 간단한 방법은 HTML에 <'link'> 태그를 추가하는 것입니다.

### 데이터 표시하기
- JSX를 사용하면 자바스크립트에 마크업을 넣을 수 있습니다.
> 반대 아닌가? JS안의 마크업 안에 JS를 넣는 다는 것이 더 정확
- JSX코드 내에서 JavaScript로 탈출하여 변수나 표현식 사용하는 것
-이 방법을 "Escape Back"이라고 합니다.
- {} 중괄호 사용해서 변수나 표현식을 사용자에게 표시하도록 하는것


### 리스트 렌더링하기
- 컴포넌트 리스트를 렌더링하기 위해서는 for문 및 map()함수와 같은 자바스크립트 기능을 사용합니다.
- <'li'>에 key속성이 있는 것을 주목하세요
- 목록을 사용할 때는 각 항목에 대해 고유하게 식별하는 문자열 또는 숫자를 전달해야 합니다.
- 항목을 삽입,삭제, 또는 재정렬할 떄 어떤 일이 일어났는지 알기 위해 key를 사용합니다.

# 
## 03월 20일 수업내용
