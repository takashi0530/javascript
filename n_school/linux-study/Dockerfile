FROM ubuntu:18.04

RUN yes | unminimize
RUN locale-gen ja_JP.UTF-8
ENV LANG ja_JP.UTF-8
ENV TZ Asia/Tokyo
WORKDIR /linux-study

# FROM ... 構築する Docker イメージの元となる Docker イメージを指定する記述です。ここでは、ubuntu:18.04 というイメージを指定します。この元となる Docker イメージに様々な初期設定を加えていくことで、オリジナルの Docker イメージを構築する、という仕組みです。

# RUN ... Docker イメージの構築（Docker コンテナの初期設定）で実行するコマンドを記述します。
# yes | unminimize ... Ubuntu の機能をカットせずに使うための記述です。
# locale-gen ja_JP.UTF-8 ... Ubuntu を日本語化するための記述です。

# ENV ... Docker イメージの構築（Docker コンテナの初期設定）で「環境変数」と呼ばれる値を設定するための記述です。

# LANG ja_JP.UTF-8 ... 環境変数 LANG を設定し、Ubuntu を日本語化する記述です。

# TZ Asia/Tokyo ... 環境変数 TZ を設定し、タイムゾーンを日本時間にする記述です。

# WORKDIR ... 作業ディレクトリを指定する記述です。ここでは、/linux-study を作業ディレクトリとしています