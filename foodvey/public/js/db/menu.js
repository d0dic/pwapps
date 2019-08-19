let dishes = []
let dishNameFilter = null

const user = getUser()

const dishSearchForm = document.getElementById('dish-search')
const menuStatus = document.getElementById('menu-status')
const menuContainer = document.getElementById('menu-dishes')
menuStatus.innerText = 'Loading...'

const clearSearch = () => {
    dishNameFilter = null
    dishSearchForm.reset()
    renderMenu()
}

const increaseBalance = price => {

    const increaseBy = firebase.firestore.FieldValue.increment(price);
    db.collection('users').doc(user.uid).update({
        balance: increaseBy,
    })
}

const getFormattedDate = () => {

    const today = new Date()
    let dd = today.getDate();
    let mm = today.getMonth() + 1; //January is 0!

    const yyyy = today.getFullYear();
    if (dd < 10) {
        dd = '0' + dd;
    }
    if (mm < 10) {
        mm = '0' + mm;
    }

    return dd + '/' + mm + '/' + yyyy
}

const orderDish = (dishId, price) => {

    if (!user) {
        return alert('You have to be logged in so you can proceed with order!');
    }

    const confirmOrder = confirm(
        `This will increase your debt to supplier for ${price} RSD, do you agree?`
    )

    if (!confirmOrder) {
        return
    }

    db.collection('orders').add({
        user: user.uid,
        dish: db.collection('dishes').doc(dishId),
        created_at: getFormattedDate(),
    })
        .then(() => {
            alert('Order has been sent to provider. Thank you!')
            increaseBalance(price)
        })
        .catch(err => {
            alert('Order failed for some reason. Please try later!')
            console.log('Order failed: ', err)
        })
}

const renderDish = async dishProvider => {
    let dish = await dishProvider.get()
    const dishName = dish.data().name.toLowerCase()
    
    if (dishNameFilter && !dishName.includes(dishNameFilter)) {
        return
    }

    const dishRender = `<div class="col s12 m6">
        <div class="card">
            <div class="card-image">
                <img src="/images/food.jpg">
                <span class="card-title">${dish.data().name}</span>
                <a class="btn-floating halfway-fab waves-effect waves-light red" 
                    onclick="orderDish('${dish.id}', ${dish.data().price})">
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
    menuStatus.innerText = ''

}

const searchDishes = evt => {

    evt.preventDefault()

    const name = dishSearchForm.dishName.value

    if (!name) {
        return
    }

    dishNameFilter = name.toLowerCase()

    renderMenu('No matches...')
}

const renderMenu = (status = '') => {

    menuStatus.innerText = status
    menuContainer.innerHTML = ''

    dishes.forEach(renderDish)
}

const loadMenu = async () => {

    const menu = await db.collection('menu')
        .where('day', '==', getDayName())
        .get()

    if (menu.empty) {
        menuStatus.innerText = 'No dishes ready for today...'
        return
    }

    dishes = menu.docs[0].data().dishes
    renderMenu()
}

dishSearchForm.addEventListener('submit', searchDishes)
loadMenu()