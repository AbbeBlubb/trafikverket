# Find examination slot for driving test

Request slots, find slot, send push notification. Can be changed to Telegram.

This script is run in intervals to find a slot for the driving test. Because the examination slots always are fully booked, if you want to find a slot as fast as possible, you need to watch the available slots. This way, if someone unbooks a slot, you get noticed in the mobile phone about this so you can book the slot.

## Instructions
1. Log in to https://fp.trafikverket.se/Boka/#/
2. Make a search
2. Make changes to the secrets file
3. Run script

Run once
> node trafikverket.js

Run with interval in Bash console
> watch -n 30 node trafikverket.js
