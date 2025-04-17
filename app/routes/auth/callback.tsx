import { authenticator } from "~/services/auth.server";
import { redirect } from "react-router";
import type { Route } from "./+types/callback";

export async function loader({ request }: Route.LoaderArgs) {
    const user = await authenticator.authenticate("auth0", request);
    console.log("CALLBACK LOADER +++++++++");
    console.log(user);
    if (user) {
        return redirect("/");
    }
    return redirect("/auth/login");
}