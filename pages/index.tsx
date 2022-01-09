import { useState } from 'react';
import Header from './components/header'

type Todo = {
    value: string,
}

export default function Home() {
    const [text, setText] = useState('');

    return (
        <div>
            <Header title={`Next.js!!!`}></Header>
            <form onSubmit={(e) => e.preventDefault()}>
                <input
                    type="text"
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                />
                <input
                    type="submit"
                    value="追加"
                    onSubmit={(e) => e.preventDefault()}
                />
            </form>
        </div>
    )
}