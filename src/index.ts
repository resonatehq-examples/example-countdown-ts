import { Resonate, type Context } from "@resonatehq/sdk";

async function notify(ctx: Context, url: string, msg: string) {
  await fetch(url, {
    method: "POST",
    body: msg,
    headers: {
      "Content-Type": "text/plain",
    },
  });
}

export function* countdown(
  ctx: Context,
  count: number,
  delay: number,
  url: string,
) {
  for (let i = count; i > 0; i--) {
    // send notification to ntfy.sh
    yield* ctx.run(notify, url, `Countdown: ${i}`);
    // sleep
    yield* ctx.sleep(delay * 60 * 1000);
  }
  // send the last notification to ntfy.sh
  yield* ctx.run(notify, url, `Done`);
}

const resonate = Resonate.remote({
  url: "http://localhost:8001",
});

resonate.register("countdown", countdown);
