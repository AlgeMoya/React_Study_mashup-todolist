// 오늘의 날짜와 요일, 앞으로 해야 할 일을 보여주는 컴포넌트
import React from "react";
import styled from "styled-components";
import { useTodoState } from "./TodoContext";

const TodoHeadBlock = styled.div`
    padding-top: 48px;
    padding-left: 32px;
    padding-right: 32px;
    padding-bottom: 24px;
    border-bottom: 1px solid #e9ecef;

    h1 { 
        margin: 0;
        font-size: 36px;
        color: #343a40;
    }

    .day {
        margin-top: 4px;
        color: #868e96;
        font-size: 21px;
    }

    .tasks-left {
        color: #20c997;
        font-size: 18px;
        margin-top: 40px;
        font-weight: bold;
    }
`

// 내부 내용들은 컴포넌트가 아닌 일반 HTML 태그로 구현했다.
// 조건부 스타일링을 할 필요가 없고 기능적으로 딱히 역할이 없다면
// 컴포넌트 대신 생짜 HTML과 CSS 선택자도 훌륭한 대안이다.
function TodoHead() {
    const todos = useTodoState();
    console.log(todos);
    return (
        <TodoHeadBlock>
            <h1>2019년 7월 10일</h1>
            <div className="day">수요일</div>
            <div className="tasks-left">할 일 2개 남음</div>
        </TodoHeadBlock>
    );
}

export default TodoHead;