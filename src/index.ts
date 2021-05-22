import { Server } from "./server";

new Server().start()
  .then(() => {
    console.info("Server started...");
  })
  .catch((err) => {
    console.error(err);
  });
