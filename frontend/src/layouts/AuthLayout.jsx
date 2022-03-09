import { Outlet } from "react-router-dom"

const AuthLayout = () => {
  return (
    <>
      <main className="container mx-auto mt-5 md:mt-20 md:flex md:justify-center">
        <div className="w-full">
          <Outlet />
        </div>
      </main>
    </>
  )
}

export default AuthLayout