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

export const MS_IN_DAY = 86400000

export function shortMonth(month: number) {
    return months[month]
}

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

export function getFormattedDate(date: Date,
    monthType: Intl.DateTimeFormatOptions["month"] = 'short',
    // yearType: "numeric" | "2-digit" | undefined = undefined,
    yearType: Intl.DateTimeFormatOptions["year"] = undefined,

) {
    const dt = date.getDate()
    let suffix = 'th'
    if (dt === 1 || dt === 21 || dt === 31) { suffix = 'st' }
    else if (dt === 2 || dt === 22) { suffix = 'nd' }
    else if (dt === 3 || dt === 23) { suffix = 'rd' }
    return dt + suffix + ' ' + date.toLocaleString('default', { month: monthType, year: yearType })
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
    return date.toLocaleString('default', { month: 'short' }) + ' ' + date.getFullYear()
}
export function getEmojiOfDayByTime() {
    const now = new Date()
    const hour = now.getHours()
    // Return lot of emojis based on time, don's use clouds icons, can use sun or moon
    // return '🌻'
    if (hour >= 0 && hour < 4) return '🌓'
    if (hour >= 4 && hour < 6) return '🌅'
    if (hour >= 6 && hour < 8) return '🌄'
    if (hour >= 8 && hour < 10) return '🌻'
    if (hour >= 10 && hour < 12) return '🌞'
    if (hour >= 12 && hour < 14) return '⛱️'
    if (hour >= 14 && hour < 16) return '☀️'
    if (hour >= 16 && hour < 18) return '🌇'
    if (hour >= 18 && hour < 20) return '🌆'
    if (hour >= 20 && hour < 22) return '🌖'
    if (hour >= 22 && hour < 24) return '🌔'
    return '🌞'
}
export function getEmojiByDay(date: Date) {
    // Return different meaningful depending on the day, like monday is workday, friday is weekend
    const day = date.getDay()
    if (day == 0) return '🥳'
    if (day == 1) return '📚'
    if (day == 2) return '🤓'
    if (day == 3) return '📝'
    if (day == 4) return '🚀'
    if (day == 5) return '🌺'
    if (day == 6) return '🤩'
    return '🤔'
}

export default currentDate
