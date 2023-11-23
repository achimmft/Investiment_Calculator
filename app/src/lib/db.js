const DEV = true;
    const API_ROOT = DEV
    ? 'http://localhost:3000/'
    : 'https://json-server-ufayi8--3000.local.webcontainer.io/';

async function getCourses() {
    let res = await fetch(`${API_ROOT}courses`)
    let data = await res.json()
    return data
}

async function addCourse(course) {
    let options = {
        method: 'POST',
        body: JSON.stringify(course),
        headers: {
            'Content-Type': 'application/json'
        }
    }
    let res = await fetch(`${API_ROOT}courses`, options)
    let courses = await getCourses()
    console.log("Added course", courses)
}

async function addCourseAndUpdateStore(course, store, setStore) {
    await addCourse(course)
    let data = await getCourses()
    let updated = {...store}
    updated.courses = data
    setStore(updated)
}

async function updateCourseAndUpdateStore(id, update, store, setStore) {
    console.log(`
    Attempting to update course
    id: ${id}
    update: ${JSON.stringify(update)}
    `)
    let options = {
        method: 'PUT',
        body: JSON.stringify(update),
        headers: {
            'Content-Type': 'application/json'
        }
    }
    let params = `id=${id}`
    let res = await fetch(`${API_ROOT}courses/${id}`, options)
    let data = await getCourses()
    let updated = {...store}
    updated.courses = data
    setStore(updated)
}

async function testDb(id) {
    let options = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    }
    let params = `id=${id}`
    let res = await fetch(`${API_ROOT}courses?${params}`, options)
    let data = await res.json()
    // let res = await fetch(API_ROOT + `courses/1`)
    // let data = await res.json()
    // console.log(data)
}

async function getLogs(studentName) {
    let res = await fetch(`${API_ROOT}logs`)
    let data = await res.json()
    if (!studentName) return data
    let courses = await getCourses()
    console.log(`
        Getting logs for ${studentName}
    `)
    return data.filter(log => {
        let course = courses.find(c => c.id === log.courseId)
        // console.log(course)
        if (!course) return
        return (course.students||[]).includes(studentName)
    })
}

async function refreshLogs(store, setStore) {
    let logs = await getLogs(store.user.username)
    setStore(current => {
        current.user.logs = logs
        return current
    })
}

async function getUsers() {
    let res = await fetch(`${API_ROOT}users`)
    let data = await res.json()
    return data
}

async function getUser(username, password) {
    let res = await fetch(`${API_ROOT}users`)
    let data = await res.json()
    let user = data.find(u=> u.username == username && u.password == password)
    return user
}

async function addUser(username, password) {
    let alreadyExists = await getUser(username, password)
    if (alreadyExists) {
        return "User already exists"
    }
    let options = {
        method: 'POST',
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({
            username,
            password,
            uvuId: "",
            id: Math.random()
        })
    }
    let res = await fetch(`${API_ROOT}users`, options)
    if (!res.ok) {
        console.log(res)
        return "Somethign went wrong"
    }
    return res
}

export {
    getCourses,
    addCourse,
    addCourseAndUpdateStore,
    updateCourseAndUpdateStore,
    testDb,
    getLogs,
    refreshLogs,
    getUsers,
    getUser,
    addUser
}