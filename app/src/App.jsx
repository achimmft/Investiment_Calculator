import Home from './components/Home.jsx'
import Header from './components/Header.jsx'
import SignUp from './components/SignUp.jsx'
import JoinCourse from './components/JoinCourse.jsx'
import AddCourse from './components/AddCourse.jsx'
import { Route, Routes, useNavigate } from 'react-router-dom'
import _store from './lib/store.js'
import { useAtom } from 'jotai'
import { useEffect } from 'react'
import { getCourses, refreshLogs } from './lib/db.js'


/*
    Pages needed
        - Login/signup
        - Add course page (admin only)
        - Add student to course page (admins + students)

    npm i react-router-dom
    npm i jotai

    Routes
        Route path="/" element={<Component />}
        Route
        Route
        Route
*/


function App() {
  
  const [store, setStore] = useAtom(_store)
  const navigate = useNavigate()
  
  function checkToken() {
    let ls = localStorage.getItem('student-logs-user')
    let token = ls ? JSON.parse(ls) : null
    setStore(current => {
      current.user = token
      return current
    })
    if (store.user) {
      refreshLogs(store, setStore)
    }
  }
  
  useEffect(()=>{
        getCourses()
        .then(data=>{
            setStore(current => {
              current.courses = data
              return current
            })
            if (!store.user) {
              navigate('/')
              checkToken()
            } else {
            }
        })
    },[])

    return (
      <>
        <Header />
        <main>
           <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/signup" element={<SignUp />}/>
                <Route path="/add-course" element={<AddCourse />}/>
                <Route path="/join-course" element={<JoinCourse />}/>
           </Routes>
        </main>
      </>
    )
  }
  
export default App
  