const functions = require("firebase-functions")
const admin = require('firebase-admin')

admin.initializeApp()

const firestore = admin.firestore()

exports.getStocks = functions.https.onCall(async (request, context) => {
    const { currentCount, isPaginating } = request
    const limit = 15

    try {
        let snapshot = await firestore.collection('Stocks').get()
        let stocks = snapshot.docs.map ( doc => doc.data() ).slice(0, 99)

        if (!isPaginating) {
            return { total: stocks.length, stocks: stocks.slice(currentCount) }
        } else if (currentCount+limit < stocks.length) {
            return { total: stocks.length, stocks: stocks.slice(currentCount, currentCount + limit) }
        } else {
            return { total: stocks.length, stocks: stocks.slice(currentCount, stocks.length - 1) }
        }
    } catch(error) {
        console.log(error)

        return {}
    }
})