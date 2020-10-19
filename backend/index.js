const Server = require("./classes/Server.js");
new Server(3001);

/*
const DbHandler = require('./backend/DbHandler')

let db = new DbHandler('./database/example-database.db')
let persons = db.select('SELECT * FROM persons WHERE firstName = $firstName', {firstName:'Hadu'}) 
console.log(persons)

let allPersons = db.select('SELECT * FROM persons') 
console.log(allPersons)

//insert a person

db.run(`INSERT INTO persons(firstName, lastName, birthDate)
        VALUES($firstName, $lastName, $birthDate)`,{
            firstName: 'Sara',
            lastName: 'Svensson',
            birthDate: '2014-09-12'
        })*/
