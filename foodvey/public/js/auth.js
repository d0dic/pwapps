const errorContainer = document.getElementById('login-error')
const provider = new firebase.auth.GoogleAuthProvider();

const registerUser = async userId => {

    const userData = await db.collection('users').doc(userId).get()

    if (userData.exists) {
        window.location.assign('/')
        return
    }

    db.collection('users').doc(userId).set({ 
        balance: 0,
    })
    // TODO: Increase users balance
    .then(() => window.location.assign('/'))
    .catch(err => {
        alert('User registration failed for some reason. Please try later!')
        console.log('Registration failed: ', err)
    })
}

const authenticate = () => {
    firebase.auth().signInWithPopup(provider)
        .then(response => registerUser(response.user.providerData[0].uid))
        .catch(error => {
            errorContainer.innerText = error.message
            console.log(error)
        })
}

const signOut = () => {
    firebase.auth().signOut()
        .then(() => window.location.assign('/pages/login.html'))
}

firebase.auth().onAuthStateChanged(user => {
    if (user) {
        // User is signed in.
        setUser(user.providerData[0])
    } else {
        // No user is signed in.
        removeUser()
    }
})