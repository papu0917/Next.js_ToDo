import React, { useState } from 'react';
import Header from './components/header'

type Todo = {
    value: string;
    readonly id: number;
    checked: boolean;
    removed: boolean;
}

export default function Home() {
    const [text, setText] = useState('');
    const [todos, setTodos] = useState<Todo[]>([]);

    const handleOnSubmit = () => {
        if (!text) return;
        const newTodo: Todo = {
            value: text,
            id: new Date().getTime(),
            checked: false,
            removed: false,
        };
        setTodos([newTodo, ...todos]);
        setText('');
    };

    const handleOnChange = () => (e: React.ChangeEvent<HTMLInputElement>) => {
        setText(e.target.value);
    }

    const handleOnEdit = (id: number, value: string) => {
        const newTodos = todos.map((todo) => {
            if (todo.id === id) {
                todo.value = value;
            }
            return todo;
        });
        setTodos(newTodos);
    };

    const handleOnCheck = (id: number) => {
        const newTodos = todos.map((todo) => {
            if (todo.id === id) {
                todo.checked = !todo.checked;
            }
            return todo;
        });
        setTodos(newTodos);
    };

    const handleOnRemove = (id: number) => {
        const newTodos = todos.map((todo) => {
            if (todo.id === id) {
                todo.removed = !todo.removed;
            }
            return todo;
        });
        setTodos(newTodos);
    };

    return (
        <div>
            <Header title={`Next.js!!!`}></Header>
            <form onSubmit={(e) => {
                e.preventDefault();
                handleOnSubmit();
            }}
            >
                <input
                    type="text"
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                />
                <input
                    type="submit"
                    value="追加"
                    onSubmit={handleOnSubmit}
                />
            </form>
            <ul>
                {todos.map((todo) => {
                    return (
                        <li key={todo.id}>
                            <input
                                type="checkbox"
                                disabled={todo.removed}
                                checked={todo.checked}
                                onChange={() => handleOnCheck(todo.id)}
                            />
                            <input
                                type="text"
                                disabled={todo.checked || todo.removed}
                                value={todo.value}
                                onChange={(e) => handleOnEdit(todo.id, e.target.value)}
                            />
                            <button onClick={() => handleOnRemove(todo.id)}>
                                {todo.removed ? '復元' : '削除'}
                            </button>
                        </li>
                    );
                })}
            </ul>
        </div >
    )
}