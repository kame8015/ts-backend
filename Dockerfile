# Node.jsの公式イメージをベースにして使用
FROM node:16

# ワーキングディレクトリの設定
WORKDIR /usr/src/app

# package.json と yarn.lock をコピー
COPY package.json yarn.lock ./

# 依存関係のインストール
RUN yarn install

# その他のファイルをコピー
COPY . .

# ポートを公開
EXPOSE 3000

# 起動時のコマンドを指定
# CMD ["yarn", "start"]
