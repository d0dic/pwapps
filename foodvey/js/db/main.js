
const setMyOrders = ordersData => {
    orders = ordersData
}

const renderOrder = async order => {
    const dish = await order.data().dish.get()
    document.getElementById('last-order')
        .innerText = `Dish name: ${dish.data().name}`
}

fetchMyOrders = async userId => {
    const userRef = db.collection('users').doc(userId)
    const orders = await db.collection('orders')
        .where('user', '==', userRef)
        .get()

    // render only last dish
    if (orders.docs.length > 0) {
        renderOrder(orders.docs[orders.docs.length - 1])
        setMyOrders(orders.docs)
    }
}

const renderUser = ({ name, balance }) => {
    document.getElementById('user-name').innerText = `${name}`
    document.getElementById('user-balance').innerText = `${balance} RSD`
}

// set first user as default
db.collection('users').get().then(users => {

    const userData = users.docs[0]
    const user = { id: userData.id, ...userData.data() }

    setUser(user)

    fetchMyOrders(user.id)
    renderUser(user)
})