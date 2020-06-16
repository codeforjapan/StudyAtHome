# 開発者向け情報

Nuxt.jsに関する内容、Firebaseに関する内容は各ドキュメントを参照してください。
詳しい内容は下記のURLを参照ください

[おうちで時間割 Nuxt版　仕様書 \- HackMD](https://hackmd.io/hltUcnt2S0eQEv1Heif7zw?both)

## 1. 環境構築

以下のアプリケーションを開発をおこなう環境へインストールします。

| アプリケーション名 | バージョン<br>(指定がある場合のみ記載) | インストール条件 |
| ------- | ------- | ------- |
|[Node.js](https://nodejs.org/ja/)|10.19.0以上|必須|
|[Visual Studio Code](https://code.visualstudio.com/)| |Visual Studio Codeを利用する場合|
|[Yarn](https://classic.yarnpkg.com/ja/)| |本プログラムをyarnで実行する場合|
|[Docker Engine](https://docs.docker.com/engine/install/),[Docker Compose](https://docs.docker.com/compose/install/)| |本プログラムをdocker composeで実行する場合|

### 1-1. Visual Studio Codeの拡張機能

Visual Studio Codeを利用する場合は、以下の拡張機能をインストールします。

| 拡張機能 | インストール条件 |
| ------- | ------- |
|[ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)|任意|
|[Vetur](https://marketplace.visualstudio.com/items?itemName=octref.vetur)|任意|
|[TSLint](https://marketplace.visualstudio.com/items?itemName=ms-vscode.vscode-typescript-tslint-plugin)|任意|
|[Debugger for Chrome](https://marketplace.visualstudio.com/items?itemName=msjsdiag.debugger-for-chrome)|任意|
|[Remote Development](https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.vscode-remote-extensionpack)|Visual Studio CodeでRemote Developmentを利用する場合|

---

## 2. 実行

コマンドの実行は、WorkingCopyのルートディレクトリでおこないます。

### 2-1. `yarn` を使う場合

#### 2-1-1. 依存関係を構築する

```bash
# install dependencies
$ yarn install
```

#### 2-1-2. プログラムを実行する

以下のコマンドを実行した後、 http://localhost:3000 にアクセスすると、開発中のプログラムを確認する事ができます。

```bash
# serve with hot reload at localhost:3000
$ yarn dev
```

#### 2-1-3. トラブルシュート

##### 2-1-3-1. `Cannot find module ****` と怒られた時

再度、依存関係を構築し直し、プログラムを実行します。

### 2-2. `docker compose` を使う場合

#### 2-2-1. 依存関係を構築し、プログラムを実行する

以下のコマンドを実行した後、 http://localhost:3000 にアクセスすると、開発中のプログラムを確認する事ができます。

```bash
# serve with hot reload at localhost:3000
$ docker-compose up --build
```

#### 2-2-2. トラブルシュート

##### 2-2-2-1. `Cannot find module ****` と怒られた時

プログラムを止め、以下のコマンドを実行します。

```bash
# serve with hot reload at localhost:3000
$ docker-compose run --rm app yarn install
```

## 3. 本番環境/その他の判定

`process.env.NODE_ENV` の値が、本番の場合は`'production'`に、それ以外の場合は `'development'` になっています。
テスト環境のみで実行したい処理がある場合は、こちらの値をご利用ください。

---

## 4. ステージング・本番環境への反映

下表の左列に記載されたブランチが更新されると、ブランチとWebサイトの更新が自動的におこなわれます。

| 更新対象 | 自動的に更新されるブランチ | 更新されるWebサイト |
| ---- | ---- | ---- |
|`master`| 無し |本番サイト https://studyathome.web.app/|
|`development`| 無し |開発用サイト https://studyathome-dev.web.app/|

---

## 5. ブランチルール

development 以外は、Pull Request は禁止です。
Pull Request を送る際のブランチは、以下のネーミングルールに従ったブランチにしてください。

| 種類 | ブランチのネーミングルール |
| ---- | ---- |
|機能追加系|`feature/#{ISSUE_ID}-#{branch_title_name}`|
|フィックス系|`fix/#{ISSUE_ID}-#{branch_title_name}`|
|ホットフィックス系|`hotfix/#{ISSUE_ID}-#{branch_title_name}`|

### 5-1. 基本的なブランチ

| 目的 | ブランチ | 確認URL | Pull requestsを出せる人 | 備考 |
| ---- | ---- | ---- | ---- | ---- |
| 開発 | development | https://studyathome-dev.web.app/ | 全開発者 | base branch。基本は、この`development`ブランチに Pull Requestを送ってください。 |
| 本番 | master | https://studyathome.web.app/ | 管理者のみ | 管理者以外の Pull Request は禁止です。 |
