import React from "react";

export function StatGrid({ items }) {
  return (
    <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
      {items.map((item) => (
        <div key={item.label} className="group relative overflow-hidden bg-surface-container-low/50 backdrop-blur-md border border-outline-variant/30 rounded-2xl p-5 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-primary/5 hover:border-primary/30">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          <div className="relative z-10">
            <div className="text-xs text-on-surface-variant uppercase tracking-widest font-semibold">{item.label}</div>
            <div className="text-3xl font-black mt-2 bg-gradient-to-br from-on-surface to-on-surface-variant bg-clip-text text-transparent">{item.value}</div>
          </div>
        </div>
      ))}
    </div>
  );
}

export function Section({ title, description, children }) {
  return (
    <div className="bg-surface-container-low/50 backdrop-blur-sm border border-outline-variant/30 rounded-2xl p-6 transition-all duration-300 hover:shadow-md">
      <h3 className="text-lg font-bold">{title}</h3>
      {description ? <p className="text-sm text-on-surface-variant mt-1">{description}</p> : null}
      <div className="mt-5">{children}</div>
    </div>
  );
}

export function AdminInput(props) {
  return (
    <input
      {...props}
      className={`w-full rounded-xl border border-outline-variant/40 bg-surface/60 px-4 py-2.5 text-sm outline-none transition-all duration-300 focus:bg-surface focus:ring-4 focus:ring-primary/10 focus:border-primary/50 hover:border-outline-variant/80 placeholder:text-on-surface-variant/50 ${
        props.className || ""
      }`}
    />
  );
}

export function AdminSelect(props) {
  return (
    <select
      {...props}
      className={`w-full rounded-xl border border-outline-variant/40 bg-surface/60 px-4 py-2.5 text-sm outline-none transition-all duration-300 focus:bg-surface focus:ring-4 focus:ring-primary/10 focus:border-primary/50 hover:border-outline-variant/80 ${
        props.className || ""
      }`}
    />
  );
}

export function AdminButton({ variant = "primary", className = "", ...props }) {
  const style =
    variant === "ghost"
      ? "border border-outline-variant/40 hover:bg-surface-container-low hover:border-outline-variant/80 hover:shadow-sm"
      : variant === "danger"
      ? "bg-error text-white hover:bg-error/90 hover:shadow-lg hover:shadow-error/20"
      : variant === "secondary"
      ? "bg-secondary text-on-secondary hover:bg-secondary/90 hover:shadow-lg hover:shadow-secondary/20"
      : "bg-primary text-on-primary hover:bg-primary/90 hover:shadow-lg hover:shadow-primary/30";

  return (
    <button
      {...props}
      className={`rounded-xl px-5 py-2.5 text-sm font-semibold tracking-wide transition-all duration-300 hover:-translate-y-0.5 active:translate-y-0 active:scale-95 flex items-center justify-center gap-2 ${style} ${className}`}
      type={props.type || "button"}
    />
  );
}
