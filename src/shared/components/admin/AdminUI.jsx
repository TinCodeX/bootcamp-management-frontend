import React from "react";

export function StatGrid({ items }) {
  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
      {items.map((item) => (
        <div key={item.label} className="bg-surface-container-low border border-outline-variant/30 rounded-xl p-4">
          <div className="text-xs text-on-surface-variant uppercase tracking-wide">{item.label}</div>
          <div className="text-2xl font-bold mt-1">{item.value}</div>
        </div>
      ))}
    </div>
  );
}

export function Section({ title, description, children }) {
  return (
    <div className="bg-surface-container-low border border-outline-variant/30 rounded-xl p-4">
      <h3 className="text-lg font-semibold">{title}</h3>
      {description ? <p className="text-sm text-on-surface-variant mt-1">{description}</p> : null}
      <div className="mt-4">{children}</div>
    </div>
  );
}

export function AdminInput(props) {
  return (
    <input
      {...props}
      className={`w-full rounded-lg border border-outline-variant/40 bg-surface px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-primary/40 ${
        props.className || ""
      }`}
    />
  );
}

export function AdminSelect(props) {
  return (
    <select
      {...props}
      className={`w-full rounded-lg border border-outline-variant/40 bg-surface px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-primary/40 ${
        props.className || ""
      }`}
    />
  );
}

export function AdminButton({ variant = "primary", className = "", ...props }) {
  const style =
    variant === "ghost"
      ? "border border-outline-variant/40 hover:bg-surface-container"
      : variant === "danger"
      ? "bg-error text-white hover:opacity-90"
      : "bg-primary text-on-primary hover:opacity-90";

  return (
    <button
      {...props}
      className={`rounded-lg px-4 py-2 text-sm font-medium transition ${style} ${className}`}
      type={props.type || "button"}
    />
  );
}
