import { useEffect, useReducer } from "react"
import { todoReducer } from "./TodoReducer";

const init = () => {
    return JSON.parse( localStorage.getItem( 'todos' || [] ));
}

export const useTodos = () => {

    const [ todos, dispatchTodo ] = useReducer( todoReducer, [], init );

    useEffect(() => {
        localStorage.setItem('todos', JSON.stringify( todos ));

    }, [todos])

    const handleNewTodo = ( todo ) => {
        const action = {
            type: '[TODO] Add Todo',
            payload: todo
        }

        dispatchTodo( action );
    }

    const handleDeleteTodo = ( id ) => {
        const action = {
            type: '[TODO] Delete Todo',
            payload: id
        }

        dispatchTodo( action );
    }

    const handleToggleTodo = ( id ) => {
        const action = {
                type: '[TODO] Toggle Todo',
                payload: id
            }

        dispatchTodo( action );
    }

    return {
        todos,

        todosCount: todos.length,
        pendingTodosCount: todos.filter( todo => !todo.done ).length,

        handleNewTodo,
        handleDeleteTodo,
        handleToggleTodo
    }
}
