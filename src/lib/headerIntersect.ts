export default function headerIntersect( element: Element, setIsIntersecting: Function,) {
    new IntersectionObserver((entry) => {
        setIsIntersecting(entry[0].isIntersecting)
    }).observe(element)
}