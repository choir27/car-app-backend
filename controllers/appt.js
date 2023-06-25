const Appt = require("../models/Appt");

module.exports = {
    createAppt: async(req,res)=>{
        try{

            const appt = await Appt.create({
               date: req.body.date,
               carModel: req.body.carModel,
               carMake: req.body.carMake,
               carYear: req.body.carYear,
               firstName: req.body.firstName,
               lastName: req.body.lastName,
               email: req.body.email,
               phone: req.body.phone,
               zipCode: req.body.zipCode,
               contact: req.body.contact,
               comment: req.body.comment,
               stayLeave: req.body.stayLeave,
               service: req.body.service
            });

            res.status(200).json({appt});

        }catch(err){
            res.status(500).send(err);
        }
    }
}