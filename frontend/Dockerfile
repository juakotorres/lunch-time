FROM node:20

WORKDIR /app
COPY package*.json ./
COPY .npmrc ./

RUN npm install

# Hotreloading for DEV
ENV WATCHPACK_POLLING=true
ENV FAST_REFRESH=true

COPY src ./src
COPY public ./public

EXPOSE 3000

CMD ["npm", "start"]