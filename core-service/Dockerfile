# === Build core service =======================================================
ARG VERSION
FROM node:18.17-slim as core-build

RUN apt install make

COPY package.json ./core-service/
COPY tsconfig.json ./core-service/

RUN npm install --prefix ./core-service/

COPY . ./core-service/
RUN npm --prefix ./core-service/ run prisma:generate 
RUN npm --prefix ./core-service/ run build

# === Serve from build file ====================================================

WORKDIR /app

RUN apt install tzdata -y
ENV TZ="Asia/Bangkok"

COPY --chown=pn:pn --from=core-build /app/core-service/node_modules ./node_modules
COPY --chown=pn:pn --from=core-build /app/core-service/package*.json ./
COPY --chown=pn:pn --from=core-build /app/core-service/dist ./dist
COPY --chown=pn:pn --from=core-build /app/core-service/prisma ./prisma

EXPOSE 80

CMD [  "npm", "run", "start:migrate:prod" ]
