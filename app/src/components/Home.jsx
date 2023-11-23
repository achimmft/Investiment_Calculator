import { useAtom } from 'jotai'
import _store from '../lib/store.js'
import Course from './Course.jsx'
import Log from './Log.jsx'

export default function Home(){

    const [store, setStore] = useAtom(_store)
    const visibleCourses = (store.courses||[]).filter(c => {
        return store.user?.admin || (c.students||[]).includes(store.user?.username)
    })
    // console.log("Visible courses", visibleCourses)

    return (
        <>
             {!store.user && (
                <>
                    <p>Log in to see the courses</p>
                </>
             )}
             {store.user && (
                <>
                    <section className='card-area'>
                        <h2>Courses</h2>
                        <section id="courses" className='card-grid'>
                            {visibleCourses.map(course => (
                                <Course key={course.id} course={course} />
                            ))}
                        </section>
                    </section>
                    <section className='card-area'>
                        <h2>Logs</h2>
                        <section id="logs" className='card-grid'>
                            {store.user.logs.map((log, i) => (
                                <Log key={`log-${i}`} log={log} />
                            ))}
                        </section>
                    </section>
                </>
             )}
        </>
    )
}