# pull official base image
FROM node:16-alpine

# set working directory
WORKDIR /app

# add `/app/node_modules/.bin` to $PATH
#ENV PATH /app/node_modules/.bin:$PATH

# install app dependencies

COPY package.json ./
# COPY package-lock.json ./
RUN yarn


# add app
COPY . ./

# start app
EXPOSE 3000

CMD ["yarn", "start"]