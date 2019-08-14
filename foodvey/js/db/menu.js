const user = getUser()
const menuContainer = document.getElementById('menu-dishes')
menuContainer.innerHTML = '<p>Loading...</p>'

const orderDish = dishId => {

    if (!user) {
        // TODO: Provide login page
        return alert('You have to be logged in so you can proceed with order!');
    }

    db.collection('orders').add({ 
        user: db.collection('users').doc(user.id),
        dish: db.collection('dishes').doc(dishId),
    })
    // TODO: Increase users balance
    .then(() => alert('Order has been sent to provider. Thank you!'))
    .catch(err => {
        alert('Order failed for some reason. Please try later!')
        console.log('Order failed: ', err)
    })
}

const renderDish = async dishProvider => {
    let dish = await dishProvider.get()

    const dishRender = `<div class="col s12 m6">
        <div class="card">
            <div class="card-image">
                <img src="/images/food.jpg">
                <span class="card-title">${dish.data().name}</span>
                <a class="btn-floating halfway-fab waves-effect waves-light red" 
                    onclick="orderDish('${dish.id}')">
                    <i class="material-icons">add</i>
                </a>
            </div>
            <div class="card-content">
                <p>${dish.data().ingredients}</p>
                <p>Price: <span class="badge">${dish.data().price} RSD</span></p>
            </div>
        </div>
    </div>`

    menuContainer.innerHTML += dishRender
}

db.collection('menu').onSnapshot((snapshot) => {
    snapshot.docChanges().forEach(change => {
        const dishes = change.doc.data().dishes

        if (!dishes.length) {
            menuContainer.innerHTML = '<p>No dishes...</p>'
            return
        }

        menuContainer.innerHTML = ''
        dishes.forEach(renderDish)
    })
})