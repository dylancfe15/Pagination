const functions = require("firebase-functions")
const admin = require('firebase-admin')

admin.initializeApp()

const firestore = admin.firestore()

exports.getStocks = functions.https.onCall(async (request, context) => {
    const { currentCount } = request
    const limit = 20

    try {
        let snapshot = await firestore.collection('Stocks').get()
        let stocks = snapshot.docs.map ( doc => doc.data() ).slice(0, 50)

        if (currentCount+limit < stocks.length) {
            return { total: stocks.length, stocks: stocks.slice(currentCount, currentCount + limit) }
        } else {
            return { total: stocks.length, stocks: stocks.slice(currentCount, stocks.length) }
        }
    } catch(error) {
        console.log(error)

        return {}
    }
})