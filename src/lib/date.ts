const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Spe', 'Oct', 'Nov', 'Dec']
export const fullMonths = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
export const day = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
]
export function getDay(date: Date) {
    return day[date.getDay()]
}
function currentDate() {
    const date = new Date()
    return ` ${day[date.getDay()]}, ${date.getDate()}  ${months[date.getMonth()]} `
}
export function getTime(date: Date) {
    let hours = date.getHours()
    let ap = hours >= 12 ? 'PM' : 'AM'
    const minutes = date.getMinutes()
    if (hours > 12) {
        hours = hours - 12
    }
    return `${addZero(hours)}:${addZero(minutes)} ${ap}`
}
function addZero(n: number) {
    return n < 10 ? '0' + n : n
}

export function getFormattedDate(date: Date) {
    const dt = date.getDate()
    let suffix = 'th'
    if (dt === 1 || dt === 21 || dt === 31) { suffix = 'st' }
    else if (dt === 2 || dt === 22) { suffix = 'nd' }
    else if (dt === 3 || dt === 23) { suffix = 'rd' }
    return dt + suffix + ' ' + date.toLocaleString('default', { month: 'short' })
}
export function incrementDate(date: Date) {
    let nextDate = new Date(date)
    nextDate.setDate(nextDate.getDate() + 1)
    return nextDate
}

export function getYearMonthDate(date: Date) {
    return date.toISOString().substr(0, 10)
}
export function getISODate(date: Date) {
    return date.toISOString().substr(0, 16)
}

export function getISODateWithTime(dateString: string) {
    let date = new Date(dateString)
    return date.toLocaleString()
}

export function getMonthYear(date: Date) {
    return date.toLocaleString('default', { month: 'long' }) + ' ' + date.getFullYear()
}

export default currentDate
