export default function delay(fn: Function, time = 150) {
    setTimeout(() => {
        fn()
    }, time);
}
export function df(fn: Function, time = 150) {
    return (() => {
        setTimeout(() => {
            fn()
        }, time);
    })
}