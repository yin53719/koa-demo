#制定node镜像的版本
FROM node:8
WORKDIR /app
COPY package.json /app
RUN npm install
COPY . /app
#对外暴露的端口
EXPOSE 8081
#程序启动脚本
RUN nohup node app.js &
