import { useSelector } from "react-redux";

export default function Home() {
  const isLoggedIn = useSelector(
    (state: RootState) => state.appSlice.isLoggedIn
  );

  const currentUser = useSelector(
    (state: RootState) => state.appSlice.currentUser
  );
  return (
    <div className="w-full h-[calc(100dvh-60px)] text-white flex flex-col justify-center items-center gap-4">
      {isLoggedIn ? (
        <>
        <h1 className="text-6xl font-bold text-center">
            Hello {currentUser.username} !
          </h1>
          <p className="text-gray-500 text-center text-lg">
            Please navigate to compiler section to build some stuff
          </p>
        </>
      ) : (
        <>
          <h1 className="text-6xl font-bold text-center">
            Welcome to Dev-Compiler
          </h1>
          <p className="text-gray-500 text-center text-lg">
            Please login to build some stuff
          </p>
        </>
      )}
    </div>
  );
}
