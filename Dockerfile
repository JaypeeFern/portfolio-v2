# syntax=docker/dockerfile:1

FROM node:22-alpine AS builder

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci

COPY . .

ARG IMAGE_REVISION
ENV NEXT_TELEMETRY_DISABLED=1

RUN node -e 'if (!/^[0-9a-f]{40}$/.test(process.env.IMAGE_REVISION || "")) { console.error("IMAGE_REVISION must be a full lowercase 40-character Git SHA."); process.exit(1); }'

# The build checks the SEO environment contract without baking the production
# hostname or other deployment configuration into the image.
RUN SEO_DEPLOYMENT_ENV=preview npm run build

FROM node:22-alpine AS runtime

WORKDIR /app

ENV NODE_ENV=production \
    NEXT_TELEMETRY_DISABLED=1 \
    PORT=3000 \
    HOSTNAME=0.0.0.0

ARG IMAGE_REVISION
ENV IMAGE_REVISION=${IMAGE_REVISION}
LABEL org.opencontainers.image.revision=${IMAGE_REVISION}

COPY --from=builder --chown=node:node /app/public ./public
COPY --from=builder --chown=node:node /app/.next/standalone ./
COPY --from=builder --chown=node:node /app/.next/static ./.next/static
COPY --chmod=755 docker-entrypoint.sh /usr/local/bin/docker-entrypoint.sh

USER node

EXPOSE 3000

ENTRYPOINT ["/usr/local/bin/docker-entrypoint.sh"]
CMD ["node", "server.js"]
