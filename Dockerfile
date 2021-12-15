FROM sociumtechdevops/op-at-node-baseimage:latest
COPY . $HOME/app
RUN npm i --save --production
EXPOSE 3000
CMD bash -c "source ./env.sh ; npm start"
