# Lottery API

- Sell Lottery Ticket
- Update Lottery Ticket
- Delete Lottery Ticket
- Get All Tickets
- Get Ticket By id
- Bulk Buy (User can buy multiple tickets at once)
- Raffle draw

Ticket: 
- number (unique)
- username
- price
- timestamp

Routes :

- /tickets/t/:ticketId - GET => Find single ticket by id
- /tickets/t/:ticketId - PATCH => Update single ticket by id
- /tickets/t/:ticketId - DELETE => Delete single ticket by id

# username will be lowercase and no spaces.
- /tickets/u/:username - GET => Find all ticket by username
- /tickets/u/:username - PATCH => Update all ticket by username
- /tickets/u/:username - DELETE => delete all tickets by username 

- /tickets/sell - POST => Create tickets
- /tickets/bulk - POST => bulk sell tickets
- /tickets/draw 
- /tickets - GET => Find All tickets

