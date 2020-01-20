FROM node:12

COPY ["package.json", "package-lock.json", "/usr/src/"]

WORKDIR /usr/src

COPY [".", "/usr/src/"]

EXPOSE 3009

ENV ENV=prod

ENV SECRET_KEY_JWT_API=bWljcm9zZXJ2aWNpb3NuMWQwMC1wcm9k

CMD [ "npm", "run", "dev" ]
