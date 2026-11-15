export default function PageIntro({
  eyebrow,
  title,
  description,
  parent,
  currentLabel = eyebrow,
}: {
  eyebrow: string;
  title: string;
  description: string;
  parent?: { label: string; href: string };
  currentLabel?: string;
}) {
  return (
    <section className="page-intro sec-tint">
      <div className="wrap">
        <nav className="breadcrumbs" aria-label="Breadcrumb">
          <ol>
            <li><a href="/">Home</a></li>
            {parent && <li><a href={parent.href}>{parent.label}</a></li>}
            <li aria-current="page">{currentLabel}</li>
          </ol>
        </nav>
        <h1>{title}</h1>
        <p>{description}</p>
      </div>
    </section>
  );
}
