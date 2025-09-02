import type { Filter } from "../../utils/types";
import styles from "./todosFilter.module.css";

interface Props {
  leftCount: number;
  filter: Filter;
  setFilter(f: Filter): void;
  clearCompleted(): void;
}

export function TodosFilter({
  leftCount,
  filter,
  setFilter,
  clearCompleted,
}: Props) {
  const f = ["all", "active", "completed"] as const;
  return (
    <section className={styles.todosFilter}>
      <span className={styles.todoCount}>
        <strong>{leftCount}</strong> item{leftCount === 1 ? "" : "s"} left
      </span>

      <ul className={styles.filters}>
        {f.map((x) => (
          <li key={x}>
            <button
              type="button"
              className={`${styles.filter} ${
                filter === x ? styles.selected : ""
              }`}
              aria-pressed={filter === x}
              onClick={() => setFilter(x)}
            >
              {x === "all" ? "All" : x === "active" ? "Active" : "Completed"}
            </button>
          </li>
        ))}
      </ul>
      <button className={styles.clearCompleted} onClick={clearCompleted}>
        Clear completed
      </button>
    </section>
  );
}
