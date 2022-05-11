const functions = require("firebase-functions")
const admin = require('firebase-admin')

admin.initializeApp()

const firestore = admin.firestore()

exports.getStocks = functions.https.onCall(async (request, context) => {
    const { currentCount, isPaginating } = request
    const limit = 15

    try {
        let snapshot = await firestore.collection('Stocks').get()
        let stocks = snapshot.docs.map ( doc => doc.data() )

        if (!isPaginating) {
            return stocks.slice(currentCount)
        } else {
            return stocks.slice(currentCount, currentCount+limit)
        }
    } catch(error) {
        console.log(error)

        return []
    }
})