if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/sw.js')
    .then(reg => {
        // console.log('worker registered', reg)
        return reg
    })
    .catch(err => console.log('worker not registered', err))
}