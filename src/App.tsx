import { useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import { createGlobalStyle } from 'styled-components';
import TodoTemplate from './components/TodoTemplate';
import TodoHead from './components/TodoHead';
import TodoList from './components/TodoList';
import TodoCreate from './components/TodoCreate';
import { TodoProvider } from './components/TodoContext'

// styled-component에서 특정 컴포넌트가 아닌 전역 스타일을 설정할 때는
// createGlobalStyle을 써서 만든 컴포넌트를 렌더링해주면 된다.
const GlobalStyle = createGlobalStyle`
  body {
    background: #e9ecef;
  }
`;

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="App">
      <TodoProvider>
        <GlobalStyle />
          <TodoTemplate>
            <TodoHead />
            <TodoList />
            <TodoCreate />
          </TodoTemplate>
      </TodoProvider>
    </div>
  )
}

export default App
