module.exports = {
    logout(req, res) {
        req.logout();
        res.redirect('/#/home/index');
    },
    currentUser() {
        req.isAuthenticated() ? res.json(req.user) : res.sendStatus(401);
    }
};