import { authenticator } from "~/services/auth.server";
import type { Route } from "./+types/login";

export async function action({ request }: Route.ActionArgs) {
    await authenticator.authenticate("auth0", request);
}

export async function loader({ request }: Route.LoaderArgs) {
    await authenticator.authenticate("auth0", request);
}