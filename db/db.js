const Ticket = require('../models/Ticket');
class MyDB {
    constructor() {
        this.tickets = [];
    }

    /**
     * 
     * @param {String} username 
     * @param {Number} price 
     * @returns {Ticket} returns a ticket object
     */
    create(username, price) {
        const ticket = new Ticket(username, price);
        this.tickets.push(ticket);
        return ticket;
    }

    /**
     * 
     * @param {String} username 
     * @param {Number} price 
     * @param {Number} quantity 
     * @returns {Array<Ticket>}
     */

    bulkCreate(username, price, quantity) {
        const result = [];
        for(let i = 0; i < quantity; i++){
            const ticket = this.create(username, price);
            result.push(ticket);
        }
        return result;
    }

    /**
     * 
     * @returns {Array<Ticket>} returns all available tickets
     */

    find(){
        return this.tickets;
    }

    /**
     * 
     * @param {String} ticketId 
     * @returns {Ticket} returns a ticket object
     */
    findById(ticketId) {
        const ticket = this.tickets.find(item => item.id === ticketId);
        return ticket;
    }

    /**
     * Find all tickets of a user
     * @param {String} username 
     * @returns {Array<Ticket>} returns an array of tickets
     */

    findByUsername(username) {
        const tickets = this.tickets.filter(ticket => ticket.username.toLowerCase().replace(/\s+/g, '') === username);
        return tickets;
    }

    /**
     * 
     * @param {String} username 
     * @param {{username: String, price: Number}} ticketBody
     * @returns {Array<Ticket>} returns an array of updated tickets 
     */
    updateByUsername(username, ticketBody) {
        const tickets = this.findByUsername(username);
        tickets.map(ticket => {
            ticket.username = ticketBody.username ?? ticket.username;
            ticket.price = ticketBody.price ?? ticket.price;
            ticket.updatedAt = new Date();
        })
        return tickets;

    }

    /**
     * 
     * @param {String} username
     * @returns {Boolean} if it is deleted or not 
     */

    deleteByUsername(username) {
        const tickets = this.findByUsername(username);
        const indexes = [];
        tickets.forEach(ticket => {
            const index = this.tickets.findIndex(item => item.username === ticket.username);
            
            indexes.push(index);
        });

        indexes.forEach(index => {
            if(index !== -1){
                this.tickets.splice(index, 1);
                return true;
            }
        })
       
        return indexes;

    }

    /**
     * 
     * @param {Number} ticketId 
     * @param {{username: String, price: Number}} ticketBody 
     * @returns {Ticket} returns an updated ticket
     */

    updateById(ticketId, ticketBody) {
        const ticket = this.findById(ticketId);
        ticket.username = ticketBody.username ?? ticket.username;
        ticket.price = ticketBody.price ?? ticket.price;
        ticket.updatedAt = new Date();

        return ticket;
    }

    /**
     * 
     * @param {String} ticketId 
     * @returns {boolean} returns boolean value if the ticket is removed or not
     */

    deleteById(ticketId) {
        const index = this.tickets.findIndex(item => item.id === ticketId);
        if(index != -1) {
            this.tickets.splice(index, 1);
            return true
        }

        else {
            return false;
        }
    }

    /**
     * 
     * @param {Number} winnerCount 
     * @returns {Array<Ticket>}
     */

    draw(winnerCount) {
        let winnerIndexes = new Array(winnerCount);
        let index = 0;
        while(index < winnerCount) {
            let winnerIndex = Math.floor(Math.random() * this.tickets.length);

            if(!winnerIndexes.includes(winnerIndex)){
                winnerIndexes[index++] = winnerIndex;
                continue;
            }
        }

        const winners = winnerIndexes.map(index => this.tickets[index]);

        return winners;
    }
}

const myDB = new MyDB();

module.exports = myDB;