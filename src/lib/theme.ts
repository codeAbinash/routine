export function applyTheme(theme: 'dark' | 'light' | 'default') {
    document.documentElement.classList.remove('dark')
    localStorage.theme = theme
    if (theme === 'dark')
        document.documentElement.classList.add(theme)
    else if (theme === 'default')
        localStorage.removeItem('theme')
    else
        document.documentElement.classList.remove('dark')
    loadTheme()
}

export function loadTheme() {
    if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
        document.documentElement.classList.add('dark')
    } else {
        document.documentElement.classList.remove('dark')
    }
}