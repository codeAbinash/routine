export function capitalize(str: string) {
    return str.charAt(0).toUpperCase() + str.slice(1)
}

export const MODAL_BUTTON_TEXT = ['Cancel', 'Ok']


export const vibrantColors7 = [
    '#FF9800', // Orange
    '#FF4081', // Pink
    '#8866FF',  // 
    '#00E676', // Green
    '#03A9F4', // Blue
    '#78caf9', // Purple
    '#FF5252',  // Red
];
const charSet = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ'

export function randomString(n: number) {
    let str = ''
    for (let i = 0; i < n; i++)
        str += charSet[Math.floor(Math.random() * charSet.length)]
    return str
}

export function debounce<T extends any[]>(
    func: (...args: T) => void,
    delay: number = 500
): (...args: T) => void {
    let timeoutId: ReturnType<typeof setTimeout> | null;
    return function debouncedFn(this: any, ...args: T): void {
        if (timeoutId) {
            clearTimeout(timeoutId);
        }

        timeoutId = setTimeout(() => {
            func.apply(this, args);
            timeoutId = null;
        }, delay);
    };
}

export function throttle<T extends (...args: any[]) => void>(
    func: T,
    delay: number = 500
): (...args: Parameters<T>) => void {
    let timeoutId: ReturnType<typeof setTimeout> | null;
    let isThrottled = false;
    let savedArgs: Parameters<T> | null;

    function executeFunc(this: any): void {
        if (savedArgs) {
            func.apply(this, savedArgs);
            savedArgs = null;
            timeoutId = setTimeout(executeFunc, delay);
        } else {
            isThrottled = false;
        }
    }

    return function throttledFn(this: any, ...args: Parameters<T>): void {
        if (isThrottled) {
            savedArgs = args;
        } else {
            func.apply(this, args);
            isThrottled = true;
            timeoutId = setTimeout(executeFunc, delay);
        }
    };
}




export const blank_callback = [() => { }, () => { }]
// export blank_callback