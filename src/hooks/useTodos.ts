import { useEffect, useMemo, useReducer } from "react";
import type { Todo, Filter } from "../utils/types";
import { reducer, initialState, type State } from "./todosReducer";

const STORAGE_KEY = "todos2025";

export function useTodos(initialStateOverride: State = initialState) {
  const [state, dispatch] = useReducer(
    reducer,
    initialStateOverride,
    (seedState) => {
      try {
        const raw = localStorage.getItem(STORAGE_KEY);
        return raw
          ? { ...seedState, todos: JSON.parse(raw) as Todo[] }
          : seedState;
      } catch {
        return seedState;
      }
    }
  );

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state.todos));
  }, [state.todos]);

  const remaining = useMemo(
    () => state.todos.filter((todo) => !todo.completed).length,
    [state.todos]
  );
  const completed = state.todos.length - remaining;

  const visible = useMemo(() => {
    switch (state.filter) {
      case "active":
        return state.todos.filter((todo) => !todo.completed);
      case "completed":
        return state.todos.filter((todo) => todo.completed);
      default:
        return state.todos;
    }
  }, [state.todos, state.filter]);

  return {
    state,
    visible,
    remaining,
    completed,
    add: (title: string) => {
      const trimmedTitle = title.trim();
      if (!trimmedTitle) return;
      const todo: Todo = {
        id: crypto.randomUUID(),
        title: trimmedTitle,
        completed: false,
      };
      dispatch({ type: "add", todo });
    },
    toggle: (id: string) => dispatch({ type: "toggle", id }),
    remove: (id: string) => dispatch({ type: "remove", id }),
    edit: (id: string, title: string) => dispatch({ type: "edit", id, title }),
    toggleAll: (completed: boolean) =>
      dispatch({ type: "toggleAll", completed }),
    clearCompleted: () => dispatch({ type: "clearCompleted" }),
    setFilter: (filter: Filter) => dispatch({ type: "setFilter", filter }),
  };
}
