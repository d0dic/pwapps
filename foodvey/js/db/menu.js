const renderDish = dish => console.log(dish.data())

db.collection('menu').onSnapshot((snapshot) => {
    snapshot.docChanges().forEach(change => {
        change.doc.data().dishes
            .get().then(dishes => dishes.forEach(renderDish))
    })
})