module.exports = function (app) {
    app.use('/', require('./routing/htmlRoutes.js'));
    app.use('/api/friends', require("./routing/apiRoutes.js"));
}