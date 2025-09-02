import { TodosControls } from "../todosControls/todosControls";
import { TodosList } from "../todosList/todosList";
import { TodosFilter } from "../todosFilter/todosFilter";
import { useTodos } from "../../hooks/useTodos";
import styles from "./App.module.css";

export default function App() {
  const {
    state,
    visible,
    remaining,
    setFilter,
    add,
    toggle,
    toggleAll,
    remove,
    clearCompleted,
    edit,
  } = useTodos();

  return (
    <section className={styles.todoapp}>
      <header className={styles.header}>
        <h1 className={styles.headerTitle}>todos</h1>
      </header>
      <TodosControls
        onAdd={add}
        allCompleted={remaining === 0 && state.todos.length > 0}
        onToggleAll={() =>
          toggleAll(!(remaining === 0 && state.todos.length > 0))
        }
      />

      {state.todos.length > 0 && (
        <section className={styles.main}>
          <TodosList
            items={visible}
            onToggle={toggle}
            onRemove={remove}
            onEdit={edit}
          />
        </section>
      )}
      <TodosFilter
        leftCount={remaining}
        filter={state.filter}
        setFilter={setFilter}
        clearCompleted={clearCompleted}
      />
      <footer className={styles.footer}>
        <p className={styles.footerText}>
          Test task for Mindbox. Created by{" "}
          <a href="https://github.com/vl-png">vl-png</a>
        </p>
        <div className={styles.themeGroup} role="group" aria-label="Theme">
          <button
            type="button"
            className={`${styles.themeBtn} ${styles.themeBtnAuto}`}
            onClick={() =>
              document.documentElement.removeAttribute("data-theme")
            }
            title="Auto"
          >
            Auto
          </button>
          <button
            type="button"
            className={`${styles.themeBtn} ${styles.themeBtnLight}`}
            onClick={() =>
              document.documentElement.setAttribute("data-theme", "light")
            }
            title="Light"
          >
            Light
          </button>
          <button
            type="button"
            className={`${styles.themeBtn} ${styles.themeBtnDark}`}
            onClick={() =>
              document.documentElement.setAttribute("data-theme", "dark")
            }
            title="Dark"
          >
            Dark
          </button>
        </div>
      </footer>
    </section>
  );
}
