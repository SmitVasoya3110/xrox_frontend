# pull official base image
FROM node:16

# set working directory
WORKDIR /app

# add `/app/node_modules/.bin` to $PATH
#ENV PATH /app/node_modules/.bin:$PATH

# install app dependencies

COPY package.json ./
# COPY package-lock.json ./
# RUN yarn
RUN npm i
RUN npm run build
RUN npm i -g serve
# add app
COPY . ./

# start app
EXPOSE 3000

CMD ["npm", "-s", "serve"]