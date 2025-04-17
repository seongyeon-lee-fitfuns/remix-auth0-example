import { redirect, type LoaderFunctionArgs } from "react-router";
import { destroySession, getSession } from "~/services/auth.server";

export async function loader({ request }: LoaderFunctionArgs) {
  // 로컬 세션 가져오기
  const session = await getSession(request.headers.get("cookie"));
  
  // Auth0 로그아웃 URL 생성
  const logoutURL = new URL(`https://${process.env.AUTH0_DOMAIN}/v2/logout`);
  
  // Auth0 로그아웃 후 돌아올 URL 설정 (returnTo 파라미터)
  const returnTo = new URL(request.url);
  returnTo.pathname = "/";
  logoutURL.searchParams.set("returnTo", returnTo.toString());
  
  // Auth0 클라이언트 ID 추가
  logoutURL.searchParams.set("client_id", process.env.AUTH0_CLIENT_ID || "");
  
  // 로컬 세션 파기
  return redirect(logoutURL.toString(), {
    headers: {
      "Set-Cookie": await destroySession(session),
    },
  });
} 