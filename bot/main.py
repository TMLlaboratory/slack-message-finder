import logging
import os
from slack_sdk import WebClient
from slack_bolt import App
from slack_bolt.adapter.socket_mode import SocketModeHandler

logging.basicConfig(level=logging.DEBUG)``

app = App(token=os.environ["SLACK_BOT_TOKEN"])

# メッセージイベントがあった時に発火


@app.event("message")
def handle_message_events(body, logger):
    logger.info(body)
    print(body)


if __name__ == "__main__":
    handler = SocketModeHandler(app, os.environ["SLACK_APP_TOKEN"])
    handler.start()
