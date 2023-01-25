import React, { Fragment, useState, useRef, useEffect } from 'react';
import { v4 as uuidv4} from "uuid";
import { TodoList } from './components/TodoList'

const KEY = 'todoApp.todos'; //Para localizar donde guardo los datos del localStorage    
let sorterDes = true;

export function App() {
    const [todos, setTodos] = useState([ //Creamos el estado para tener el array de todos(tareas) y el set para poder crear mas
        { id: 1, task: "Tarea 1", completed: false, priority: 1 }
    ]);

    const todoTaskRef = useRef(); //Para coger la referencia en el codigo mas abajo

    const todoPrioRef = useRef(); //Para coger la referencia en el codigo mas abajo

    useEffect(()=>{
        const storedTodos = JSON.parse(localStorage.getItem(KEY)); //Como se guarda como string lo paso a JSON con el parse.
        if(storedTodos){ //Si tengo algo guardado
            setTodos(storedTodos); //Recupero las tareas
        }
    }, []); //Dejo vacio el [] ya que se ejecuta al incio

    useEffect(()=> {
        localStorage.setItem(KEY, JSON.stringify(todos)); //Se guarda siempre como string en el localStorage
    }, [todos]); //Al poner algo dentro de [] se ejecuta cada vez que identifica un cambio en el componente que has pasado

    const toggleTodo = (id) =>{ //funcion que voy a ir pasando hacia abajo para que luego vaya subiendo hasta mi cuando me llamen con ese id
        const newTodos = [...todos]; //Al poner los 3 puntos (Spread operator) delante recibes una copia de la variable que pongas
        const todo = newTodos.find((todo) => todo.id === id);
        todo.completed = !todo.completed;
        setTodos(newTodos); // a todos le asigno la nueva copia
    }

    const handleTodoAdd = () => {
        const task = todoTaskRef.current.value; //Me da el valor de la referencia
        const prio = todoPrioRef.current.value; //Me da el valor de la referencia
        if(task ==="") return;

        setTodos((prevTodos) =>{ //Al meter una funcion en setTodos, cojo una copia anterior de Todos y la meto en prevTodos
            return [...prevTodos, {id: uuidv4(), task, completed: false, priority: prio}]
        });

        todoTaskRef.current.value = null;
        todoPrioRef.current.value = null;
    };

    const handleClearALL = () =>{
        const newTodos = todos.filter((todo) => !todo.completed); //Me creo una copia con los que no estan completados
        setTodos(newTodos); //Establezco solo los que no estan completados, de esta forma elimino los que ya han sido completados

    }

    const handleSort = () =>{
        let newTodos;
        if(sorterDes){
            newTodos = [...todos].sort((a,b) => b.priority - a.priority); //Me creo una copia y la ordeno
        }
        else{
            newTodos = [...todos].sort((a,b) => a.priority - b.priority); //Me creo una copia y la ordeno
        }
        sorterDes = !sorterDes;
        setTodos(newTodos); //Establezco solo los que no estan completados, de esta forma elimino los que ya han sido completados

    }

    return ( //Aqui en el boton de mas marco la referencia que se coge mas arriba
        <Fragment>
            <TodoList todos={todos} toggleTodo={toggleTodo}/>
            <button onClick={handleSort}>Ordenar</button>
            <label> </label>
            <button onClick={handleClearALL}>Borrar</button><br></br><br></br>

            <div>Te queda {todos.filter((todo) => !todo.completed).length} tareas por terminar</div>

            <hr></hr>
            <label>Nombre   </label>
            <input ref={todoTaskRef} type="text" placeholder="Nueva Tarea" /><br></br><br></br>
            <label>Prioridad   </label>
            <input ref={todoPrioRef} type="number" min ="0" max="10" placeholder="1-10"/> <br></br><br></br>

            <button onClick={handleTodoAdd}>Añadir</button>
        </Fragment>
    );
}