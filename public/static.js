async function registerSW() {
    if ('serviceWorker' in navigator) {
        try {
            const registration = navigator.serviceWorker.register('sw.js')
            console.log('Service Worker Registered')
        } catch (error) {
            console.warn("Error Registering Service Worker")
            console.log(error)
        }
    } else
        console.log('Service worker is not available for this device')
}
registerSW()
console.log('Static Code')


function absorbEvent_(event) {
    var e = event || window.event;
    e.preventDefault && e.preventDefault();
    e.stopPropagation && e.stopPropagation();
    e.cancelBubble = true;
    e.returnValue = false;
    return false;
}

window.addEventListener('load', ()=>{
    console.log('Loaded')
    document.body.addEventListener('contextmenu', absorbEvent_)
})