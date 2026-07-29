import type {LucideIcon} from "lucide-react";

type Module = {title: string; body: string; icon: LucideIcon};

export function ModuleGrid({items}: {items: readonly Module[]}) {
  return (
    <div className="module-grid">
      {items.map(({title, body, icon: Icon}, index) => (
        <article className="module-card card interactive-card" key={title}>
          <div className="module-number">{String(index + 1).padStart(2, "0")}</div>
          <Icon size={24} strokeWidth={1.6} />
          <h3>{title}</h3>
          <p>{body}</p>
        </article>
      ))}
    </div>
  );
}
