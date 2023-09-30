# slack-message-finder

slack のログを記録し、検索するアプリ

### コミットルール

- コミットメッセージは行った開発を端的にわかりやすく書く（長すぎないように注意する）
- コミットメッセージラベルを付ける
  - [feat] file or directory の追加
  - [mod] file or directory の編集
  - [fix] file or directory のバグや軽微な修正
  - [del] file or directory の削除
  - [otr] その他
- ex)
  - `git commit -m "[feat] model group"`
  - `git commit -m "[fix] login page"`
  - `git commit -m "[mod] mypage"`

## Build

task build

## DB

docker compose run --rm api bin/rails console
テーブル名.all
exit
