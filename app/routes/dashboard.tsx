import { authenticator } from "~/services/auth.server";
import { redirect } from "react-router";
import { Link, useLoaderData } from "react-router";
import type { Route } from "./+types/dashboard";

export async function loader({ request }: Route.LoaderArgs) {
  // 인증 확인
  try {
    const user = await authenticator.authenticate("auth0", request);
    if (!user) {
      return redirect("/auth/login");
    }
    return { user };
  } catch (error) {
    return redirect("/auth/login");
  }
}

export default function Dashboard() {
  const { user } = useLoaderData<typeof loader>();
  
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">대시보드</h1>
      
      <div className="bg-white p-4 rounded shadow-md mb-6">
        <p className="mb-2"><span className="font-bold">환영합니다,</span> {user.name}님!</p>
        <p>이 페이지는 로그인한 사용자만 볼 수 있습니다.</p>
      </div>
      
      <div className="bg-white p-4 rounded shadow-md">
        <h2 className="text-xl font-bold mb-2">내 정보</h2>
        <p><span className="font-bold">이메일:</span> {user.email}</p>
      </div>
      
      <div className="mt-6 flex gap-4">
        <Link to="/" className="text-blue-500 hover:underline">
          홈으로
        </Link>
        <Link to="/profile" className="text-blue-500 hover:underline">
          프로필
        </Link>
      </div>
    </div>
  );
} 