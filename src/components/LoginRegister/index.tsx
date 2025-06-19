import Login from "./Login";
import Register from "./Register";

function LoginRegister() {
  return (
    <div className="flex h-dvh items-center justify-center bg-blue-900">
      <div className="h-full max-h-180 w-full max-w-180 rounded-md bg-white shadow-md">
        <Login />
      </div>
    </div>
  );
}

export default LoginRegister;
