import { Link, useLoaderData } from "react-router";
import type { Route } from "./+types/home";
import { authenticator } from "~/services/auth.server";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Remix Auth0 예제" },
    { name: "description", content: "Remix와 Auth0를 사용한 인증 예제" },
  ];
}

export async function loader({ request }: Route.LoaderArgs) {
  // 로그인 상태 확인
  try {
    const user = await authenticator.authenticate("auth0", request);
    console.log("HOME LOADER +++++++++");
    console.log(user);
    return user;
  } catch (error) {
    return null;
  }
}

export default function Home() {
  const user = useLoaderData<typeof loader>();

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">홈페이지</h1>
      
      {user ? (
        <div className="bg-white p-4 rounded shadow-md mb-6">
          <p className="mb-2"><span className="font-bold">환영합니다,</span> {user.name}님!</p>
          <div className="flex gap-4 mt-4">
            <Link to="/profile" className="text-blue-500 hover:underline">
              내 프로필
            </Link>
            <Link to="/dashboard" className="text-blue-500 hover:underline">
              대시보드
            </Link>
          </div>
        </div>
      ) : (
        <div className="bg-white p-4 rounded shadow-md mb-6">
          <p className="mb-4">로그인하여 모든 기능을 이용해보세요!</p>
          <Link 
            to="/auth/login" 
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            로그인
          </Link>
        </div>
      )}
      
      <div className="bg-gray-100 p-4 rounded mt-8">
        <h2 className="text-xl font-bold mb-2">이 예제 사이트 소개</h2>
        <p>이 사이트는 Remix와 Auth0를 사용한, 로그인 상태에 따라 다른 컨텐츠를 보여주는 예제입니다.</p>
        <ul className="list-disc ml-6 mt-2">
          <li>로그인하지 않은 사용자는 제한된 정보만 볼 수 있습니다.</li>
          <li>로그인한 사용자는 프로필과 대시보드에 접근할 수 있습니다.</li>
        </ul>
      </div>
    </div>
  );
}
