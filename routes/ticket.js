const router = require("express").Router();
const db = require('../db/db');

// Operations by ticketId
router
.route('/t/:ticketId')
.get((req, res) => {
    const ticketId = req.params.ticketId;
    const ticket = db.findById(ticketId);
    res.status(200).json(ticket);
})
.patch((req, res) => {
    const ticketId = req.params.ticketId;
    const updatedTicket = db.updateById(ticketId, req.body ?? {});
    res.status(200).json({message: "updated successfully", updatedTicket});
})
.delete((req, res) => {
    const ticketId = req.params.ticketId;
    db.deleteById(ticketId);
    res.status(203).send();
})

// Operations by Username
router
.route('/u/:username')
.get((req, res) => {
    const username = req.params.username;
    console.log(username);
    const tickets = db.findByUsername(username);
    console.log(tickets);
    res.status(200).json(tickets);
})
.patch((req, res) => {
    const username = req.params.username;
    const updatedTickets = db.updateByUsername(username, req.body ?? {});
    res.status(200).json({
        message: "Updated Successfully",
        updatedTickets
    })
})
.delete((req, res) => {
    const username = req.params.username; 
    const deletedTicket = db.deleteByUsername(username);
    if(deletedTicket) {
        res.status(203).json({
            message: "Deleted Successfully",
            deletedTicket
        })
    }
})

// POST: Sell Tickets
router.post('/sell', (req, res) => {
    const{username, price} = req.body;
    const ticket = db.create(username, price);
    res.status(201).json({
        message: "Ticket created successfully",
        ticket
    })
})

// POST: Bulk Sell Tickets
router.post('/bulk', (req, res) => {
    const {username, price, quantity} = req.body;
    const tickets = db.bulkCreate(username, price, quantity);
    res.status(201).json({
        message: "Bulk Ticket Created Successfully",
        tickets
    })
})

// GET: Draw Tickets
router.get('/draw', (req, res) => {
    const winnerCount = req.query.wc ?? 3;
    const winners = db.draw(winnerCount);
    res.status(200).json(winners);
})

// GET: Get all the tickets
router.get("", (req, res) => {
    const tickets = db.find();
    res.status(200).json(tickets);
})

module.exports = router;