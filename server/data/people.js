const { v4: uuidv4 } = require('uuid');
const fs = require('fs');
const csvFilePath = require("path").resolve(__dirname, "./data.csv")

// const csvFilePath='./data.csv';
const csv=require('csvtojson');
const { json } = require("express");

csv()
.fromFile(csvFilePath)
.then((jsonObj)=>{
    // console.log(jsonObj)
})

const readJSON = async () => {
    const jsonArray=await csv().fromFile(csvFilePath);
    return jsonArray
}

const getPersonByID = async (uid) => {
    const jsonArray = await readJSON();
    let person = Object.values(jsonArray).find(person => person.uid === uid);
    return person
}

const genUID = async () => {
    let generatedIDs = [];
    const jsonArray=await csv().fromFile(csvFilePath);
    jsonArray.forEach((person) => {
        let newID;
        do {
            newID = uuidv4(); 
        } while (generatedIDs.includes(newID));
        // console.log(newID)
        generatedIDs.push(newID);
        person.uid = newID;
        // console.log(person)
    });
    // console.log(generatedIDs);
    return jsonArray
}

const addUID = async () => {
    const jsonArray = await genUID();
    const originalHeaders = Object.keys(jsonArray[0]);
    // Convert the modified jsonArray back to CSV format
    const csvData = jsonArray.map((person) => 
        `${person["seq #"]},` + 
        `${person["legend"]},` + 
        `"${person["name"]}",` + 
        `${person["prec #"]},` + 
        `${person["barangay"]},` + 
        `${person["uid"]}\n`
    ).join('');
    // Write the CSV data back to the file
    fs.writeFileSync(csvFilePath, originalHeaders.join(',') + '\n' + csvData, 'utf8');
    console.log('CSV file updated with unique IDs.');
}

const main = async () => {
    // addUID();
    let people = await readJSON();
    console.log(people)
    // console.log(await getPersonByID('25085676-8b1c-46f0-b7b6-fb9417414f83'))
}


main()

module.exports = {
    genUID,
    getPersonByID,
    addUID
};