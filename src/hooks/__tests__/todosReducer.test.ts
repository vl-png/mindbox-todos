import { reducer, initialState, type State } from "../todosReducer";

const add = (s: State, id: string, title: string) =>
  reducer(s, { type: "add", todo: { id, title, completed: false } });

test("add todo", () => {
  const state = add(initialState, "1", "hello world");
  expect(state.todos[0]).toMatchObject({
    id: "1",
    title: "hello world",
    completed: false,
  });
});

test("toggle todo / toggleAll / clearCompleted", () => {
  let state = add(initialState, "1", "a");
  state = add(state, "2", "b");
  state = reducer(state, { type: "toggle", id: "1" });
  expect(state.todos.find((t) => t.id === "1")!.completed).toBe(true);
  state = reducer(state, { type: "toggleAll", completed: true });
  expect(state.todos.every((t) => t.completed)).toBe(true);
  state = reducer(state, { type: "clearCompleted" });
  expect(state.todos.length).toBe(0);
});

test("edit", () => {
  let state = add(initialState, "1", "bye world");
  state = reducer(state, { type: "edit", id: "1", title: "hello world" });
  expect(state.todos).toHaveLength(1);
  expect(state.todos[0]).toMatchObject({
    id: "1",
    title: "hello world",
    completed: false,
  });
});

test("remove", () => {
  let state = add(initialState, "1", "bye world");
  state = add(state, "2", "hello world");
  expect(state.todos).toHaveLength(2);

  state = reducer(state, { type: "remove", id: "1" });
  expect(state.todos).toHaveLength(1);
  expect(state.todos[0]).toMatchObject({ id: "2", title: "hello world" });
});

test("setFilter", () => {
  const state = reducer(initialState, {
    type: "setFilter",
    filter: "completed",
  });
  expect(state.filter).toBe("completed");
});
