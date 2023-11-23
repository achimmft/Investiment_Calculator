import { atom } from 'jotai'

const initialStore = {
    user: null,
    darkTheme: false
}


const store = atom(initialStore)

export default store