const user = getUser()
const ordersContainer = document.getElementById('user-orders')

ordersContainer.innerHTML = '<p>Loading...</p>'

const renderOrder = async orderProvider => {
    const dish = await orderProvider.data().dish.get()

    const order = `<li class="collection-item avatar">
        <i class="large material-icons circle red">room_service</i>
        <span class="title">${dish.data().name}</span>
        <p>${dish.data().ingredients}</p>
        <a href="#!" class="secondary-content">
            <i class="material-icons">grade</i>
        </a>
    </li>`

    ordersContainer.innerHTML += order
}

const loadOrders = async userRef => {
    const orders = await db.collection('orders')
        .where('user', '==', userRef)
        .get()

    ordersContainer.innerHTML = ''
    orders.forEach(renderOrder)
}

if (user) {
    const userRef = db.collection('users').doc(user.id)
    loadOrders(userRef)
} else {
    ordersContainer.innerHTML = '<p>No orders...</p>'
}