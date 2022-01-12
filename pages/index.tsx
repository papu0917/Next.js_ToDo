import React, { useState } from 'react';
import Header from './components/header'

type Todo = {
    value: string;
    readonly id: number;
    checked: boolean;
    removed: boolean;
}

type Filter = 'all' | 'checked' | 'unchecked' | 'removed';

export default function Home() {
    const [text, setText] = useState('');
    const [todos, setTodos] = useState<Todo[]>([]);
    const [filter, setFilter] = useState<Filter>('all');

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

    const handleOnRemove = (id: number, removed: boolean) => {
        const newTodos = todos.map((todo) => {
            if (todo.id === id) {
                todo.removed = !todo.removed;
            }
            return todo;
        });
        setTodos(newTodos);
    };

    const filteredTodos = todos.filter((todo) => {
        switch (filter) {
            case 'all':
                return !todo.removed;
            case 'checked':
                return todo.checked && !todo.removed;
            case 'unchecked':
                return !todo.checked && !todo.removed;
            case 'removed':
                return todo.removed;
            default:
                return todo;
        }
    });

    const handleOnEmpty = () => {
        const newTodos = todos.filter((todo) => !todo.removed);
        setTodos(newTodos);
    }

    return (

        <div className="container">

            <Header title={`Next.jsで作るToDoアプリ`}></Header>

            <select defaultValue="all" onChange={(e) => setFilter(e.target.value as Filter)}>
                <option value="all">全てのタスク</option>
                <option value="checked">完了したタスク</option>
                <option value="unchecked">現在のタスク</option>
                <option value="removed">ゴミ箱</option>
            </select>
            {filter === 'removed' ? (
                <button onClick={handleOnEmpty}>
                    ゴミ箱を空にする
                </button>
            ) : (
                <form onSubmit={(e) => {
                    e.preventDefault();
                    handleOnSubmit();
                }}
                >
                    <input
                        type="text"
                        value={text}
                        disabled={filter === 'checked'}
                        onChange={(e) => setText(e.target.value)}
                    />
                    <input
                        type="submit"
                        value="追加"
                        disabled={filter === 'checked'}
                        onSubmit={handleOnSubmit}
                    />
                </form>
            )}

            <ul>
                {filteredTodos.map((todo) => {
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
                            <button onClick={() => handleOnRemove(todo.id, todo.removed)}>
                                {todo.removed ? '復元' : '削除'}
                            </button>
                        </li>
                    );
                })}
            </ul>
        </div >
    )
}