FROM node:10-alpine

ARG LTSHG_VERSION

ENV NODE_ENV production
ENV NODE_PATH /usr/local/share/.config/yarn/global/node_modules/

ENV LTSHG_CONFIG_DIR /var/lib/ltshg

# Enable chokidar polling so hot-reload mechanism can work on docker or network volumes
ENV CHOKIDAR_USEPOLLING true

VOLUME /var/lib/ltshg

RUN yarn global add latex-to-speak-http-gateway@$LTSHG_VERSION

COPY ./src /var/lib/ltshg

EXPOSE 48001
