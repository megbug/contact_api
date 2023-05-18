import express from 'express';

const app = express();
const port = 3000;

app.use(express.json());

let idCount = 2;

let contacts = [
    {
        id: 1,
        firstname: 'luke',
        mail: 'luke@skywalker.com'
    },
    {
        id: 2,
        firstname: 'anakin',
        mail: 'anakin@skywalker.com'
    }
]

app.get('/', (req, res) => {
    res.send('HUHU')
})

app.get('/contacts', (req, res) => {
    res.send(contacts)
})

app.get('/contacts/:id', (req, res) => {
    let { id } = req.params

    let filteredContacts = contacts.filter((elt) => {
        return (
            elt.id === Number(id)
        )
    })
    res.send(filteredContacts[0]);
})

app.post('/newcontacts', (req, res) => {
    let newContact = req.body;
    idCount = idCount + 1;
    // let newContact = { id: idCount, firstname: 'obiwan', mail: 'obiwan@kenobi.com' };
    newContact.id = idCount
    contacts.push(newContact);
    res.send(newContact);
})

app.put('/contacts/:id', (req, res) => {
    let { id } = req.params;
    let updatedData = req.body;
    // let updatedData = { mail: 'updated@mail.com' };

    const findContact = contacts.findIndex((elt) => {
        return elt.id == id;
    })

    contacts[findContact] = {
        ...contacts[findContact],
        ...updatedData
    }

    res.send(contacts[findContact]);
})

app.delete('/contacts/:id', (req, res) => {
    let { id } = req.params

    contacts = contacts.filter((elt) => {
        return (
            elt.id !== Number(id)
        )
    })
    res.send('You succesfully deleted the contact');
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})

// testing
// curl --header "Content-Type: application/json" \
// --request POST \
// --data '{"name": "Darth Vader", "mail": "star@destroyer.org"}' \
// http://localhost:3000/newcontacts

// curl --header "Content-Type: application/json" \
// --request PUT \
// --data '{ "mail": "updated@mail.com" }' \
// http://localhost:3000/contacts/1

// curl --header "Content-Type: application/json" \
// --request DELETE \
// --data '{ "mail": "updated@mail.com" }' \
// http://localhost:3000/contacts/1