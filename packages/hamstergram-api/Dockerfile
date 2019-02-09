FROM keymetrics/pm2:latest-alpine

# Bundle APP files
COPY src src/
COPY config config/
COPY index.js .
COPY package.json .
COPY pm2.json .

# Install app dependencies
ENV NPM_CONFIG_LOGLEVEL warn
RUN yarn run preinstall
RUN yarn install --production
RUN yarn run postinstall

# Show current folder structure in logs
RUN ls -al -R

EXPOSE 3000
CMD [ "pm2-runtime", "start", "pm2.json" ]
