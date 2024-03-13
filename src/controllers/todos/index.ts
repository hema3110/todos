import { ITodo, ICreateTodo, IUpdateTodo } from "./../../types"
import Todo from "../../models/todo"

const getTodos = async (): Promise<ITodo[]> => {
    try {
        const todos: ITodo[] = await Todo.find()
        return todos;
    } catch (error) {
        throw error
    }
}


const addTodo = async (newTodo: ICreateTodo): Promise<ITodo> => {
    try {
        return Todo.create({
                name: newTodo.name,
                description: newTodo.description,
                status: newTodo.status,
            });
    } catch (error) {
        throw error
    }
}


const updateTodo = async (id: string, newTodo: IUpdateTodo): Promise<ITodo | null> => {
    try {
        const updatedTodo = await Todo.findOneAndUpdate({ '_id': id }, newTodo);
        return updatedTodo;
    } catch (error) {
        throw error
    }
}


const deleteTodo = async (id: string) : Promise<ITodo | null> => {
    try {
        return Todo.findByIdAndDelete(id);
    } catch (error) {
        throw error
    }
}

export {getTodos, addTodo, updateTodo, deleteTodo}



