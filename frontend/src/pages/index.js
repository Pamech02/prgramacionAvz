import Image from "next/image";
import { Geist, Geist_Mono } from "next/font/google";
import { useEffect, useState } from "react";
import { getHabits } from "../store/slices/thunks";
import { useDispatch, useSelector } from "react-redux";
import { Habits } from "../components/Habits";
import { loginUser, loadTokenFromStorage, registerUser } from "../store/slices/thunks";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function Home() {

  const dispatch = useDispatch()

  const { loading, error, status, token } = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(loadTokenFromStorage());
  }, [dispatch]);

  useEffect(() => {
    if (token) {
      dispatch(getHabits(token));
    }
  }, [token, dispatch]);

  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
    username2: "",
    password2: "",
  });

  const handleChange = (e) => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(credentials)
    dispatch(loginUser(credentials.username, credentials.password));
    setCredentials({
      username: "",
      password: "",
      username2: "",
      password2: "",
    })
  };

  const handleSubmit2 = (e) => {
    e.preventDefault();
    console.log(credentials)
    dispatch(registerUser(credentials.username2, credentials.password2));
    setCredentials({
      username: "",
      password: "",
      username2: "",
      password2: "",
    })
  };

  return (
    <div
      className={`${geistSans.variable} ${geistMono.variable} grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]`}
    >
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <Image
          className="dark:invert"
          src="/next.svg"
          alt="Next.js logo"
          width={180}
          height={38}
          priority
        />

        {
          status ? (
            <Habits />

          ) : (
            <div className="flex flex-row items-center justify-center">
              <form
                onSubmit={handleSubmit}
                className="p-8 rounded-2xl shadow-md w-full max-w-sm"
              >
                <h2 className="text-2xl font-semibold mb-6 text-center text-amber-50">Iniciar Sesión</h2>

                <div className="mb-4">
                  <label className="block mb-1 text-sm font-medium">Username</label>
                  <input
                    type="text"
                    name="username"
                    value={credentials.username}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-400"
                  />
                </div>

                <div className="mb-4">
                  <label className="block mb-1 text-sm font-medium">Contraseña</label>
                  <input
                    type="password"
                    name="password"
                    value={credentials.password}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-400"
                  />
                </div>

                {error && (
                  <p className="text-red-500 text-sm mb-4 text-center">{error}</p>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  className={`w-full py-2 rounded-lg text-white font-semibold ${loading ? "bg-blue-300" : "bg-blue-500 hover:bg-blue-600"
                    } transition`}
                >
                  {loading ? "Cargando..." : "Ingresar"}
                </button>
              </form>
              <form
                onSubmit={handleSubmit2}
                className="p-8 rounded-2xl shadow-md w-full max-w-sm"
              >
                <h2 className="text-2xl font-semibold mb-6 text-center text-amber-50">Registrarse</h2>

                <div className="mb-4">
                  <label className="block mb-1 text-sm font-medium">Username</label>
                  <input
                    type="text"
                    name="username2"
                    value={credentials.username2}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-400"
                  />
                </div>

                <div className="mb-4">
                  <label className="block mb-1 text-sm font-medium">Contraseña</label>
                  <input
                    type="password"
                    name="password2"
                    value={credentials.password2}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-400"
                  />
                </div>

                {error && (
                  <p className="text-red-500 text-sm mb-4 text-center">{error}</p>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  className={`w-full py-2 rounded-lg text-white font-semibold ${loading ? "bg-blue-300" : "bg-yellow-500 hover:bg-yellow-600"
                    } transition`}
                >
                  {loading ? "Cargando..." : "Crear usuario"}
                </button>
              </form>
            </div>
          )
        }


      </main>

    </div>
  );
}
