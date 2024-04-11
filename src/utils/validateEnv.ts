import { cleanEnv } from "envalid";
import { port, str } from "envalid/dist/validators";

export default cleanEnv(process.env, {
  mongodb_url: str(),
  port: port(),
  jwt_secret: str(),
});
