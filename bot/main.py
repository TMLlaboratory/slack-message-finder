import logging
import os
import psycopg2
from datetime import datetime
from slack_sdk import WebClient
from slack_bolt import App
from slack_bolt.adapter.socket_mode import SocketModeHandler

logging.basicConfig(level=logging.DEBUG)

app = App(token=os.environ["SLACK_BOT_TOKEN"])

# メッセージイベントがあった時に発火
@app.event("message")
def handle_message_events(body, logger):
    logger.info(body)
    print(body)

    try:
        connection = psycopg2.connect(
            host="db",
            user="user",
            password="password",
            database="mydatabase_development",
        )
        logger.info("データベースへの接続に成功しました.")

    except Exception as e:
        logger.info("データベースへの接続に失敗しました.")
        connection = None

    if connection is not None:
        try:
            with connection.cursor() as cursor:
                current_datetime = datetime.now()
                sql = "INSERT INTO messages (channel_id, user_id, ts, thread_ts, text, url, image_name, image_url, is_bot, created_at, updated_at) VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)"
                cursor.execute(
                    sql, (
                        "C05U9D2T2NP", 
                        "U05SL6CB6DN", 
                        "1696656615.397500", 
                        "1696654369.66477", 
                        "test_normal_message", 
                        "https://blog.nutmeg.cloud/", 
                        "IMG_2709.jpg", 
                        "https://files.slack.com/files-pri/T05RX3HH4V9-F0605UU11DZ/img_2709.jpg", 
                        True, 
                        current_datetime, 
                        current_datetime
                    )
                )
            connection.commit()
            logger.info("データの挿入に成功しました")
        except Exception as e:
            logger.info("データの挿入に失敗しました")
    else:
        logger.error("データベースへの接続に失敗したため、クエリを実行できません。")


if __name__ == "__main__":
    handler = SocketModeHandler(app, os.environ["SLACK_APP_TOKEN"])
    handler.start()
