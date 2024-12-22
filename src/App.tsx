import Form from "./component/Form"
import { useReducer, useEffect, useMemo } from "react"
import { activityReducer, initialState } from "./reducers/activity-reducer"
import ActivityList from "./component/ActivityList"
import CalorieTracker from "./component/CalorieTracker"

function App() {

  const [state, dispatch] = useReducer(activityReducer, initialState)

  useEffect ( () => {
localStorage.setItem("activities", JSON.stringify(state.activities))
  } , [state.activities])

  const canRestartApp = () => useMemo (() => state.activities.length, [state.activities]) 
  
  return (
    <>
    <header className=" bg-blue-950 py-3">

      <div className=" max-w-4xl mx-auto flex justify-between">
        <h1 className=" text-center text-lg font-bold text-white uppercase"> Contador de calorías </h1>
        <button className=" bg-gray-900 hover:bg-gray-950 p-2 font-bold uppercase text-white cursor-pointer 
         rounded-lg text-sm  disabled:opacity-20 text-center" 
         
         disabled={!canRestartApp()}
         onClick={() => dispatch ({type: "restart-app"})}
         >Reiniciar la  App</button>

      </div>



    </header>

    <section className="bg-blue-900 py-20 px-5">
      <div className=" max-w-4xl mx-auto">
        <p className=" text-white">Formulario de actividades</p>

        <Form
        dispatch={dispatch}
        state={state}
        />

      </div>
    </section>


<section className=" bg-gray-800 py-10">
  <div className=" max-w-4xl mx-auto">
  
  <CalorieTracker
  activities={state.activities}
  />

  </div>
</section>



    <ActivityList
    activities={state.activities}
    dispatch={dispatch}
    
    />
    <section className=" p-10 mx-auto max-w-4xl"></section>
   
    <footer className="bg-blue-950 py-3">

<div className=" max-w-4xl mx-auto flex justify-center">
  <h1 className="  text-lg   text-center font-bold text-white uppercase">Todos los derechos Pérez-Soft -2024</h1>

</div>



</footer>
    </>

    
  )
}

export default App
