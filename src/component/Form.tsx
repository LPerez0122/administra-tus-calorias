import { useState, ChangeEvent, FormEvent, Dispatch, useEffect } from "react"
import {v4 as  uuidv4} from "uuid"
import { Activity } from "../types"
import { categories } from "../data/categories"
import { ActivityActions, ActivityState } from "../reducers/activity-reducer"


type FormProps ={
   dispatch: Dispatch <ActivityActions>,
   state: ActivityState
}

const initialState : Activity = {
   id: uuidv4(),
   category: 1,
   name: " ",
   calories:0
}

export default function Form({dispatch, state} : FormProps  ) {

const [activity, setActivity] = useState<Activity>( initialState)

useEffect(() => {
   if (state.activeId) {
      const selectedActivity = state.activities.filter(stateActivity => stateActivity.id === state.activeId ) [0]
   setActivity(selectedActivity)
  
      
   }
},[state.activeId])

const handLeChace= (e:  ChangeEvent<HTMLInputElement>   |  ChangeEvent<HTMLSelectElement>  ) =>{
   const isNumberField = ["category", "calories"].includes(e.target.id)

   setActivity({
... activity,
[e.target.id ]: isNumberField ? + e.target.value : e.target.value


   })
}


const isValidActity = () =>{
   const {name, calories } = activity
   return name.trim() !== " " && calories > 0
}

const handleSumit = (e: FormEvent<HTMLFormElement> ) => {
e.preventDefault()

dispatch({type: "save-activity", payload: {newActivity: activity}})

setActivity({
   ...initialState,
   id: uuidv4()
})
}

  return (
         <form  className=" space-y-5 bg-white shadow p-10 rounded-lg"
         onSubmit={handleSumit}
         >
            <div className=" grid grid-cols-1 gap-3">
         <label className=" font-bold"  htmlFor="category">Categoria:</label>
         <select  className=" border border-slate-300 p-2 rounded-lg w-full bg-white" name="" id="category"
         value={activity.category}
         onChange= {handLeChace}
         >

          {categories.map ( category => (
<option key={category.id }

               value={category.id}
>  
{category.name}
</option>
          ))}
         </select>
            </div>

         <div className=" grid grid-cols-1 gap-3">
         <label className=" font-bold"  htmlFor="name">Activity:</label>
         <input  className=" border border-slate-300 p-2 rounded-lg"
         id="name"
         type="text"
         placeholder=" Ej, Comida Jugo, ejercicio, correr ,Etc"
         value={activity.name}
         onChange={handLeChace}
         />
         </div>

         <div className=" grid grid-cols-1 gap-3">
         <label className=" font-bold"  htmlFor="calories">Calorías:</label>
         <input  className=" border border-slate-300 p-2 rounded-lg"
         id="calories"
         type="number"
         placeholder=" Calorías ej, 400 0 600"
         value={activity.calories}
         onChange={handLeChace}
       
         />
         </div>

<input type="submit" 
className=" bg-gray-950 hover:bg-gray900 w-full p-2 font-bold  uppercase text-white cursor-pointer disabled:opacity-20"
value={activity.category === 1 ? " Guardar Comida": "Guardar Ejercicio"}
disabled={!isValidActity()}
/>
         </form>
  )
    
}
