# Find examination slot for driving test

Request slots, find slot, send push notification. 

This script is run in intervals to find a slot for the driving test. Because the examination slots always are fully booked, if you want to find a slot as fast as possible, you need to watch the available slots. This way, if someone unbooks a slot, you get noticed in the mobile phone about this so you can book the slot.

## Instructions
- Log in to https://fp.trafikverket.se/Boka/#/ and make a search to get your headers to paste in the secrets file
- Register Pushover account and paste your tokens in the secrets file (you can as well implement another notification channel, eg. Telegram)
- Copy an .mp3 to the folder and change the file name to "alert" 
- Install WLC Media Player (or change the shelljs exec command to preferred player)
- Run script
- When a slot is found, the slot date will be printed to the console, your cellphone will get a notification and you will hear your alert music

Run once
> node trafikverket.js

Run with interval in Bash console
> watch -n 600 node trafikverket.js
