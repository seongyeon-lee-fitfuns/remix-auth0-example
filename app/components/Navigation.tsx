import { Link } from "react-router";

interface NavigationProps {
  isAuthenticated: boolean;
  user?: {
    name: string;
    picture?: string;
  } | null;
}

export default function Navigation({ isAuthenticated, user }: NavigationProps) {
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
          
          {isAuthenticated ? (
            <>
              <Link to="/dashboard" className="hover:text-gray-300">
                대시보드
              </Link>
              <Link to="/profile" className="hover:text-gray-300">
                내 프로필
              </Link>
              <div className="flex items-center space-x-2">
                {user?.picture && (
                  <img 
                    src={user.picture} 
                    alt={`${user.name}의 프로필`} 
                    className="w-8 h-8 rounded-full"
                  />
                )}
                <span>{user?.name}</span>
              </div>
            </>
          ) : (
            <Link 
              to="/auth/login" 
              className="bg-blue-500 hover:bg-blue-600 px-3 py-1 rounded"
            >
              로그인
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
} 