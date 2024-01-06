# timer

(1) 타이머만들기
⇨ useRef, useEffect, useState 사용하여 구현할 것
⇨ 시작.중지.리셋 10초 30초 뒤

리액트 공식문서 참고
https://ko.reactjs.org/docs/hooks-faq.html#what-can-i-do-if-my-effect-dependencies-change-too-often

사용자가 입력한 값 가져오기
00:00:00 형태!

✅(1) 타이머 보이기 버튼을 누르면 타이머가 '마운트'되며 alert로 Tada!가 나타나야해요.
✅(2) 숨기기 버튼을 누르면 타이머가 '언마운트'되며 alert로 Okay, Bye...가 나타나야해요.
✅(3) 타이머에는 시작, 중지, 초기화, 10초 증가가 있어요!

    - 시작: 타이머가 시작됩니다. 중지 상태에서 시작버튼을 누르면 타이머가 재시작 됩니다.

-   중지: 타이머가 중지됩니다 (시간 고정)
-   초기화: 타이머가 0으로 초기화 됩니다. 타이머가 실행 중이었다면 타이머가 중지됩니다.
-   10초 증가: 타이머 실행, 중지 여부와 상관없이 10초가 증가합니다.

✅(4) 카운트가 UI에서 증가할 때마다 "증가되었습니다, {count}"가 출력 되어야해요.
✅(5) useRef를 사용하지 않아도 구현이 가능합니다. 그러나 ref, effect, state를 모두 사용해야해요.

---

```
1/6회고)
오 어쩌다보니 다 끝냈다. 기분이 좋습니다
리액트 업데이트된 공식문서 너무 좋아요.
블로그에 한 번 써보고 싶어요 ㅎㅎ
과제를 진행하며 지금까지 나에게 너무 부족한 것이 많았다는 것을 알게되었습니다
자기주도학습을 진행하면서 최대한 매워봐야겠어요

특히나 useEffect와 useRef와 전보다 친해진 거 같아서 좋습니다
useEffect의 효과주는 시기라던가 (마운트, 언마운트, 의존성배열)
Ref=참조값이니 어디 기록해뒀다가 사용하는 이런 느낌을
알아가는 거 같아 뿌듯합니다..!

```

---

useRef?
reference 값을 참조하고있으니 리랜더 하지마
기억, 캐싱.
리랜더해도 그대로 사용할 거야
(\*클로저)
컴포넌트 생애 주기에 상관없이 state가 현재 값을 가질 수 있도록 하는 훅
🔴따라서 useRef는 렌더링 시 이용하는 것이 아니라, 콘솔 확인이나 alert 알림, 조건문 등에 사용하는 것이 적합
https://calm-lee.tistory.com/310
https://react.dev/reference/react/useRef

(참조가 구성 요소의 시각적 출력에 영향을 주지 않는 정보를 저장하는 데 적합하다는 것을 의미합니다.)
=> 참조 내부의 값 변경하려면 current속성 수동 업데이트 해야함

---

useEffect?
생명주기에는 시작과 끝이 있다.

무대효과 감독이라고 생각하면됨

내가원하는 시점에
적절한 시기에 효과를 넣는 것.

---

useCallback?
함수를 저장하는 것

---

<useEffect()>

[]빈배열
빈 종속성, []는 effect가 한 번만 실행되고 매번 렌더링 시에는 실행되지 않음을 의미

```
function Counter() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setCount(count + 1); // 이 effect는 'count' state에 따라 다릅니다
    }, 1000);
    return () => clearInterval(id);
  }, []); // 🔴 버그: `count`가 종속성으로 지정되지 않았습니다

  return <h1>{count}</h1>;
}
```

count 값이 0으로된 클로저 생성
이 콜백은 매초 setCount(0 + 1)를 호출하므로 카운트가 1을 초과하지 않는다.
[count] 시 변한다. but , 변경될 때마다 간격이 재설정된다.
그러면 의존성 배열 안의 count 값 변경과 useEffect 안의 count 값 변경이 동시에 일어나면서 무한루프에 빠지게 된다.
렌더링이 지직이는 것은 물론이고, 브라우저에 부하를 일으켜 나중엔 먹통이 된다.

💡 setInterval

setInterval(콜백함수, 초단위설정1000)
=> 계속 반복되는 애니메이션을 처리할 때 사용
=> 버튼을 누를 시 중지할 수 있도록 ID값 보유해야한다.

setInterval 함수의 반환값을 변수에 할당해두고,
clearInterval(변수)를 호출하여 반복을 중단하고, (중지!)
'unmount'할때 return값을 실행하면서 timer가 clear된다.
다시 setInterval로 재시작해주면 된다.

이를 해결하기 위해 setState의 함수 컴포넌트 업데이트 폼을 사용할 수 있습니다.
현재 state를 참조하지 않고 state를 변경해야 하는 방법을 지정할 수 있습니다.
=> 업데이트 함수가 현재 상태와 정확히 동일한 값을 반환한다면 바로 뒤에 일어날 리렌더링은 완전히 건너뛰게 됩니다.
https://ko.legacy.reactjs.org/docs/hooks-reference.html#functional-updates

useEffect안에서의 return?
useEffect안에서 실행되었던 코드가 clean-up되고 새로 무언가를 다시 그리고 싶을때 return을 사용한다. setInterval 함수같은 경우가 대표적이다

Date.prototype.toISOString()
https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Date/toISOString

Date.now() 메소드는 UTC 기준으로 1970년 1월 1일 0시 0분 0초부터 현재까지 경과된 밀리초를 반환합니다.
https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Date/now
