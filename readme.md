# Find examination slot for driving test

Request slots, find slot, and get noticed by music and mobile phone notification. 

This script is run in intervals to find a slot for the driving test. Because the examination slots always are fully booked, if you want to find a slot as fast as possible, you need to continuously watch the available slots. This bot solves this problem. With the bot, if someone unbooks a slot, you will get noticed so you can book the slot. 

## Instructions
- Log in to https://fp.trafikverket.se/Boka/#/ and make a search to get your headers to paste in the secrets file
- For mobile phone notification, register a Pushover account and paste your tokens in the secrets file (you can as well implement another notification channel, eg. Telegram)
- Install WLC Media Player (or edit the shelljs exec command to preferred player)
- Copy an .mp3 to the folder and change the file name to "alert.mp3" (or edit the shelljs exec command to preferred name and file extension)
- Run script
- When a slot is found, the slot date will be printed to the console, your cellphone will get a notification and you will hear your alert music

Run once
> node trafikverket.js

Run with interval in Bash console
> watch -n 600 node trafikverket.js
