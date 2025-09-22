# Stage 1: build
FROM node:20-alpine AS builder
WORKDIR /app

# copy package.json & package-lock.json
COPY package*.json ./
RUN npm install

# copy source code
COPY . .

# build project
RUN npm run build

# Stage 2: production
FROM node:20-alpine
WORKDIR /app

# copy built files & package.json
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/package*.json ./

# install production deps only
RUN npm install --only=production

# expose port
EXPOSE 8080

# start app
CMD ["node", "dist/main"]
