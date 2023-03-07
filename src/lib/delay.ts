export default function delay(fn: Function, time = 150) {
    setTimeout(() => {
        fn()
    }, time);
}