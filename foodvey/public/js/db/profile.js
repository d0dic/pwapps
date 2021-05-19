
const renderOrder = async order => {
    const dish = await order.data().dish.get()
    document.getElementById('last-order')
        .innerText = `Dish name: ${dish.data().name}`
}

const fetchMyOrders = async userId => {
    const orders = await db.collection('orders')
        .where('user', '==', userId)
        .get()

    // render only last dish
    if (orders.docs.length > 0) {
        renderOrder(orders.docs[orders.docs.length - 1])
    }
}

const fetchMyBalance = async userId => {
    const user = await db.collection('users').doc(userId).get()
    document.getElementById('user-balance').innerText = `${user.data().balance} RSD`
}

const renderUser = ({ displayName, photoURL }) => {
    document.getElementById('user-name').innerText = displayName
    if (photoURL) {
        document.getElementById('user-image')
            .innerHTML = `<img class="responsive-img circle" src="${photoURL}" alt="No image"/>`
    }
}

const user = getUser()

if (!user) {
    window.location.assign('/pages/login.html')
}

fetchMyBalance(user.uid)
fetchMyOrders(user.uid)
renderUser(user)