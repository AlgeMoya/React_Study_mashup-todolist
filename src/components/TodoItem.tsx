// 각 할 일에 대한 정보를 렌더링해주는 컴포넌트
import React from "react";
import styled, {css} from "styled-components";
import {MdDone, MdDelete} from 'react-icons/md'; // 아이콘 불러오기

type TodoItemProps = {
  // id: any;
  done: boolean;
  text: string;
};

interface Container extends TodoItemProps {
  // https://thsd-stjd.tistory.com/134
}

// 휴지통 아이콘을 나타내는 부분. 휴지통 아이콘을 누르면 항목이 삭제된다.
const Remove = styled.div `
    display: flex;
    align-items: center;
    justify-content: center;
    color: #dee2e6;
    font-size: 24px;
    cursor: pointer;
    hover {
        color: #ff6b6b;
    }
    display: none;
`;

// hover 속성을 줘서 마우스를 올리면 휴지통 아이콘이 나타나게 한다.
const TodoItemBlock = styled.div`
    display: flex;
    align-items: center;
    padding-top: 12px;
    padding-bottom: 12px;
    /* TodoItemBlock 위에 커서가 있을 때 Remove 컴포넌트를 보여준다 */
    /* Remove 컴포넌트의 display 속성을 여기서 정하는 걸로 덮어씌우는 것 같다. */
    hover {
        ${Remove} {
            display: initial;
        }
    }
`;

// 좌측에 있는 원을 눌러서 할 일의 완료 정보를 toggle한다.
// styled-component에서 TypeScript 형식의 Props를 쓰기 위해서는 이런 식으로 프롭의 타입을 넘겨줘야 한다.
// https://velog.io/@ecoco97/style-component-props%EC%99%80-typescript
const CheckCircle = styled.div<{done: any}>`
  width: 32px;
  height: 32px;
  border-radius: 16px;
  border: 1px solid #ced4da;
  font-size: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 20px;
  cursor: pointer;

  /* 이렇게도 할 수 있음! */
  /* border: ${(props) => (props.done ? '1px solid #38d9a9' : '1px solid #ced4da')}; */

  ${props =>
    props.done &&
    css`
      border: 1px solid #38d9a9;
      color: #38d9a9;
    `}
`;

// 할 일이 완료되면 텍스트의 색상이 연해진다
const Text = styled.div<{done: any}>`
    flex: 1;
    font-size: 21px;
    color: #495057;
    ${props =>
      props.done &&
      css`
        color: #ced4da;
      `}
`;

// done이 true면 할 일이 완료된 것으로 보고 CheckCircle에 체크 표시를 나타낸다.
function TodoItem({ done, text }: TodoItemProps) {
    return (
      <TodoItemBlock>
        <CheckCircle done={done}>{done && <MdDone />}</CheckCircle>
        <Text done={done}>{text}</Text>
        <Remove>
          <MdDelete />
        </Remove>
      </TodoItemBlock>
    );
  }
  
  export default TodoItem;