import _store from '../lib/store.js'
import {useAtom} from 'jotai'
import { updateCourseAndUpdateStore, testDb, refreshLogs } from '../lib/db.js'
import Course from './Course.jsx'

testDb("cs3380")


export default function JoinCourse() {

    const [store, setStore] = useAtom(_store)

    function handleJoin(e) {
        //prevent the browser from reloading
        e.preventDefault()
        const formData = Object.fromEntries(new FormData(e.target))
        let courseIndex = store.courses.findIndex(c => c.id === formData.id)
        if (!store.courses[courseIndex].students) {
            store.courses[courseIndex].students = []
        }
        if (store.courses[courseIndex].students.includes(store.user.username)) {
            alert("You have already joined this course")
            return
        }
        let updated = {...store.courses[courseIndex]}
        updated.students.push(store.user.username)
        updateCourseAndUpdateStore(formData.id, updated, store, setStore)
        refreshLogs(store, setStore)
    }

    let studentCourses = (store.courses||[]).filter(c => (c.students||[]).includes(store.user?.username))

    return (
        <>
            <section className="card-area">
                <h2>Join course</h2>
                <form onSubmit={handleJoin}>
                    <select name="id">
                        {store.courses && store.courses.map(course => (
                            <option key={course.id} value={course.id}>{course.display}</option>
                        ))}
                    </select>
                    <button id="btn">
                        Join course
                    </button>
                </form>
            </section>
            <section className="card-area">
                <h2>Your courses</h2>
                <div id="student-courses" className='card-grid'>
                    {studentCourses.map(c => (
                        <Course
                            key={c.id}
                            course={c}
                            showDropOut={true}
                        />
                    ))}
                </div>
            </section>
        </>
    )
}