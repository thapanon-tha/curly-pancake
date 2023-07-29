# === Build core service =======================================================
FROM node:18-alpine3.17 AS build

COPY package.json ./
COPY tsconfig.json ./

RUN npm install 

COPY . ./
RUN npm run prisma:generate
RUN npm run build

# === Serve from build file ====================================================
FROM node:18-alpine3.17 AS prod
WORKDIR /app

ENV TZ="Asia/Bangkok"

COPY --chown=pn:pn --from=build /node_modules ./node_modules
COPY --chown=pn:pn --from=build /package*.json ./
COPY --chown=pn:pn --from=build /tsconfig.json ./
COPY --chown=pn:pn --from=build /dist ./dist
COPY --chown=pn:pn --from=build /prisma ./prisma

CMD [  "npm", "run", "start" ]
