# TraceBot
First attempt at a Discord bot.
Simple FIFA-themed bot made in JavaScript using discord.js. Bot also makes use of nodemon, mongoose and MongoDB.

## Links
[Invitation link](https://discordapp.com/oauth2/authorize?&client_id=516328833729953793&scope=bot&permissions=8)

## Features
**Moderation.** Simple moderation that includes commands such as kick, ban, clear, purge.

**FIFA Pack Simulator.** Somewhat accurate FIFA pack simulation.

**Points system with mini-games.** Includes gifting points, points for messages and mini-games.

## All commands
#### *We are assuming $ is our prefix (see `botconfig.json`)*
### Moderation
`$ban @user <reason>` - bans a user for reason

`$kick @user <reason>` - kicks a user for reason

`$mute @user <amount of time>` - mutes a user

`$clear <x>` - clears x messages

`$purge` - use to clear a channel (500 msgs at a time)

### Packs
`$twoplayers` - Two Players Pack

`$7.5k` - 7,5k Pack

`$50k` - 50k Pack

`$100k` - 100k Pack

`$icon` - Icon Pack

### Points and mini-games
$battle @user <amount> - pack battle other users by putting points on the line

$gamble <amount> - gamble with your points

$gift @user <amount> - gift another user some points (you lose points that you gift to others)

### Miscellaneous
`$help` - Help for TraceBot

`$pointshelp` - Help for the points system

`$hello`

`$the100` - Random The 100 quote

`$say <what you want the bot to say>` - Bot says what you tell it to

`$github <profile name>` - shows a github profile
