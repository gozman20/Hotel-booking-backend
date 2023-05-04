const express= require ('express')
const { getGoal,setGoal,updateGoal, deleteGoal } = require('../controller/goalController')
const router=express.Router()

//Router Protection
const {protect}=require('../middleware/authMiddleware')

router.get('/',protect, getGoal)

router.post('/',protect, setGoal)

router.put('/:id',protect, updateGoal)

router.delete('/:id',protect, deleteGoal)
module.exports=router

