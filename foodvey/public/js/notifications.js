
const displayNotification = async () => {
    const swReg = await navigator.serviceWorker.getRegistration()

    const options = {
        body: 'Thank you for accepting our notifications!',
        actions: [
            { action: 'explore', title: 'Check for promotions?' },
            { action: 'close', title: 'No, Thanks!' },
        ],
        data: { key: 1 },
    }

    swReg.showNotification('Hello from Foodvey :)', options)
}

const requestPermission = () => {

    if (Notification.permission === 'granted') {
        displayNotification()
        return
    }

    Notification.requestPermission()
}

// randomize notifications
if (Math.random() > 0.75) {
    requestPermission()
}