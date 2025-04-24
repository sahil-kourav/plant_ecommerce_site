import CommonForm from "@/components/common/form";
import { useToast } from "@/components/ui/use-toast";
import { loginFormControls } from "@/config";
import { loginUser } from "@/store/auth-slice";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";

const initialState = {
  email: "",
  password: "",
};

function AuthLogin() {
  const [formData, setFormData] = useState(initialState);
  const dispatch = useDispatch();
  const { toast } = useToast();

  function onSubmit(event) {
    event.preventDefault();

    dispatch(loginUser(formData)).then((data) => {
      if (data?.payload?.success) {
        toast({
          title: data?.payload?.message,
        });
      } else {
        toast({
          title: data?.payload?.message,
          variant: "destructive",
        });
      }
    });
  }

  return (
    <div className="w-full max-w-md flex items-center justify-center bg-muted dark:bg-background">
      <div className="w-full max-w-md bg-white dark:bg-card rounded-2xl shadow-md space-y-6 transition-all duration-300">
        <div className="text-center space-y-2">
          <h1 className="text-2xl sm:text-3xl font-bold text-foreground">
            Sign in to your account
          </h1>
          <p className="text-sm text-muted-foreground">
            Don’t have an account?
            <Link
              to="/auth/register"
              className="ml-1 text-primary hover:underline font-medium"
            >
              Register
            </Link>
          </p>
        </div>

        <CommonForm
          formControls={loginFormControls}
          buttonText="Sign In"
          formData={formData}
          setFormData={setFormData}
          onSubmit={onSubmit}
        />
      </div>
    </div>
  );
}

export default AuthLogin;
