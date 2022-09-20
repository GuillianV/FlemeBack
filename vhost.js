require('../../server.js')

module.exports = function (app, express, vhost, PrepareBasicRoutes) {

   

    const cdn = [
        'www.fleme.fr',
        'fleme.fr',
    ]


    let flemeApp = require("./app.js")

    
    app.use(vhost(cdn, flemeApp))


    

    let cert = {
        key: 'key.pem',
        cert: 'cert.pem'
    }
    return [cdn, cert]

};