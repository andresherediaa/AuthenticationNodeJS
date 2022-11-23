const express = require("express");
const passport = require("passport");
const authRouter = express.Router();

authRouter.get(
    "/google",
    passport.authenticate("google", { scope: ["profile"] })
);
authRouter.get(
    "/google/callback",
    passport.authenticate("google", {
        failureRedirect: "/",
        successRedirect: "/dashboard",
        session: true,
    }),
    (req, res) => {
        return res.redirect("/dashboard");
    }
);
authRouter.get("/logout", function (req, res, next) {
    req.logout(function (err) {
        if (err) {
            return next(err);
        }
        return res.redirect("/");
    });
});

module.exports = authRouter;
