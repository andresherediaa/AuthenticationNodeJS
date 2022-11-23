module.exports = {
    ensureGuest: function (req, res, next) {
        if (req.isAuthenticated()) {
            return res.redirect("/dashboard");
        } else {
            return next();
        }
    },
    ensureAuth: function (req, res, next) {
        if (req.isAuthenticated()) {
            return next();
        }
        return res.redirect("/");
    },
};
