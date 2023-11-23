import users from '../lib/users.js'
import _store from '../lib/store.js'
import { useAtom } from 'jotai'
import { useNavigate } from 'react-router-dom'
import { getLogs, getUsers, getUser, addUser } from '../lib/db.js'

function getFormData(form) {
    return Object.fromEntries(new FormData(form))
}

function SignUp() {

    const [store, setStore] = useAtom(_store)
    const navigate = useNavigate()
    
    async function signUpHandler(e) {
        e.preventDefault()
        let formData = getFormData(e.target)
        if (!formData.username || !formData.password || !formData.password2) {
            console.log('All fields required')
            return
        }
        if (formData.password !== formData.password2) {
            console.log('Passwords must match')
            return
        }
        let res = await addUser(formData.username, formData.password)
        if (typeof res === 'string') {
            alert(res)
            return
        }
        alert("Success. You may now log in.")
        window.location.reload()
    }

    async function loginHandler(e) {
        e.preventDefault()
        let formData = getFormData(e.target)
        // let foundUser = users.find(u=>{
        //     return u.username === formData.username && u.password === formData.password
        // })
        let foundUser = await getUser(formData.username, formData.password)
        if (!foundUser) {
            // If no user found
            alert('Invalid user')
            return
        }
        // If user found
        foundUser.logs = await getLogs(
            foundUser.admin ? null : foundUser.username
        )
        let updatedStore = {...store}
        updatedStore.user = foundUser
        localStorage.setItem('student-logs-user', JSON.stringify(foundUser))
        setStore(updatedStore)
        navigate('/')
    }
 
    return (
        <section id="signup">
            <section>
                <h1>Sign Up</h1>
                <form onSubmit={signUpHandler}>
                    <div className="field">
                        <input
                            type="text"
                            placeholder="username"
                            name="username"
                            />
                    </div>
                    <div className="field">
                        <input
                            type="password"
                            placeholder="password"
                            name="password"
                            />
                    </div>
                    <div className="field">
                        <input
                            type="password"
                            placeholder="repeat password"
                            name="password2"
                        />
                    </div>
                    <button >Sign up</button>
                </form>
            </section>
            <section>
                <h1>Log in</h1>
                <form onSubmit={loginHandler}>
                    <div className="field">
                        <input
                            type="text"
                            placeholder="username"
                            name="username"
                        />
                    </div>
                    <div className="field">
                        <input
                            type="password"
                            placeholder="password"
                            name="password"
                            />
                    </div>
                    <button>Log in</button>
                </form>
            </section>
        </section>
    )
}

export default SignUp