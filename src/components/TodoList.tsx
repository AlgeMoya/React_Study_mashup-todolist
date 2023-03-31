// 할 일에 대한 정보가 들어 있는 todos 배열을
// 내장함수 map으로 여러 TodoItem 컴포넌트로 렌더링해주는 컴포넌트
import React from "react";
import styled from "styled-components";
import TodoItem from "./TodoItem";
import { useTodoState } from './TodoContext'; 

const TodoListBlock = styled.div`
    flex: 1; /* 자신이 차지할 수 있는 영역을 꽉 채운다 */
    padding: 20px 32px;
    padding-bottom: 48px;
    overflow-y: auto;
    /* background: gray; 사이즈 조정이 잘 되고 있는지 확인하기 위한 임시 스타일 */
`;

function TodoList() {
    const todos = useTodoState();

    return (
    <TodoListBlock>
        {todos.map(todo => (
            <TodoItem
                key={todo.id}
                id={todo.id}
                text={todo.text}
                done={todo.done}
             />
        ))}
        {/* 
        <TodoItem text="프로젝트 생성하기" done={true}></TodoItem>
        <TodoItem text="컴포넌트 스타일링 하기" done={true}></TodoItem>
        <TodoItem text="Context 만들기" done={false}></TodoItem>
        <TodoItem text="기능 구현하기" done={false}></TodoItem>
        */}
    </TodoListBlock>
    )
}

export default TodoList;