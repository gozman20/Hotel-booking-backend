const asyncHandler=require('express-async-handler')
//my model
const Goal=require('../model/goalsModel')
const User=require('../model/userModel')

//@desc get goal
//@route GET /api/goals
//access private

const getGoal=asyncHandler(async(req,res)=>{
    const goals=await Goal.find({user:req.user.id})
    res.json({goals})
})

//@desc set goal
//@route POST /api/goals
//access private
const setGoal=asyncHandler(async(req,res)=>{

console.log(req.body)
if(!req.body.text){
    res.json('Please add a text field')
}
    const goal=await Goal.create({
        text: req.body.text,
        user:req.user.id
    })
    res.json(goal)
})

//@desc Update goal
//@route PUT /api/goals/:id
//access private
const updateGoal=asyncHandler(async(req,res)=>{
    const goal=await Goal.findById(req.params.id)
    
    if(!goal){
        res.json('Goal not found')
    }
  

    //check for user
    if(!req.user){
        req.json('User not found')
    }

    //Make sure the logged in user matches the goal user
if(goal.user.toString() !== req.user.id){
    res.json('User not authorised')
}

    const updatedGoal=await Goal.findByIdAndUpdate(req.params.id,req.body,{new:true})

    res.json(updatedGoal)
})


//@desc delete goal
//@route DELETE /api/goals/:id
//access private
const deleteGoal=asyncHandler(async(req,res)=>{
    const goal=await Goal.findById(req.params.id)

    if(!goal){
        res.json('Goal to be deleted not found')
    }
    

    //check for user
    if(!req.user){
        req.json('User not found')
    }

    //Make sure the logged in user matches the goal user
if(goal.user.toString() !== req.user.id){
    res.json('User not authorised')
}

    await goal.remove()

    res.json({id:req.params.id})

    res.json({message: `Delete goal ${req.params.id}`})
})


module.exports={getGoal,setGoal,updateGoal,deleteGoal}