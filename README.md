# React Query Chat Sample

## これは何か

React-Queryを使ったチャットです。画面は以下のとおり。

<img src="https://camo.qiitausercontent.com/ec77b7d4c9cc16cc7384a2187e296fbff9987c46/68747470733a2f2f71696974612d696d6167652d73746f72652e73332e61702d6e6f727468656173742d312e616d617a6f6e6177732e636f6d2f302f393937392f61303932626638642d373366622d316363352d363033642d6661623236393435653965332e706e67"/>

## Pleasanterを使ったサーバサイドの実装

サーバサイド実装として[Pleasanter](https://github.com/Implem/Implem.Pleasanter)を使って簡単に作ります。

![image.png](https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/9979/69d5250c-750d-9ba9-cbca-527db951c0fc.png)

Plesanterはオープンソースのいわゆる「ローコード・ノーコードプラットフォーム」で、ここではPostgresをWebインターフェースで操作できるもの、特にWeb APIを自動生成してくれるものとして使います。
docker composeを用意してくださっている方がいらっしゃるので、以下のような手順でdockerで実行しローカルでデータベースを準備しておきます。

```bash
$ git clone https://github.com/yamada28go/pleasanter-docker-PostgreSQL server
$ cd server
$ docker compose build
$ docker compose up -d 
$ docker compose exec pleasanter-web cmdnetcore/codedefiner.sh
```

サイト生成(いわゆるテーブル生成)のために、[こちら](https://github.com/uehaj/react-query-chat/tree/master/schema)のサイトパッケージ3つをインポートした上で、初期ユーザと初期ルームをそれぞれusers、roomsサイトに生成しておきます。

- usersへの追加 ![image.png](https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/9979/32eb8907-0788-39aa-5fa1-659c267ed321.png)

- roomsへの追加 ![image.png](https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/9979/fa72d2da-f2c7-0258-ae77-ebb24137a23f.png)

この裏ではPostgresが起動しています。

## クライアント設定

その上でPleasanterの管理画面から得る以下の情報をcreate-react-appのトップディレクトリの.envファイルに転記すれば準備完了です。

```env
REACT_APP_APIKEY=<Pleasanter API key>
REACT_APP_TABLE_ID_USERS=<users table ID(site id)>
REACT_APP_TABLE_ID_ROOMS=<rooms table ID(site id)>
REACT_APP_TABLE_ID_MESSAGES=<messages table ID(site id)>
```

## クライント起動

```
npm run start
```
