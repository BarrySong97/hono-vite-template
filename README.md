# onedrive-hook-update

This project is a backend application built with [Hono](https://hono.dev/) and [Vite](https://vitejs.dev/).

## Features

- **Fast Development**: Leverages Vite for a fast development experience.
- **Modern Backend Framework**: Uses Hono, a small, simple, and ultrafast web framework for the Edge.
- **Environment Configuration**: Supports environment variable configuration using `.env` files via the `dotenv` package.
- **Logging**: Integrated with `pino` for efficient JSON logging, likely using `hono-pino` middleware.

## Getting Started

### Prerequisites

- Node.js (version specified in `package.json` if applicable, or latest LTS)
- npm, yarn, or pnpm

### Installation

1.  Clone the repository:

    ```bash
    git clone <your-repository-url>
    cd onedrive-hook-update
    ```

2.  Install dependencies:

    ```bash
    npm install
    # or
    # yarn install
    # or
    # pnpm install
    ```

3.  Set up your environment variables:
    Create a `.env` file in the root of the project and add your necessary environment variables.
    Example:
    ```env
    PORT=3000
    ANOTHER_VARIABLE=your_value
    ```
    _(Note: While Hono might listen on a specific port if configured, when running with `vite` for development, it typically serves through Vite's port.)_

### Running the Development Server

To start the development server, run:

```bash
npm run dev
# or
# yarn dev
# or
# pnpm dev
```

The application will typically be accessible at `http://localhost:5173`. Vite's dev server will proxy requests to your Hono application.

## Building for Production

To build the application for production, run:

```bash
npm run build
# or
# yarn build
# or
# pnpm build
```

This will create a production-ready build in the `dist` directory. You can then deploy the contents of this directory or use a Node.js server (like `@hono/node-server`, which is in your dependencies) to serve the application.

### Running the Production Build

After building the project, you can run the server using:

```bash
node ./dist/index.cjs
```

Make sure you have configured any necessary environment variables for your production environment.

## Running with Docker

To build and run the application using Docker, follow these steps:

1.  **Build the Docker image:**

    ```bash
    docker build -t hono-server .
    ```

2.  **Run the Docker container:**

    ```bash
    docker run -d -p 3000:3000 --name hono-server hono-server
    ```

    This command runs the container in detached mode (`-d`), maps port 3000 of the host to port 3000 of the container (`-p 3000:3000`), and names the container `hono-server` for easier management.

    **Environment Variables:**

    If your application requires environment variables, you can pass them to the `docker run` command using the `-e` flag or an environment file (`--env-file`). For example:

    ```bash
    docker run -d -p 3000:3000 -e PORT=3000 -e ANOTHER_VARIABLE=your_value --name onedrive-hook-app onedrive-hook-update
    ```

    Or, using an environment file (e.g., `.env.docker`):

    ```bash
    # .env.docker
    PORT=3000
    ANOTHER_VARIABLE=your_value
    ```

    Then run:

    ```bash
    docker run -d -p 3000:3000 --env-file ./.env.docker --name onedrive-hook-app onedrive-hook-update
    ```
