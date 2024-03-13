# BopBotMusic

BopBotMusic is a music bot based off of muse bot (https://github.com/codetheweb/muse). The reason for its existance is the removal of Spotifiy and some other minor changes.

Go support the original bot https://github.com/codetheweb/muse
## Running

BopBotMusic is written in TypeScript. You can either run BopBotMusic with Docker (recommended) or directly with Node.js. Both methods require API keys passed in as environment variables:

- `DISCORD_TOKEN` can be acquired [here](https://discordapp.com/developers/applications) by creating a 'New Application', then going to 'Bot'.

BopBotMusic will log a URL when run. Open this URL in a browser to invite BopBotMusic to your server. BopBotMusic will DM the server owner after it's added with setup instructions.

A 64-bit OS is required to run BopBotMusic.

### Versioning

The `master` branch acts as the developing / bleeding edge branch and is not guaranteed to be stable.

When running a production instance, I recommend that you use the [latest release](https://github.com/codetheweb/BopBotMusic/releases/).


### 🐳 Docker

There are a variety of image tags available:
- `:2`: versions >= 2.0.0
- `:2.1`: versions >= 2.1.0 and < 2.2.0
- `:2.1.1`: an exact version specifier
- `:latest`: whatever the latest version is

(Replace empty config strings with correct values.)

```bash
docker run -it -v "$(pwd)/data":/data -e DISCORD_TOKEN='' -e YOUTUBE_API_KEY='' codetheweb/BopBotMusic:latest
```

This starts BopBotMusic and creates a data directory in your current directory.

**Docker Compose**:

```yaml
version: '3.4'

services:
  BopBotMusic:
    image: codetheweb/BopBotMusic:latest
    restart: always
    volumes:
      - ./BopBotMusic:/data
    environment:
      - DISCORD_TOKEN=
      - YOUTUBE_API_KEY=
```

### Node.js

**Prerequisites**:
* Node.js (16.x is recommended because it's the current LTS version)
* ffmpeg (4.1 or later)

1. `git clone https://github.com/codetheweb/BopBotMusic.git && cd BopBotMusic`
2. Copy `.env.example` to `.env` and populate with values
3. I recommend checking out a tagged release with `git checkout v[latest release]`
4. `yarn install` (or `npm i`)
5. `yarn start` (or `npm run start`)

## ⚙️ Additional configuration (advanced)

### Cache

By default, BopBotMusic limits the total cache size to around 2 GB. If you want to change this, set the environment variable `CACHE_LIMIT`. For example, `CACHE_LIMIT=512MB` or `CACHE_LIMIT=10GB`.

### Custom Bot Status

In the default state, BopBotMusic has the status "Online" and the text "Listening to Music". You can change the status through environment variables:

- `BOT_STATUS`:
  - `online` (Online)
  - `idle` (Away)
  - `dnd` (Do not Disturb)

- `BOT_ACTIVITY_TYPE`:
  - `PLAYING` (Playing XYZ)
  - `LISTENING` (Listening to XYZ)
  - `WATCHING` (Watching XYZ)
  - `STREAMING` (Streaming XYZ)

- `BOT_ACTIVITY`: the text that follows the activity type

- `BOT_ACTIVITY_URL` If you use `STREAMING` you MUST set this variable, otherwise it will not work! Here you write a regular YouTube or Twitch Stream URL.

#### Examples

**BopBotMusic is watching a movie and is DND**:
- `BOT_STATUS=dnd`
- `BOT_ACTIVITY_TYPE=WATCHING`
- `BOT_ACTIVITY=a movie`

**BopBotMusic is streaming Monstercat**:
- `BOT_STATUS=online`
- `BOT_ACTIVITY_TYPE=STREAMING`
- `BOT_ACTIVITY_URL=https://www.twitch.tv/monstercat`
- `BOT_ACTIVITY=Monstercat`

### Bot-wide commands

If you have BopBotMusic running in a lot of guilds (10+) you may want to switch to registering commands bot-wide rather than for each guild. (The downside to this is that command updates can take up to an hour to propagate.) To do this, set the environment variable `REGISTER_COMMANDS_ON_BOT` to `true`.
