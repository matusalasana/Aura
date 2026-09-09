
import { useRouteError, isRouteErrorResponse } from "react-router-dom";

const ErrorPage = () => {
  const error = useRouteError();

  console.error(error);

  if (isRouteErrorResponse(error)) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <h1 className="text-3xl font-bold">
          {error.status} {error.statusText}
        </h1>

        <p>{error.data}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <h1 className="text-3xl font-bold">Something went wrong.</h1>

      <pre className="mt-4 text-red-500">
        {error instanceof Error ? error.message : String(error)}
      </pre>
    </div>
  );
};

export default ErrorPage;