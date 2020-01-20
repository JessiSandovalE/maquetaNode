FROM node:12

COPY ["package.json", "package-lock.json", "/usr/src/"]

WORKDIR /usr/src

COPY [".", "/usr/src/"]

EXPOSE 3009

ENV ENV=dev

ENV SECRET_KEY_JWT_API=NIDOO123

CMD [ "npm", "run", "dev" ]
