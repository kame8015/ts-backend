FROM node:20.5.1-slim

USER root

RUN apt-get update && apt-get install -y --no-install-recommends \
    vim \
    zip \
    unzip \
    curl \
    sudo \
    git \
    bash-completion \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*

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