const express = require('express');
const router = express.Router()
const Subscriber = require('../models/subscribers')

//Getting all
router.get('/', async (req, res) => {
    try {
        const subscribers = await Subscriber.find()
        res.json(subscribers)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }

})

//Getting one 
router.get('/:id', getSubscriber, (req, res) => {
    // res.send(req.params.id)
    res.send(res.subscriber.name)
})

//Creating one 
router.post('/', async (req, res) => {
    const subscriber = new Subscriber({
        name: req.body.name,
        subscribeToChannel: req.body.subscribeToChannel
    })
    try {
        const newSubscriber = await subscriber.save()
        res.status(201).json(newSubscriber)
    }
    catch (error) {
        res.status(400).json({ message: error.message })
    }
})

//updating one 
router.patch('/:id', async (req, res) => {

})

//Deleting one 
router.delete('/:id', async (req, res) => {
    try {
        await res.subscriber.remove()
        res.json({ message: 'Deleted Subscriber' })
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})

async function getSubscriber(req, res, next) {
    let subscriber
    try {
        subscriber = await Subscriber.findById(req.params.id)
        if (subscriber == null) {
            return res.status(404).json({ message: "Cannot find subcriber" })
        }
    } catch (error) {
        return res.status(500).json({ message: err.message })
    }
    res.subscriber = subscriber
    next()
}
module.exports = router