declare global {
  namespace NodeJS {
    interface ProcessEnv {
      PORT?: string;
      NODE_ENV: "development" | "production";
      GOOGLE_ID: string;
      GOOGLE_SECRET: string;
    }
  }
}

export {};
