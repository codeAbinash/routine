import details from "../info"

let reqCount = 0

const ls = {
    get: (item: string) => {
        return localStorage.getItem(details.name + item)
    },
    set: (item: string, data: string) => {
        return localStorage.setItem(details.name + item, data)
    },
    clear: () => {
        for (let elem in localStorage) {
            if (elem.startsWith(details.name)) localStorage.removeItem(elem)
        }
    }
}

export default ls