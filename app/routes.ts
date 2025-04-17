import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
    index("routes/home.tsx"),
    route("auth/login", "routes/auth/login.tsx"),
    route("auth/callback", "routes/auth/callback.tsx"),
    route("profile", "routes/profile.tsx"),
    route("dashboard", "routes/dashboard.tsx"),
] satisfies RouteConfig;
