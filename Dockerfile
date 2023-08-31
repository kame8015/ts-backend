FROM node:16-alpine3.15

USER root

RUN apk update --no-cache && apk add --update --no-cache \
    vim \
    zip \
    unzip \
    curl \
    sudo \
    git \
    bash-completion

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

# ~/.bashrcに設定を追加
RUN echo "source /etc/bash_completion" >> ~/.bashrc

# gitの設定
RUN git config --global --add safe.directory /app