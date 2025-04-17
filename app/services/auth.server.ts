import { Authenticator } from "remix-auth";
import { Auth0Strategy } from "remix-auth-auth0";
import { createCookieSessionStorage } from "react-router";

export const sessionStorage = createCookieSessionStorage({
  cookie: {
    name: "_auth_session",
    httpOnly: true,
    path: "/",
    secrets: ["s3cr3t"],
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
  },
});

export const { getSession, commitSession, destroySession } = sessionStorage;

export const authenticator = new Authenticator<any>();

authenticator.use(
  new Auth0Strategy(
    {
      domain: process.env.AUTH0_DOMAIN || "",
      clientId: process.env.AUTH0_CLIENT_ID || "",
      clientSecret: process.env.AUTH0_CLIENT_SECRET || "",
      redirectURI: process.env.AUTH0_REDIRECT_URI || "",
      scopes: ["openid", "email", "profile"]
    },
    async({ tokens }) => {
      // @ts-ignore
      const user = await getUser(tokens?.data.access_token);
      return user;
    },
  ),
  "auth0"
);

async function getUser(accessToken: string) {
  if (!accessToken) {
    console.error("액세스 토큰이 없습니다");
    return null;
  }
  
  try {
    const response = await fetch(`https://${process.env.AUTH0_DOMAIN}/userinfo`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      }
    });
    
    if (!response.ok) {
      console.error("응답 오류:", response.status, response.statusText);
      return null;
    }
    const data = await response.json();
    console.log("getUser data", data);
    return data;
  } catch (error) {
    console.error("사용자 정보 요청 중 오류 발생:", error);
    return null;
  }
}
