

const express = require ("express")
const User = require ("../models/User")

const router = express.Router()

router.get("/", async (req,res) => {
    const users = await User.findAll({})
    res.json(users)
})

router.get("/:id", async (req,res) => {
    const id = req.params.id
    const user = await User.findByPk(id)
    res.json(user)
})

router.post("/", async (req,res) => {
    const updatedData = req.body
    const newUser = await User.create(updatedData)
    res.json(newUser)
})

router.put("/:id", async (req,res) => {
    const updatedData = req.body
    const id = req.params.id

    const update = await User.update(updatedData, {
        where: {id: id}
    })
    res.json("User updated!")
})


router.delete("/:id", async (req, res) => {
    const id = req.params.id; 
    const deleted = await User.destroy({
        where: { id: id }
    });
    res.json('Deleted');    
});



module.exports = router;