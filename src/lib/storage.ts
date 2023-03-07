import details from "../info"

const ls = {
    get: (item: string) => localStorage.getItem(details.name + item),
    set: (item: string, data: string) => localStorage.setItem(details.name + item, data),
    clear: () => {
        for (let elem in localStorage) {
            if(elem.startsWith(details.name)) localStorage.removeItem(elem)
        }
    }
}

export default ls