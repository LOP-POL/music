const express = require('express')
const dashController = require("../controller/dashController.js")
const morgan = require("morgan")
const detailsController = require("../controller/detailsController.js")
const router = express.Router()

router.use(morgan("dev"))

router.get("/",dashController.music_index)
router.get("/contacts",dashController.music_favs)
router.get("/About",dashController.music_upload)
router.get("/:id",detailsController.music_details)
router.put("/:id",detailsController.music_likes)
router.get("/:id/audio",detailsController.music_details_audio)
router.post("/:id",detailsController.new_comment)
// router.delete("/:id",dashController.music_delete)

module.exports = router