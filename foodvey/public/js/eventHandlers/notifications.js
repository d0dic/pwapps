// Notification handlers

self.addEventListener('notificationclick', ({ action, notification }) => {
    if (action === 'explore') {
        clients.openWindow(`http://localhost?key=${notification.data.key}`)
    } else {
        notification.close()
    }
})