import { authenticator } from "~/services/auth.server";
import type { Route } from "./+types/login";
import { redirect } from "react-router";

export async function action({ request }: Route.ActionArgs) {
    await authenticator.authenticate("auth0", request);
}

export async function loader({ request }: Route.LoaderArgs) {
    return redirect("/");
}