const renderDish = async dish => {
    const data = await dish.get()
    console.log(data.data())
}

db.collection('orders').onSnapshot((snapshot) => {
    snapshot.docChanges().forEach(change => {
        renderDish(change.doc.data().dish)
    })
})