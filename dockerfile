# Stage 1: Build the application
FROM node:20.17.0-alpine AS builder

COPY package.json yarn.lock ./
RUN yarn --frozen-lockfile

COPY . .

RUN yarn build

FROM node:20.17.0-alpine AS node_modules

COPY package.json yarn.lock ./

RUN yarn --frozen-lockfile --production

# Stage 2: Create the final image
FROM node:20.17.0-alpine

WORKDIR /server

COPY --from=builder /package.json ./
COPY --from=builder /dist ./dist

COPY --from=node_modules /node_modules ./node_modules

CMD ["yarn", "start:prod"]