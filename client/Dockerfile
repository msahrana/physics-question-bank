FROM node:22-alpine

WORKDIR /app

# Install Bun
RUN apk add --no-cache curl bash \
    && curl -fsSL https://bun.sh/install | bash

ENV BUN_INSTALL="/root/.bun"
ENV PATH="${BUN_INSTALL}/bin:${PATH}"

# Copy package files
COPY package.json bun.lock ./

# Install dependencies
RUN bun install --frozen-lockfile

# Copy project files
COPY . .

EXPOSE 3000

CMD ["bun", "run", "dev", "--hostname", "0.0.0.0", "--port", "3000"]
