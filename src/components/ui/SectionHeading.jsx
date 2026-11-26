// SectionHeading.jsx
// Label kecil mono (aksen) + judul h2 yang dipakai di tiap section.
// Dipisah biar gaya heading konsisten dan gak di-copy-paste berulang.

export default function SectionHeading({
  label,
  title,
  className = "text-3xl md:text-4xl max-w-xl mb-12",
}) {
  return (
    <>
      <p className="font-mono text-xs text-accent tracking-widest uppercase mb-3">
        {label}
      </p>
      <h2 className={`font-heading font-bold ${className}`}>{title}</h2>
    </>
  );
}
