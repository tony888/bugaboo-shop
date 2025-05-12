import { config } from "dotenv";
import { get } from "env-var";

config({ path: process.env.NODE_ENV === "test" ? ".env.test" : ".env" });

export default () => ({
    nodeEnv: get('NODE_ENV').default('develop').asString(),
    redis: {
        url: get('REDIS_URL').asString(),
        port: get('REDIS_PORT').asInt(),
    },
    mailgun: {
        apiKey: get('MAILGUN_API_KEY').asString(),
        domain: get('MAILGUN_DOMAIN').asString(),
    },
    bugabooShop:{
        apiKey:get('BUGABOO_SHOP_API_KEY').asString(),
        domain:get('BUGABOO_SHOP_DOMAIN').asString(),
    },
    host:{
        url:get('HOST_URL').asString(),
    },
});
