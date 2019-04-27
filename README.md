# BallerBot

Telegram bot to get your sports fix.

## Init
Remember to initialize your bot using the [setWebHook](https://core.telegram.org/bots/api#setwebhook):

```
curl -F "url=https://alias.now.sh"  https://api.telegram.org/bot<your_api_token>/setWebhook
```

## Running Locally
I use now.sh to invoke the bot. You can run it locally:

```
npm install -g now 
```

Then you can get a local dev env:
```
npm run dev
```

You should now have *http://localhost:3000* available as if it were on now.sh

## Deploy
Before you can deploy to your now.sh account you'll need to set the right now token:

```
now secrets add ballerbot_token "<your_api_token>" 
npm run deploy
```