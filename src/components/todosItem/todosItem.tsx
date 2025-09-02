import { useEffect, useRef, useState } from "react";
import type { Todo } from "../../utils/types";
import styles from "./todosItem.module.css";

interface Props {
  todo: Todo;
  onToggle(id: string): void;
  onRemove(id: string): void;
  onEdit(id: string, title: string): void;
}

export function TodosItem({ todo, onToggle, onRemove, onEdit }: Props) {
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(todo.title);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (editing) inputRef.current?.focus();
  }, [editing]);

  const commit = () => {
    setEditing(false);
    if (draft !== todo.title) onEdit(todo.id, draft);
  };

  const cancel = () => {
    setEditing(false);
    setDraft(todo.title);
  };

  const onKey = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") commit();
    if (e.key === "Escape") cancel();
  };

  return (
    <li
      className={[
        todo.completed ? styles.completed : "",
        editing ? styles.editing : "",
      ]
        .join(" ")
        .trim()}
    >
      <div className={styles.item}>
        <input
          className={styles.toggle}
          type="checkbox"
          checked={todo.completed}
          onChange={() => onToggle(todo.id)}
          aria-label="toggle"
        />
        <label className={styles.label} onDoubleClick={() => setEditing(true)}>
          {todo.title}
        </label>
        <button
          className={styles.remove}
          onClick={() => onRemove(todo.id)}
          aria-label="remove"
        />
      </div>

      {editing && (
        <input
          ref={inputRef}
          className={styles.edit}
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          onKeyDown={onKey}
          onBlur={commit}
        />
      )}
    </li>
  );
}
