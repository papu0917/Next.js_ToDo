import React, { useState } from 'react';
import Header from './components/header'

type Todo = {
    value: string,
    readonly id: number,
}

export default function Home() {
    const [text, setText] = useState('');
    const [todos, setTodos] = useState<Todo[]>([]);

    const handleOnSubmit = () => {
        if (!text) return;
        const newTodo: Todo = {
            value: text,
            id: new Date().getTime(),
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
                                type="text"
                                value={todo.value}
                                onChange={(e) => handleOnEdit(todo.id, e.target.value)}
                            />
                        </li>
                    );
                })}
            </ul>
        </div >
    )
}