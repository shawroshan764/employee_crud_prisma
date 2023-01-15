const router = require("express").Router()
const { PrismaClient } = require("@prisma/client")

const prisma = new PrismaClient()

//Add new employee
router.post("/addEmployee", async (req, res, next) => {
    try {
        const response = await prisma.employee.create({
            data: req.body
        })
        res.status(200).json({message: "Employee added successfully."})
    } catch (error) {
        next(error)
    }
})

//Get all employees list
router.get("/fetchAllEmployees", async (req, res, next) => {
    try {
        const { id } = req.params;
        const result = await prisma.employee.findMany({
            include: { department: true }
        })
        res.json(result)
    } catch (error) {
        next(error)
    }
})


// Find employee by id
router.get("/findEmployee/:id", async (req, res, next) => {
    try {
        const { id } = req.params;
        const result = await prisma.employee.findUnique({
            where: {
                id: Number(id)
            },
            include: { department: true }
        })
        res.json(result)
    } catch (error) {
        next(error)
    }
})

// Delete employee by id
router.delete("/deleteEmployee/:id", async (req, res, next) => {
    try {
        const { id } = req.params;
        const result = await prisma.employee.delete({
            where: { id: Number(id) }
        })
        res.status(200).json({message: "Deleted Successfully."})
    } catch (error) {
        next(error)
    }
})

// Update employee by id
router.patch("/updateEmployee/:id", async(req,res,next) =>{
    try {
        const {id} = req.params
        const result = await prisma.employee.update({
            where:{
                id: Number(id)
            },
            data:req.body,
            include:{department:true}
        })
        res.status(200).json({message: "Updated Successfully", result})
    } catch (error) {
        next(error)
    }
})
module.exports = router;