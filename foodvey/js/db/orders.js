const renderDish = dish => console.log(dish.data())

db.collection('orders').onSnapshot((snapshot) => {
    snapshot.docChanges().forEach(change => {
        change.doc.data()
            .dish.get().then(renderDish)
    })
})