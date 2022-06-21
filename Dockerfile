FROM node:14-alpine

# create app directory
WORKDIR /opt/ltshg

# install the depences
RUN yarn add latex-to-speak-http-gateway

# copy all files
COPY . .

# open the port
EXPOSE 48001

# run the server
CMD [ "nodejs", "node_modules/latex-to-speak-http-gateway/index.js" ]
