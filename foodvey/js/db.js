let orders = []

let menu = {}
let user = {}

const renderOrder = async order => {
    const dish = await order.data().dish.get()
    document.getElementById('last-order').innerText = `Dish name: ${dish.data().name}`
    // console.log(`Dish: ${dish.data().name}, ID: ${dish.id}`)
}

getMyOrders = async userId => {
    const userRef = db.collection('users').doc(userId)
    const orders = await db.collection('orders')
        .where('user', '==', userRef)
        .get()

    orders.forEach(renderOrder)
}

const renderUser = ({ name, balance }) => {
    document.getElementById('user-name').innerText = `${name}`
    document.getElementById('user-balance').innerText = `${balance} RSD`
}

const setUser = userData => {
    // trigger render
    user = { id: userData.id, ...userData.data() }

    localStorage.setItem('user', JSON.stringify(user))

    getMyOrders(user.id)
    renderUser(user)
}

const getUser = () => JSON.parse(localStorage.getItem('user'))

db.collection('users').get()
    .then((snapshot) => snapshot.forEach(setUser))