import { useState } from "react";
import { Eye, EyeOff, LoaderCircle } from "lucide-react";

function LoginRegister() {
  const [showPassword, setShowPassword] = useState(false);
  const [form, setForm] = useState<{ email: string; password: string }>({
    email: "",
    password: "",
  });
  const [type, setType] = useState<"login" | "register">("login");
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(false);

  const isLogin = type === "login";

  const handleSubmit = async () => {
    setFetching(true);
    // Simulate an API call
    const results = await fetch(`/api/auth/email/${type}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
    });

    const data = await results.json();
    console.log(data);

    setFetching(false);
  };

  return (
    <div className="h-dvh w-full bg-blue-900">
      <div className="flex h-full items-center justify-center p-4">
        <div className="-mt-20 flex h-fit max-h-180 min-h-120 w-full max-w-130 flex-col justify-center rounded-md bg-[#FBFBFB] p-6 shadow-md">
          {loading ? (
            <div className="flex items-center justify-center">
              <LoaderCircle
                className="animate-spin text-blue-500"
                width={60}
                height={60}
              />
            </div>
          ) : (
            <>
              <h2 className="text-3xl font-bold">Welcome to MyThinkTank.AI</h2>
              <p className="text-md mt-4 text-slate-600">
                {isLogin ? "Sign in to your account" : "Create an account"}
              </p>

              <div className="mt-10">
                <label
                  htmlFor="email"
                  className="mb-3.5 block text-sm font-medium text-slate-600 dark:text-white"
                >
                  Email
                </label>
                <input
                  type="text"
                  id="email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="block w-full rounded-lg border border-slate-300 bg-white p-3.5 text-sm text-slate-600 focus:border-2 focus:border-blue-400 focus:ring-blue-400 focus:outline-none dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                  required
                />
              </div>
              <div className="mt-4">
                <label
                  htmlFor="password"
                  className="mb-3.5 block text-sm font-medium text-slate-600 dark:text-white"
                >
                  Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    id="password"
                    value={form.password}
                    onChange={(e) =>
                      setForm({ ...form, password: e.target.value })
                    }
                    className="block w-full rounded-lg border border-slate-300 bg-white p-3.5 text-sm text-slate-600 focus:border-2 focus:border-blue-400 focus:ring-blue-400 focus:outline-none dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                    aria-label="Password"
                    required
                  />
                  <button
                    type="button"
                    data-toggle-password='{"target": "#password"}'
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 end-0 z-20 flex cursor-pointer items-center rounded-e-md px-3 text-gray-400 hover:text-blue-600 hover:outline-hidden dark:text-neutral-600 dark:focus:text-blue-500"
                    aria-label={
                      showPassword ? "Hide password" : "Show password"
                    }
                    aria-controls="password"
                  >
                    {showPassword ? <EyeOff /> : <Eye />}
                  </button>
                </div>
              </div>
              <div className="relative mt-10">
                <button
                  type="submit"
                  onClick={handleSubmit}
                  className="focus:ring-opacity-50 flex w-full justify-center place-self-center rounded-sm bg-blue-400 px-4 py-3 font-semibold text-white transition-colors duration-200 hover:cursor-pointer hover:bg-blue-500 focus:ring-2 focus:ring-blue-400 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50"
                  disabled={fetching}
                >
                  {fetching && (
                    <LoaderCircle className="mr-2 animate-spin text-white" />
                  )}
                  {type.split("")[0].toUpperCase() + type.slice(1)}
                </button>
              </div>

              <p className="mt-4 text-center text-sm text-slate-600">
                {isLogin ? "Don't " : "Already "} have an account?{" "}
                <span
                  className="cursor-pointer text-sm font-medium text-blue-400"
                  onClick={() => {
                    setLoading(true);
                    setTimeout(() => {
                      setType(isLogin ? "register" : "login");
                      setLoading(false);
                    }, 200);
                  }}
                >
                  {isLogin ? "Register" : "Login"}
                </span>
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default LoginRegister;
