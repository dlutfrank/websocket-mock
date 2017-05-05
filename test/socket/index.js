'use strict'
module.exports = {
    'connection': {
        responseName: 'serverConnectSuccess',
        response: {

        }
    },
    'clientSyncEvent': {
        responseName: null,
        response: function(client, data) {
            if (data && data.token != null) {
                client.authen = true;
            } else {
                client.disconnect();
            }
            return null;
        }
    },
    'message': {
        responseName: null,
        response: null
    }
}
