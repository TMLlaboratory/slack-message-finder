import logging
import os
import psycopg2
import json
from datetime import datetime
from slack_sdk import WebClient
from slack_bolt import App
from slack_bolt.adapter.socket_mode import SocketModeHandler

logging.basicConfig(level=logging.DEBUG)

app = App(token=os.environ["SLACK_BOT_TOKEN"])

try:
    connection = psycopg2.connect(
        host="db",
        user="user",
        password="password",
        database="mydatabase_development",
    )
    print('データベースの接続に成功しました')
except Exception as e:
    connection = None
    print('データベースの接続に失敗しました')

# メッセージイベントがあった時に発火
@app.event("message")
def handle_message_events(body, logger):
    logger.debug(json.dumps(body, indent=4))

    element_length = len(body.get("event", {}).get("blocks", [{}])[0].get("elements", [{}])[0].get("elements", [{}]))
    file_length = len(body.get("event", {}).get("files", [{}]))
    if element_length > file_length:
        loop = element_length
    else:
        loop = file_length

    user = body.get("event", {}).get("user", "")
    channel = body.get("event", {}).get("channel", "")
    ts = body.get("event", {}).get("ts", "")
    thread_ts = body.get("event", {}).get("thread_ts", "")
    elements = (
        body.get("event", {})
        .get("blocks", [{}])[0]
        .get("elements", [{}])[0]
        .get("elements", [])
    )
    files = (
        body.get("event", {})
        .get("files", [])
    )

    for i in range(loop):
        element = elements[i] if i < len(elements) else {}
        text = element.get("text", "")
        url = element.get("url", "")

        file = files[i] if i < len(files) else {}
        image_name = file.get("name", "")
        image_url = file.get("url_private", "")

        if connection is not None:
            try:
                cursor = connection.cursor()
                current_datetime = datetime.now()
                sql = "INSERT INTO messages (channel_id, user_id, ts, thread_ts, text, url, image_name, image_url, created_at, updated_at) VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s)"
                cursor.execute(
                    sql,
                    (
                        channel,
                        user,
                        ts,
                        thread_ts,
                        text,
                        url,
                        image_name,
                        image_url,
                        current_datetime,
                        current_datetime,
                    )
                )
                connection.commit()
                logger.info("データの挿入に成功しました")
            except Exception as e:
                logger.info("データの挿入に失敗しました")
            cursor.close()
        else:
            logger.error("データベースへの接続に失敗したため、クエリを実行できません。")

if __name__ == "__main__":
    handler = SocketModeHandler(app, os.environ["SLACK_APP_TOKEN"])
    handler.start()
