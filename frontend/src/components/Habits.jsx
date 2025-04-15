import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getHabits, logoutUser } from "../store/slices/thunks";

export const Habits = () => {
    const { habits } = useSelector((state => state.habits))
    const { loading, error, token } = useSelector((state) => state.user);
    const dispatch = useDispatch()

    const [messages, setMessages] = useState({});

    const updateHabit = async (id) => {
        try {
            const resp = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}api/habits/markasdone/${id}`, {
                method: 'PATCH',
            });
            const data = await resp.json();
            setMessages(prev => ({
                ...prev,
                [id]: data.message || "Actualizado correctamente",
            }));

            setTimeout(() => {
                setMessages(prev => {
                    const copy = { ...prev };
                    delete copy[id];
                    return copy;
                });
            }, 1500);
        } catch (error) {
            setMessages(prev => ({
                ...prev,
                [id]: "Error al actualizar el hábito.",
            }));
        }
    };


    const createHabit = async (title, description) => {
        await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}api/habits/`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({
                "title": title,
                "description": description
            })
        })
    }

    const deleteHabit = async (id) => {
        await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}api/habits/${id}`, {
            method: 'DELETE',
            headers: {
                "Content-Type": "application/json",
            },
        })
        dispatch(getHabits(token));
    }

    const [credentials, setCredentials] = useState({
        title: "",
        description: "",
    });

    const handleChange = (e) => {
        setCredentials({
            ...credentials,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        await createHabit(credentials.title, credentials.description);
        setCredentials({
            title: "",
            description: "",
        })
        dispatch(getHabits(token));
    };

    const handleLogout = () => {
        dispatch(logoutUser());
    };

    return (
        <div className="flex flex-row gap-10 justify-center" style={{ width: '1000px' }}>
            <form
                onSubmit={handleSubmit}
                className="p-1 mb-2 rounded-2xl shadow-md w-full max-w-sm"
            >
                <div className="mb-4">
                    <label className="block mb-1 text-sm font-medium">Titulo</label>
                    <input
                        type="text"
                        name="title"
                        value={credentials.title}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-400"
                    />
                </div>

                <div className="mb-4">
                    <label className="block mb-1 text-sm font-medium">Descripcion</label>
                    <input
                        type="text"
                        name="description"
                        value={credentials.description}
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
                    className={`w-full py-2 rounded-lg text-white font-semibold ${loading ? "bg-blue-300" : "bg-green-500 hover:bg-green-600"
                        } transition`}
                >
                    {loading ? "Cargando..." : "Crear nuevo habito"}
                </button>
            </form>
            <div className="">
                {habits.length === 0 ? (
                    <div className="text-center text-sm text-gray-500">
                        No tienes hábitos registrados aún.
                    </div>
                ) : (
                    <>
                        <h2 className="text-lg font-semibold mb-2">Hábitos actuales:</h2>
                        <ol className="list-inside list-decimal text-sm text-center sm:text-left font-[family-name:var(--font-geist-mono)]">
                            {habits.map(item => (
                                <li key={item._id} className="mb-4">
                                    <span className="mr-4">{item.title}</span>
                                    <progress
                                        className="w-24"
                                        value={(item.days / 60) * 100}
                                        max={100}
                                    />
                                    <button
                                        className="ml-3 px-1 py-1 text-sm text-white bg-blue-500 rounded cursor-pointer"
                                        onClick={() => updateHabit(item._id)}
                                    >
                                        DONE
                                    </button>
                                    <button
                                        className="ml-3 px-1 py-1 text-sm text-white bg-red-500 rounded cursor-pointer"
                                        onClick={() => deleteHabit(item._id)}
                                    >
                                        BORRAR
                                    </button>
                                    {messages[item._id] && (
                                        <p className="mt-2 text-sm text-yellow-400">
                                            {messages[item._id]}
                                        </p>
                                    )}
                                </li>
                            ))}
                        </ol>
                    </>
                )}
                <button className="p-2 rounded-lg font-semibold text-white bg-amber-500 cursor-pointer"
                    onClick={handleLogout}>
                    LOGOUT
                </button>
            </div>


        </div>

    )
}
