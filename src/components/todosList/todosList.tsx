import type { Todo } from "../../utils/types";
import { TodosItem } from "../todosItem/todosItem";
import styles from "./todosList.module.css";

interface Props {
  items: Todo[];
  onToggle(id: string): void;
  onRemove(id: string): void;
  onEdit(id: string, title: string): void;
}

export function TodosList({ items, onToggle, onRemove, onEdit }: Props) {
  return (
    <ul className={styles.todoList}>
      {items.map((t) => (
        <TodosItem
          key={t.id}
          todo={t}
          onToggle={onToggle}
          onRemove={onRemove}
          onEdit={onEdit}
        />
      ))}
    </ul>
  );
}
