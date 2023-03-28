// 투두리스트의 레이아웃을 설정하는 컴포넌트
import React, { PropsWithChildren } from "react";
import styled from 'styled-components';

// 페이지의 중앙에 그림자가 적용된 흰색 박스를 보여준다.
const TodoTemplateBlock = styled.div`
    width: 512px;
    height: 768px;
    
    position: relative; /* 추후 박스 하단에 추가 버튼을 위치시키기 위한 설정 */
    background: white;
    border-radius: 16px;
    box-shadow: 0 0 8px 0 rgba(0, 0, 0, 0.04);

    margin: 0 auto; /* 페이지 중앙에 나타나도록 설정*/

    margin-top: 96px;
    margin-bottom: 32px;
    display: flex;
    flex-direction: column;

    color: black;
`;

// 복습!: 컴포넌트 태그 사이에 넣은 값을 조회할 때는 props.children을 조회한다.
function TodoTemplate({children}: PropsWithChildren) {
    return <TodoTemplateBlock>{children}</TodoTemplateBlock>
}

export default TodoTemplate;