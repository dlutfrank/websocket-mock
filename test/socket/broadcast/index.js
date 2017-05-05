'use strict'
module.exports = {
    serverSyncEvent: {
        interval: 2000,
        response: function(client) {
            //            if (client.authen) {
            return {
                "result": [
                    {
                        "buyPrice": "197.27",
                        "commodityId": "LSPD1g",
                        "highPrice": "197.37",
                        "lowPrice": "195.96",
                        "openMarketPrice": "196.06",
                        "preCloseMarketPrice": "195.16",
                        "preSettlePrice": "195.19",
                        "sellPrice": "197.27",
                        "timestamp": Date.now()
                    }, {
                        "buyPrice": "3645.00",
                        "commodityId": "LSAG100g",
                        "highPrice": "3654.00",
                        "lowPrice": "3613.00",
                        "openMarketPrice": "3650.00",
                        "preCloseMarketPrice": "3612.00",
                        "preSettlePrice": "3613.00",
                        "sellPrice": "3637.00",
                        "timestamp": Date.now()
                    }
                ],
                "memberId": "xxxxeeeeddd"}

            }
        },
        myEvent: {
            interval: 1000,
            response: {
                retcode: 200,
                retdesc: 'hello'
            }
        }
    }
