const express = require('express');
const router = express.Router();
const peopleData = require('../data/people');

router.get('/', async (req, res) => {
    try {
        const { uid } = req.query;
        let person = await peopleData.getPersonByID(uid)
        console.log(person)
        return res.status(200).json(person);
    } catch (e){
        console.log("fail")
    }
    return res.status(200).json("yo");
});

module.exports = router;