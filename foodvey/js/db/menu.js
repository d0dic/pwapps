const renderDish = async dishProvider => {
    const dish = await dishProvider.get()
    const dishData = dish.data()

    const frame = `<div class="col s12 m6">
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

    document.getElementById('menu-dishes').innerHTML += frame
}

db.collection('menu').onSnapshot((snapshot) => {
    snapshot.docChanges().forEach(change => {
        change.doc.data().dishes.forEach(renderDish)
        // console.log(change.doc.data())
    })
})