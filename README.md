# timer
(1) 타이머만들기 
⇨ useRef, useEffect, useState 사용하여 구현할 것 
⇨ 시작.중지.리셋 10초 30초 뒤

리액트 공식문서 참고
https://ko.reactjs.org/docs/hooks-faq.html#what-can-i-do-if-my-effect-dependencies-change-too-often



useRef?
reference 값을 참조하고있으니 리랜더 하지마
기억, 캐싱.
리랜더해도 그대로 사용할 거야
(*클로저)

useEffect?
생명주기에는 시작과 끝이 있다.

무대효과 감독이라고 생각하면됨

내가원하는 시점에
적절한 시기에 효과를 넣는 것.

useCallback?
함수를 저장하는 것



<useEffect()>

[]빈배열
빈 종속성, []는 컴포넌트가 마운트 될 때마다 effect가 한 번만 실행되고 매번 렌더링 시에는 실행되지 않음을 의미

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
이 콜백은 매초 setCount(0 + 1)를 호출하므로 카운트가 1을 초과하지 않습니다.
[count] 시 변한다. but , 변경될 때마다 간격이 재설정됩니다. 
=> setInterval


setInterval(콜백함수, 초단위설정1000)


setInterval 함수의 반환값을 변수에 할당해두고,
clearInterval(변수)를 호출하여 반복을 중단하고,
다시 setInterval로 재시작해주면 된다.

이를 해결하기 위해 setState의 함수 컴포넌트 업데이트 폼을 사용할 수 있습니다. 현재 state를 참조하지 않고 state를 변경해야 하는 방법을 지정할 수 있습니다.


