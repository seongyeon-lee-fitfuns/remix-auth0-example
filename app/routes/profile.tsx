import { authenticator } from "~/services/auth.server";
import { redirect } from "react-router";
import { Link, useLoaderData } from "react-router";
import type { Route } from "./+types/profile";

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

export default function Profile() {
  const { user } = useLoaderData<typeof loader>();

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">사용자 프로필</h1>
      
      <div className="bg-white p-4 rounded shadow-md">
        {user.picture && (
          <div className="mb-4">
            <img 
              src={user.picture} 
              alt={`${user.name}의 프로필 사진`} 
              className="w-20 h-20 rounded-full"
            />
          </div>
        )}
        
        <div className="mb-4">
          <p className="font-bold">이름:</p>
          <p>{user.name}</p>
        </div>
        
        <div className="mb-4">
          <p className="font-bold">이메일:</p>
          <p>{user.email}</p>
        </div>
        
        <div className="mt-6 flex gap-4">
          <Link to="/" className="text-blue-500 hover:underline">
            홈으로
          </Link>
          <Link to="/dashboard" className="text-blue-500 hover:underline">
            대시보드
          </Link>
        </div>
      </div>
    </div>
  );
} 