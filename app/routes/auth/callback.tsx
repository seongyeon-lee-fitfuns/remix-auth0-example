import { authenticator } from "~/services/auth.server";
import { redirect } from "react-router";
import type { Route } from "./+types/callback";
import { sessionStorage } from "~/services/auth.server";

export async function loader({ request }: Route.LoaderArgs) {
    const user = await authenticator.authenticate("auth0", request);
    console.log("CALLBACK LOADER +++++++++");
    console.log("user", user);
    let session = await sessionStorage.getSession(request.headers.get("cookie"));
    session.set("user", user);
    return redirect("/", {
        headers: {
            "Set-Cookie": await sessionStorage.commitSession(session),
        },
    });
}