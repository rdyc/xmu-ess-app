# 1ST
FROM node:12.2.0-alpine AS builder
WORKDIR /tessa
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# 2ND
FROM node:12.2.0-alpine
RUN yarn global add serve
WORKDIR /tessa
COPY --from=builder /tessa/build .
EXPOSE 80
EXPOSE 443
CMD ["serve", "-p", "80", "-s", "."]