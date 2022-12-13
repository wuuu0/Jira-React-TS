import { ReactNode } from "react";
import { AuthProvider } from "./auth-context";
import { QueryClient, QueryClientProvider } from "react-query";

// export const AppProviders = (children: ReactNode) => {}
// 以下参数中将 children 套来套去，是因为 function / JSX 表达式 接受的参数是 props
// props 是以各个参数为 key 的对象，而不是单个 children 对象
export const AppProviders = ({ children }: { children: ReactNode }) => {
  return (
    <QueryClientProvider client={new QueryClient()}>
      <AuthProvider>{children}</AuthProvider>;
    </QueryClientProvider>
  );
};
