import type { Todo, Filter } from '../utils/types';

export type State = { todos: Todo[]; filter: Filter };

export type Action =
  | { type: 'add'; todo: Todo }
  | { type: 'toggle'; id: string }
  | { type: 'remove'; id: string }
  | { type: 'edit'; id: string; title: string }
  | { type: 'toggleAll'; completed: boolean }
  | { type: 'clearCompleted' }
  | { type: 'setFilter'; filter: Filter };

export const initialState: State = { todos: [], filter: 'all' };

export function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'add':
      return { ...state, todos: [action.todo, ...state.todos] };
    case 'toggle':
      return { ...state, todos: state.todos.map(todo => todo.id === action.id ? { ...todo, completed: !todo.completed } : todo) };
    case 'remove':
      return { ...state, todos: state.todos.filter(t => t.id !== action.id) };
    case 'edit': {
      const title = action.title.trim();
      return title
        ? { ...state, todos: state.todos.map(todo => todo.id === action.id ? { ...todo, title } : todo) }
        : { ...state, todos: state.todos.filter(todo => todo.id !== action.id) };
    }
    case 'toggleAll':
      return { ...state, todos: state.todos.map(todo => ({ ...todo, completed: action.completed })) };
    case 'clearCompleted':
      return { ...state, todos: state.todos.filter(todo => !todo.completed) };
    case 'setFilter':
      return { ...state, filter: action.filter };
    default:
      return state;
  }
}