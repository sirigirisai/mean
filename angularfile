FROM node
RUN mkdir /app
WORKDIR /app
COPY package.json /app
RUN npm cache clean
RUN npm install
COPY . /app
EXPOSE 4200
CMD ['npm','start']