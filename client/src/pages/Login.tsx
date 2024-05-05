import "./PageStyles/background.css";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Link, useNavigate } from "react-router-dom";
import { useLoginMutation } from "@/redux/slices/api";
import { handleError } from "@/utils/handleError";
import { useDispatch, useSelector } from "react-redux";
import { updateCurrentUser, updateIsLoggedIn } from "@/redux/slices/appSlice";

const formSchema = z.object({
  userId: z.string(),
  password: z.string(),
});

export default function Login() {
  const [login, { isLoading }] = useLoginMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isLoggedIn = useSelector(
    (state: RootState) => state.appSlice.isLoggedIn
  );

  if(isLoggedIn === true){
    navigate("/")
  }
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      userId: "",
      password: "",
    },
  });
  async function handleLogin(values: z.infer<typeof formSchema>) {
    try {
      const response = await login(values).unwrap();
      dispatch(updateCurrentUser(response));
      dispatch(updateIsLoggedIn(true));
      navigate("/");
    } catch (error) {
      handleError(error);
    }
  }
  return (
    <div className="__login w-full h-[calc(100dvh-60px)] pattern-bg flex justify-center items-center">
      <div className="__form_container flex flex-col gap-8 border border-gray-800 rounded-md py-10 px-6 text-center tracking-wide">
        <div className="flex flex-col gap-2">
          <h1 className="text-4xl font-bold">Welcome Back!</h1>
          <p>Please enter your details to login</p>
        </div>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleLogin)}
            className="flex flex-col gap-2"
          >
            <FormField
              control={form.control}
              name="userId"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      required
                      disabled={isLoading}
                      placeholder="Enter Username/Email"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      required
                      disabled={isLoading}
                      type="password"
                      placeholder="Enter password"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button loading={isLoading} type="submit" className="w-full">
              Login
            </Button>
          </form>
        </Form>
        <div>
          <p>
            Don't have an account?{" "}
            <Link className=" text-blue-500" to="/signup">
              Signup
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
