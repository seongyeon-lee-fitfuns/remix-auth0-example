import { authenticator } from "~/services/auth.server";
import type { Route } from "./+types/login";

export async function loader({ request }: Route.LoaderArgs) {
    await authenticator.authenticate("auth0", request);
    
}