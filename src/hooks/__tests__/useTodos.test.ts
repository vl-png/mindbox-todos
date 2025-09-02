/** @jest-environment jsdom */
import { renderHook, act } from "@testing-library/react";
import { useTodos } from "../useTodos";

const STORAGE_KEY = "todos2025";

beforeEach(() => {
  localStorage.clear();
});

test("reads from localStorage on init", () => {
  const getSpy = jest
    .spyOn(Storage.prototype, "getItem")
    .mockReturnValueOnce(
      JSON.stringify([{ id: "1", title: "a", completed: false }])
    );

  const { result } = renderHook(() => useTodos());

  expect(getSpy).toHaveBeenCalledWith(STORAGE_KEY);
  expect(result.current.state.todos).toHaveLength(1);
  expect(result.current.state.todos[0]).toMatchObject({
    id: "1",
    title: "a",
    completed: false,
  });
});

test("add saves todo and writes to localStorage", () => {
  const setSpy = jest.spyOn(Storage.prototype, "setItem");
  const { result } = renderHook(() => useTodos());

  act(() => result.current.add("hello world"));

  expect(result.current.state.todos).toHaveLength(1);
  expect(result.current.state.todos[0]).toMatchObject({
    id: expect.any(String),
    title: "hello world",
    completed: false,
  });
  expect(setSpy).toHaveBeenLastCalledWith(
    STORAGE_KEY,
    JSON.stringify(result.current.state.todos)
  );
});
