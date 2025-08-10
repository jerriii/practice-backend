import express from "express";
import cors from "cors";
import helmet from "helmet";
import Database from "./config/db";
import { ENV } from "./config/env";
import routes from "./routes";
import { errorHandler } from "./middlewares/errorHandler";

const corsOptions = {
  origin: (
    origin: string | undefined,
    callback: (err: Error | null, allow?: boolean) => void
  ) => {
    const allowedOrigins = ["http://localhost:3000"];
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
};

class Server {
  private app: express.Application;
  private port: number | string;

  private initializeMiddlewares() {
    // Add security headers using helmet
    this.app.use(
      helmet({
        crossOriginResourcePolicy: { policy: "cross-origin" },
        contentSecurityPolicy: {
          directives: {
            ...helmet.contentSecurityPolicy.getDefaultDirectives(),
            "img-src": ["'self'", "data:", "blob:", "http://localhost:5000"],
          },
        },
      })
    );

    this.app.use(cors(corsOptions));
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(
      "/uploads",
      cors(corsOptions), // Apply the same CORS rules
      express.static("public/uploads") // Ensure this matches your upload directory name
    );
  }

  private initializeRoutes() {
    this.app.use("/api", routes);
  }

  private initializeErrorHandling() {
    // Then handle other errors
    this.app.use(errorHandler);
  }

  public async start() {
    try {
      await this.initializeService();
      this.startListening();
    } catch (error) {
      this.gracefulShutdown(error as Error);
    }
  }

  private async initializeService() {
    await Database.connect();
  }

  private startListening() {
    this.app.listen(this.port, () => {
      console.log(`🚀 Server running on port ${this.port}`);
    });
  }

  private gracefulShutdown(error?: Error) {
    console.error("❌ Startup failed:", error);
    Database.disconnect().finally(() => process.exit(1));
  }

  constructor() {
    this.app = express();
    this.port = ENV.PORT || 5000;
    this.initializeMiddlewares();
    this.initializeRoutes();
    this.initializeErrorHandling();
  }
}

const server = new Server();
server.start();
