// Badge.jsx
// Komponen kecil buat nampilin satu tag (tech stack, dsb). Dipisah biar
// stylingnya konsisten di semua tempat yang butuh tag kayak gini.

export default function Badge({ children }) {
  return (
    <span className="font-mono text-xs text-muted border border-border px-2.5 py-1">
      {children}
    </span>
  );
}
