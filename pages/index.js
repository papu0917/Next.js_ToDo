import Header from './components/header'


export default function Home() {
    return (
        <div>
            <Header title={`Next.js!!!`}></Header>
            <form onSubmit={(e) => e.preventDefault()}>
                <input type="text" value="" onChange={(e) => e.preventDefault()} />
                <input
                    type="submit"
                    value="追加"
                    onSubmit={(e) => e.preventDefault()}
                />
            </form>
        </div>
    )
}