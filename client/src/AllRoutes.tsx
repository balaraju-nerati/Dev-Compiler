import { Suspense, lazy } from "react";
import { Route, Routes } from "react-router-dom";
import Loader from "./components/Loader/Loader";

const Home = lazy(()=> import("./pages/Home"))
const Login = lazy(()=> import("./pages/Login"))
const Signup = lazy(()=> import("./pages/Signup"))
const Compiler = lazy(()=> import("./pages/Compiler"))
const NotFound = lazy(()=> import("./pages/NotFound"))

export default function AllRoutes() {
  return (
    <Suspense fallback={<div className="flex justify-center items-center w-full h-[calc(100dvh-60px)]"><Loader/></div>}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/compiler/:urlId?" element={<Compiler />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  );
}
