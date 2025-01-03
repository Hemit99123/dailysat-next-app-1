import getApiDocs from "@/lib/api-docs-config";
import ReactSwagger from "@/components/features/API-Docs/SwaggerUI";

export default async function IndexPage() {
  const spec = await getApiDocs();
  return (
    <section className="container">
      <ReactSwagger spec={spec} />
    </section>
  );
}