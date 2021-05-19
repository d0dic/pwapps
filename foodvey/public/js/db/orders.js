const user = getUser()
const ordersState = document.getElementById('orders-state')
const ordersContainer = document.getElementById('user-orders')

ordersState.innerText = 'Loading...'

const renderOrder = async orderProvider => {
    const dish = await orderProvider.data().dish.get()

    const order = `<li class="collection-item avatar">
        <i class="large material-icons circle red">room_service</i>
        <span class="title">${dish.data().name}</span>
        <p>${dish.data().ingredients}</p>
        <a href="#!" 
            class="secondary-content tooltipped" 
            data-tooltip="${orderProvider.data().created_at}"
            data-position="left" 
        >
            <i class="material-icons">calendar_today</i>
        </a>
    </li>`

    ordersContainer.innerHTML += order

    setTooltips()
}

const filterOrders = date => loadOrders(user.uid, date)

const loadOrders = async (userId, date) => {

    let query = db.collection('orders')
        .where('user', '==', userId)

    if (date) {
        query = query.where('created_at', '==', date)
    }

    const orders = await query.get()

    ordersContainer.innerHTML = ''
    ordersState.innerText = ''

    if (orders.empty) {
        ordersState.innerText = 'No orders...'
        return
    }

    orders.forEach(renderOrder)
}

if (!user) {
    window.location.assign('/pages/login.html')
}
    
loadOrders(user.uid)