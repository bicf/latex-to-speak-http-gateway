FROM node:14-alpine

# create app directory
WORKDIR /opt/ltshg

# install the depences
RUN yarn install

# copy all files
COPY . .

# open the port
EXPOSE 48001

# run the server
CMD [ "node", "index.js" ]
