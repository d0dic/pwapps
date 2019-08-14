const menuContainer = document.getElementById('menu-dishes')
menuContainer.innerHTML = '<p>Loading...</p>'

const renderDish = async dishProvider => {
    let dish = await dishProvider.get()
    const dishData = dish.data()

    dish = `<div class="col s12 m6">
        <div class="card">
            <div class="card-image">
                <img src="/images/food.jpg">
                <span class="card-title">${dishData.name}</span>
                <a class="btn-floating halfway-fab waves-effect waves-light red"><i
                        class="material-icons">add</i></a>
            </div>
            <div class="card-content">
                <p>${dishData.ingredients}</p>
                <p>Price: <span class="badge">${dishData.price} RSD</span></p>
            </div>
        </div>
    </div>`

    menuContainer.innerHTML += dish
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