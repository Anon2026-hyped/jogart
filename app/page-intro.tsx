export default function PageIntro({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description: string;
}) {
  return (
    <section className="page-intro sec-tint">
      <div className="wrap">
        <p className="breadcrumbs"><a href="/">Home</a><span aria-hidden="true">/</span>{eyebrow}</p>
        <h1>{title}</h1>
        <p>{description}</p>
      </div>
    </section>
  );
}
