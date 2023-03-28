import React, {createContext, Dispatch, MutableRefObject, PropsWithChildren, useContext, useReducer, useRef} from "react";

// 상태를 위한 타입
type State = {
    id: number;
    text: string;
    done: boolean;
}

const initialTodos: State[] = [
    {
        id: 1,
        text: '프로젝트 생성하기',
        done: true
    },
    {
        id: 2,
        text: '컴포넌트 스타일링하기',
        done: true,
    },
    {
        id: 3,
        text: 'Context 만들기',
        done: false
    },
    {
        id: 4,
        text: '기능 구현하기',
        done: false
    }
];

// 모든 액션들을 위한 타입
// 타입스크립트에서는 리듀서가 받을 수 있는 액션들을 미리 정의해줘야 한다. 
type Action =
  | { type: 'CREATE'; todo: State[] }
  | { type: 'TOGGLE'; id: number }
  | { type: 'REMOVE'; id: number }

// 디스패치를 위한 타입 (Dispatch 를 리액트에서 불러올 수 있음), 액션들의 타입을 Dispatch 의 Generics로 설정
type SampleDispatch = Dispatch<Action>;

// 리듀서
// 입력받는 State와 반환되는 State가 배열임에 주의!
function todoReducer(state: State[], action: Action): State[] {
    switch (action.type) {
        case 'CREATE':
            return state.concat(action.todo);
        case 'TOGGLE':
            // todo의 형식이 이미 State로 들어왔기 때문에 내부의 형을 지정해줄 필요가 없다.
            // todo에 괄호 주의!
            return state.map((todo) =>
                todo.id === action.id ? {...todo, done: !todo.done}: todo
            );
        case 'REMOVE':
            return state.filter((todo) => todo.id !== action.id);
        default:
            throw new Error(`Unhandled action type`);
            // 아래는 js에서만 사용 가능
            // throw new Error(`Unhandled action type: ${action.type}`);
    }
}

// Context 만들기. 괄호 안에는 초기값 입력(타스에서는 필수)
const TodoStateContext = createContext<State[]>(initialTodos);
const TodoDispatchContext = createContext<SampleDispatch | null>(null);
const TodoNextIdContext = createContext<MutableRefObject<number> | null>(null);

type Props = {
    children: React.ReactNode
}

export function TodoProvider ({children}: Props) {
    const [state, dispatch] = useReducer(todoReducer, initialTodos);
    const nextId = useRef(5);

    return (
        <TodoStateContext.Provider value={state}>
          <TodoDispatchContext.Provider value={dispatch}>
            <TodoNextIdContext.Provider value={nextId}>
                {children}
            </TodoNextIdContext.Provider>
          </TodoDispatchContext.Provider>
        </TodoStateContext.Provider>
      );
}

// 여기서 만든 seTodoState, useTodoDispatch, useTodoNextId Hook을 사용하려면
// 해당 컴포넌트들이 TodoProvider 컴포넌트 내부에 감싸져서 렌더링되어야 한다.
// 만약 TodoProvicer로 감싸져있지 않다면 오류를 발생시킨다.
export function useTodoState() {
    const context = useContext(TodoStateContext)
    if (!context) {
        throw new Error('Cannot find TodoProvider')
    }
    return context;
}

export function useTodoDispatch() {
    const context = useContext(TodoDispatchContext)
    if (!context) {
        throw new Error('Cannot find TodoProvider')
    }
    return context;
}

export function useTodoNextId() {
    const context = useContext(TodoNextIdContext)
    if (!context) {
        throw new Error('Cannot find TodoProvider')
    }
    return context;
}