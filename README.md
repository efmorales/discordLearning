# discordLearning

This project is fundamentally a *learning experience*. 

### My objectives are:

- Understand the process of creating a Discord bot with discordJS and the Discord API.
- Make the bot go online.
- Create as many commands as I can while understanding what's happening.

Currently there are 7 commands:

- /ping
- /user
- /server
- /echo
- /dog
- /author
- /hackernews

## Installing this in your local repository

Fork or clone this project.

To replicate this bot in your local setup first you need to create a program (bot) yourself in the Discord Developer Portal. Invite your bot to your server with most permissions enabled.

Once you have your **token, clientId and guildId** you can store that data into a new *.env* file. After that you just need to run the following in the terminal.

```js

npm install

```

```js

node deploy-commands.js

```

```js
node index.js
```
