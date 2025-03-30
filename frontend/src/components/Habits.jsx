import { useSelector } from "react-redux"

export const Habits = () => {
    const { habits } = useSelector((state => state.habits))
    console.log('habitos en el compo', habits)
   
    const updateHabit = async(id)=>{
        await fetch(`http://localhost:5000/api/habits/markasdone/${id}`,{
            method:'PATCH'
        })
    }
    return (
        <div>
            Habits
            <ol className="list-inside list-decimal text-sm text-center sm:text-left font-[family-name:var(--font-geist-mono)]">
                {
                    habits.length > 0 && (
                        habits.map(item => (
                            <li key={item._id} className="mb-4">
                                <span className="mr-4">{item.title}</span>
                                <progress className="w-24" value={item.days/60} max={100}/>
                                <button className="ml-3 px-1 py-1 text-sm text-white bg-blue-500 rounded cursor-pointer" 
                                    onClick={()=>updateHabit(item._id)}>
                                        DONE
                                </button>
                            </li>
                        ))
                    )
                }
            </ol>

        </div>

    )
}
