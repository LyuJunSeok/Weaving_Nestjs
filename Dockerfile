## STEP

# 1 : Node Version
FROM node:20

# 2 : ENV Setting
ENV NODE_ENV=development

# 3
RUN mkdir -p /var/app

# 4
WORKDIR /var/app

# 


COPY ["package.json", "package-lock.json*", "npm-shrinkwrap.json*", "./"]

RUN npm ci
# RUN npm install --production --silent && mv node_modules ../

COPY . .

EXPOSE 3000


CMD ["npm", "start:prod"]
