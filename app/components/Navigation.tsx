import { Link } from "react-router";
import { useFetcher } from "react-router";

export default function Navigation({ user }: { user: any }) {
  const fetcher = useFetcher();

  return (
    <nav className="bg-gray-800 text-white p-4">
      <div className="container mx-auto flex flex-wrap items-center justify-between">
        <div className="flex items-center">
          <Link to="/" className="text-xl font-bold">
            Remix Auth0 예제
          </Link>
        </div>
        
        <div className="flex items-center space-x-6">
          <Link to="/" className="hover:text-gray-300">
            홈
          </Link>
          
          {user ? (
            <>
              <Link to="/dashboard" className="hover:text-gray-300">
                대시보드
              </Link>
              <Link to="/profile" className="hover:text-gray-300">
                내 프로필
              </Link>
              <div className="flex items-center space-x-2 mr-4">
                {user?.picture && (
                  <img 
                    src={user.picture} 
                    alt={`${user.name}의 프로필`} 
                    className="w-8 h-8 rounded-full"
                  />
                )}
                <span>{user?.name}</span>
              </div>
              <fetcher.Form method="GET" action="/auth/logout">
                <button type="submit" className="bg-red-500 hover:bg-red-600 px-3 py-1 rounded">
                  로그아웃
                </button>
              </fetcher.Form>
            </>
          ) : (
            <fetcher.Form method="POST" action="/auth/login">
              <button type="submit" className="bg-blue-500 hover:bg-blue-600 px-3 py-1 rounded">
                로그인
              </button>
            </fetcher.Form>
          )}
        </div>
      </div>
    </nav>
  );
} 