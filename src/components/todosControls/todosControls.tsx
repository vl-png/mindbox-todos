import { useState } from 'react';
import styles from './todosControls.module.css';

export function TodosControls({
  onAdd,
  allCompleted,
  onToggleAll,
}: {
  onAdd: (title: string) => void;
  allCompleted: boolean;
  onToggleAll: () => void;
}) {
  const [text, setText] = useState('');

  const handleKey = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      onAdd(text);
      setText('');
    }
  };

  const handleAddClick = () => {
    onAdd(text);
    setText('');
  };

  return (
    <section className={styles.todosControls}>
      <button
        type="button"
        onClick={onToggleAll}
        aria-label="toggle all"
        className={styles.toggleAllBtn}
        title={allCompleted ? 'Uncheck all' : 'Check all'}
      >
        <span
          className={`${styles.icon} ${allCompleted ? styles.iconToggleUp : styles.iconToggleDown}`}
          aria-hidden
        />
      </button>
      <input
        className={styles.newTodo}
        placeholder="What needs to be done?"
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyDown={handleKey}
        aria-label="New todo input"
        id="new-todo-input"
        name="new-todo-input"
        autoFocus
      />
      <button type="button" className={styles.addTodoBtn} onClick={handleAddClick} aria-label="add todo" title="Add" >
        <span className={`${styles.icon} ${styles.iconAdd}`} aria-hidden />
      </button>
    </section>
  );
}