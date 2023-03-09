const router = require("express").Router();

router.get("/", (req, res, next) => {
  res.json("All good in here");
});

// example of routes for a document where you want to add an Image
const itemRoutes = require("./item.routes")
router.use("/item", itemRoutes)

module.exports = router;
