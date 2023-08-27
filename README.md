# express-server-with-gzip-and-api-proxy

Simple Express configuration for serving static builds with gzip compression and a proxy middleware for connections to a remote API server.

## Setup

### Environment Variables

Before running the server, you need to create a `.env` file at the root of your project to specify some important configurations. Here are the keys you must include:

- `PORT`: The port number on which your Express server will run.
- `REMOTE_API_URL`: The base URL of the remote API server to which the proxy will forward the requests.
- `LOCAL_API_PREFIX`: The prefix for local routes that should be proxied to the remote server (e.g., `/api`).
- `LOCAL_SERVER_DIRECTORY`: Directory from which static files will be served (e.g., `public`).

Your `.env` file should look something like this:

```
PORT=3000
REMOTE_API_URL=https://remote-server.com
LOCAL_API_PREFIX=/api
LOCAL_SERVER_DIRECTORY=public
```

**Note**: Remember to exclude `.env` from version control by adding it to your `.gitignore` file to prevent sensitive information from being exposed.

### Running the server

Once you've set up your environment variables, you can start the server using:

```bash
npm run start
```

This will launch the Express server on the specified `PORT` and set up the proxy as configured.

_Special thanks to ChatGPT by OpenAI for assistance in setting up this project._
