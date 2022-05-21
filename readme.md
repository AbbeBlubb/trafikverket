# Find examination slot for driving test

Request slots, find slot, send push notification. 

This script is run in intervals to find a slot for the driving test. Because the examination slots always are fully booked, if you want to find a slot as fast as possible, you need to watch the available slots. This way, if someone unbooks a slot, you get noticed in the mobile phone about this so you can book the slot.

## Instructions
-  Log in to https://fp.trafikverket.se/Boka/#/
-  Make a search
-  Make changes to the secrets file
-  Register Pushover account (or implement preferred notification channel, eg. Telegram)
-  Run script

Run once
> node trafikverket.js

Run with interval in Bash console
> watch -n 30 node trafikverket.js
