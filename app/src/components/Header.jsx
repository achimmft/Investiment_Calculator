import { Link, useNavigate } from 'react-router-dom'
import _store from '../lib/store.js';
import { useAtom } from 'jotai'

function Header() {

    const navigate = useNavigate()
    const [store, setStore] = useAtom(_store)

    function signOut() {
        navigate('/')
        localStorage.removeItem('student-logs-user')
        window.location.reload()
    }

    return (
        <header>
            <h1>Class Logs</h1>
            <h2>
                Hello, {store.user?.username || "guest"}!
            </h2>
            <nav>
                <Link to="/">
                    Home
                </Link>
                {store.user ? (
                    <>
                        {store.user?.admin ? (
                            <>
                                <Link to="/add-course">
                                    Add course
                                </Link>
                            </>
                        ) : (
                            <>
                                <Link to="/join-course">
                                    Join course
                                </Link>
                            </>
                        )}
                        <button onClick={signOut}>
                            Sign out
                        </button>
                    </>
                ) : (
                    <>
                        <Link to="/signup">
                            Login / Signup
                        </Link>
                    </>
                )}
            </nav>
        </header>
    )
}

export default Header;