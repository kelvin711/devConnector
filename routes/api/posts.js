const express = require('express');
const router = express.Router();
//@route GET api/posts/test
//@desc Tests post route
//@access public route
router.get('/test', (req, res) => res.json({ msg: "Posts works"}));

module.exports = router