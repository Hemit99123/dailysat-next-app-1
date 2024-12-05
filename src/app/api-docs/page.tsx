import { getApiDocs } from "@/lib/swaggerConfig";
import ReactSwagger from "@/components/features/API-Docs/SwaggerUI";

const APIDocs = async () => {
    const spec = await getApiDocs()

    return (
        <section>
            <ReactSwagger spec={spec} />
        </section>
    )
}

export default APIDocs