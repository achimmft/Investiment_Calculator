import '../style/Course.css'
import _store from '../lib/store.js'
import { useAtom } from 'jotai'
import { updateCourseAndUpdateStore, getLogs, refreshLogs } from '../lib/db'

export default function Course({course, showDropOut}) {

    const [store, setStore] = useAtom(_store)

    async function dropOut(course) {
        const update = {...course}
        update.students.splice(update.students.indexOf(store.user.username), 1)
        updateCourseAndUpdateStore(course.id, update, store, setStore)
        refreshLogs(store, setStore)
    }

    return (
        <div className="course card">
            <div>ID: {course.id}</div>
            <div>Course: {course.display}</div>
            {showDropOut && (
                <button onClick={()=>{dropOut(course)}}>
                    Drop out
                </button>
            )}
        </div>
    )
}