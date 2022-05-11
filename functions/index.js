const functions = require("firebase-functions")
const admin = require('firebase-admin')

admin.initializeApp()

const firestore = admin.firestore()

exports.getStocks = functions.https.onCall(async (request, context) => {
    const { currentCount, stortedBy } = request
    const limit = 10
    const endIndex = currentCount - 1

    try {
        let reference = firestore.collection('Stocks')
        let stocks = await reference.orderBy(stortedBy == null ? 'symbol' : stortedBy).get()

        if (stortedBy != null) {
            return stocks.slice(endIndex)
        } else {
            return stocks.slice(endIndex, endIndex+limit)
        }
    } catch(error) {
        console.log(error)

        return { success: false }
    }
})