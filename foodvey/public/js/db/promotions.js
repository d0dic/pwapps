let promotion = null
const promoter = document.getElementById('promo-button')
const promoTitle = document.getElementById('promo-title')
const promoDesc = document.getElementById('promo-description')

const loadPromotions = async (day) => {

    let query = db.collection('promotions')
        .where('day', '==', day)

    const promotions = await query.get()

    if (promotions.empty) {
        return
    }

    promoter.style = 'display: block'
    promotion = promotions.docs[0].data()

    const dish = await promotion.dish.get()

    promoTitle.innerText = promotion.name
    promoDesc.innerHTML = `
        <p>Today ${dish.data().name} only for: ${promotion.price} RSD!</p>
        <p>Ingredients: ${dish.data().ingredients}</p>
    `
}

const hidePromo = () => {
    promoter.style = 'display: none'
}

const getPromo = () => {
    orderDish(promotion.dish.id, promotion.price)
    hidePromo()
}
    
loadPromotions(getDayName())