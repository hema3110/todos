import { Router, Request } from "express"
import { getTodos, addTodo, updateTodo, deleteTodo } from "../controllers/todos"
import { ICreateTodo, ITodo, IUpdateTodo } from "../types";

const router: Router = Router();

router.get("/info", (req, res) => {
    res.status(200).send({ message: "Hello World!" })
})

router.get("/todos", async (req, res) => {
    const todos: ITodo[] = await getTodos();
    res.status(200).send(todos);
})


router.post("/add-todo", async (req: Request<{}, ITodo, ICreateTodo>, res) => {
    const addedTodo: ITodo = await addTodo(req.body);
    res.status(201).send(addedTodo);
})


router.put("/update-todo/:id", async (req: Request<{ id: string }, ITodo | null, IUpdateTodo>, res) => {
    const updatedTodo: ITodo | null = await updateTodo(req.params.id, req.body);
    if (updatedTodo === null) {
        res.status(404);
    } else {
        res.status(200).send(updatedTodo);
    }
})


router.delete("/delete/:id", async (req: Request<{ id: string }, ITodo | null>, res) => {
    const deletedTodo: ITodo | null = await deleteTodo(req.params.id);
    if (!deletedTodo) {
        res.status(404);
    } else {
        res.status(200).send(deletedTodo);
    }
})

export default router