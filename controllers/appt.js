const Appt = require("../models/Appt");

module.exports = {
    createAppt: async(req,res)=>{
        try{

            const appt = await Appt.create({
               date,
               time,
               carModel,
               carMake,
               carYear,
               firstName,
               lastName,
               email,
               phone,
               zipCode,
               contact,
               comment,
               stayLeave,
               service
            });

            res.status(200).json({appt});

        }catch(err){
            res.status(500).send(err);
        }
    }
}