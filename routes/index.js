const router = require('express').Router();
const notes = require('./routes/apiRoutes');

router.use(apiRoutes);

module.exports = router;