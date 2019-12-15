// Refer to https://github.com/mjhea0/passport-local-express4/blob/master/routes/index.js
const Router = require("express-promise-router");
const router = Router();

const {
    listEmails,
    registerEmail,
    deleteEmail,
    updateEmail
} = require("../controllers/emailController");

router.get("/", listEmails);
router.post("/", registerEmail);
router.put("/", updateEmail);
router.delete("/", deleteEmail);

module.exports = router;
