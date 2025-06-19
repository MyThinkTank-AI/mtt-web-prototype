import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { PasswordInput } from "../ui/password-input";

function Login() {
  return (
    <div className="p-6">
      <Label htmlFor="email">Email</Label>
      <div className="mt-2">
        <Input
          aria-label="Email"
          name="email"
        />
      </div>
      <PasswordInput />
    </div>
  );
}

export default Login;
