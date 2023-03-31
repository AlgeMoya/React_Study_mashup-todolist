// 새로운 할 일을 등록할 때 쓰는 컴포넌트

//  TodoTemplate의 하단부에 초록색 원 버튼을 렌더링한다

// 클릭하면 할 일을 입력하는 폼이 나타나고, 버튼을 다시 누르면 폼이 사라진다

import React, {useState} from "react";
import styled, {css} from "styled-components";
import { MdAdd } from "react-icons/md";
import { useTodoDispatch, useTodoNextId } from "./TodoContext";

const CircleButton = styled.button<{open: boolean}>`
  background: #38d9a9;
  hover {
    background: #63e6be;
  }
  active {
    background: #20c997;
  }

  z-index: 5;
  cursor: pointer;
  width: 80px;
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 60px;
  position: absolute;
  left: 45%;
  bottom: 0px;
  transform: translate(-50%, 50%);
  color: white;
  border-radius: 50%;
  border: none;
  outline: none;

  transition: 0.125s all ease-in;
  ${(props) =>
    props.open &&
    css`
      background: #ff6b6b;
      &:hover {
        background: #ff8787;
      }
      &:active {
        background: #fa5252;
      }
      transform: translate(-50%, 50%) rotate(45deg);
    `}
`;

const InsertFormPositioner = styled.div`
  width: 100%;
  bottom: 0;
  left: 0;
  position: absolute;
`;

const InsertForm = styled.form`
  background: #f8f9fa;
  padding-left: 32px;
  padding-top: 32px;
  padding-right: 32px;
  padding-bottom: 72px;
  border-bottom-left-radius: 16px;
  border-bottom-right-radius: 16px;
  border-top: 1px solid #e9ecef;
`;

const Input = styled.input`
  padding: 12px;
  border-radius: 4px;
  border: 1px solid #dee2e6;
  width: 100%;
  outline: none;
  font-size: 18px;
  box-sizing: border-box;
`;

function TodoCreate() {
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState('');

    const dispatch = useTodoDispatch();
    const nextId = useTodoNextId();

    const onToggle = () => setOpen(!open);
    const onChange = (e: { target: { value: React.SetStateAction<string>; }; }) => setValue(e.target.value);
    const onSubmit = (e: { preventDefault: () => void; }) => {
      e.preventDefault(); // 새로고침 방지
      // console.log(typeof(nextId.current));
      dispatch({
        type: 'CREATE',
        todo: {
          id: nextId.current,
          text: value,
          done: false
        }
      });
      setValue('');
      setOpen(false);
      nextId.current += 1;
    }
     
    return (
        <>
          {open && (
            <InsertFormPositioner>
              <InsertForm onSubmit={onSubmit}>
                <Input
                  autoFocus
                  placeholder="할 일을 입력 후, Enter 를 누르세요" 
                  onChange={onChange}
                  value={value}
                  />
              </InsertForm>
            </InsertFormPositioner>
          )}
          <CircleButton onClick={onToggle} open={open}>
            <MdAdd />
          </CircleButton>
        </>
      );
}

// TodoContext에서 관리하는 State가 바뀔 때의 TodoCreate의 불필요한 리렌더링을 방지한다.
// 만약 Context를 하나만 만들었다면 이런 최적화 방법은 사용할 수 없다.
export default React.memo(TodoCreate);

/*
만약 state와 dispatch를 하나의 context로 만들었다면,
TodoCreate를 open한 상태에서 이미 존재하는 todo를 toggle한다면
TodoCreate는 리렌더링이 일어날 겁니다.
왜냐하면 TodoCreate가 state도 useContext로 받아오고 있기 때문이죠.
TodoCreate입장에선 TodoState는 불필요하기 때문에,
굳이 받아올 필요가 없고 더군다나 리렌더링이 일어나게 한다면
더더욱 분리하는 것이 좋습니다.
*/