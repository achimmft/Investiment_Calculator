import { useAtom } from "jotai"
import _store from '../lib/store.js'
import { addCourseAndUpdateStore } from "../lib/db"

function getFormData(form) {
    return Object.fromEntries(new FormData(form))
}

function AddCourse() {

    const [store, setStore] = useAtom(_store)

    function submitCourse(e) {
        //prevent the browser from reloading
        e.preventDefault()

        // Read the form data
        const formData = getFormData(e.target)
        // console.log("This is form data", form)
        if (
            !formData.id ||
            !formData.display
        ) {
            alert('all fields required')
            return
        }

        if (!isUnique(formData)) {
            alert('course already exists')
            return
        }

        addCourseAndUpdateStore(formData, store, setStore)
    }

    function isUnique(data) {
        return store.courses.every(course => {
            return course.id !== data.id && course.display !== data.display
        })
    }

    return (
        <>
            <h1>Add course</h1>
            <form method="post" onSubmit={submitCourse}>
                <div className="field">
                    <input type="text" 
                    placeholder="course Id" 
                    name="id"/>
                </div>
                <div className="field">
                    <input type="text"
                     placeholder="course display name" 
                     name="display"/>
                </div>
                <button>Add course</button>
            </form>
        </>
    )
}

export default AddCourse