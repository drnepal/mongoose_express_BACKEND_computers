//'npm run seed' will run the seed.js
// this is our seed database with the types of homes on sale.

const mongoose = require ('mongoose')
const Home  = require('./home')
const db = require('../../config/db')

const startHomes = [
    {
    type: 'Single-family home',
    color: 'Blue',
    price: 500000,
    onsale: true,
    },
    {
    type: 'Duplex',
    color: 'Red',
    price: 400000,
    onsale: false,
  
    },
    {
    type: 'Apartment',
    color: 'Green',
    price: 300000,
    onsale: true,
   
    },
    {
    type: 'Townhouse',
    color: 'Yellow',
    price: 450000,
    onsale: false,

    },
    {
    type: 'Condo',
    color: 'White',
    price: 350000,
    onsale: true,

    },
    {
    type: 'Manufactured home',
    color: 'Black',
    price: 250000,
    onsale: false,

    },
    {
    type: 'Tiny home',
    color: 'Pink',
    price: 150000,
    onsale: true,

    },
    {
    type: 'Cabin',
    color: 'Purple',
    price: 100000,
    onsale: false,

    },
    {
    type: 'Castle',
    color: 'Brown',
    price: 700000,
    onsale: true,
   
    },
    {
    type: 'Mansion',
    color: 'Orange',
    price: 900000,
    onsale: false,

    }
    ];

    // first we connect to the db
// then remove all homes
// then add the start homes
// and always close the connection, whether its a success or failure
mongoose.connect(db, {
    useNewUrlParser: true
})
    .then(() => {
    Home.deleteMany()
            .then(deletedHomes => {
                console.log('the deleted homes:', deletedHomes)
                // now we add our Homes to the db
                Home.create(startHomes)
                    .then(newHomes => {
                        console.log('the new home', newHomes)
                        mongoose.connection.close()
                    })
                    .catch(error => {
                        console.log(error)
                        mongoose.connection.close()
                    })
            })
            .catch(error => {
                console.log(error)
                mongoose.connection.close()
            })
    })
    .catch(error => {
        console.log(error)
        mongoose.connection.close()
    })
