import { Resonate } from "@resonatehq/sdk";
import { countdown } from "./count";

const resonate = new Resonate();

resonate.register("countdown", countdown);

// Gracefully stop on shutdown
process.on("SIGINT", () => {
  resonate.stop();
  process.exit(0);
});

process.on("SIGTERM", () => {
  resonate.stop();
  process.exit(0);
});
