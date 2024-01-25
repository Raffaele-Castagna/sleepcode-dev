import { createSwaggerSpec } from "next-swagger-doc";
import dynamic from "next/dynamic";
import "swagger-ui-react/swagger-ui.css";

const SwaggerUI = dynamic(import("swagger-ui-react"), { ssr: false });

function ApiDoc({ spec }) {
  return (
    <>
    <section className="container"><SwaggerUI spec={spec} /></section>
    </>
  );
}

export const getStaticProps = async () => {
  const spec = createSwaggerSpec({
    definition: {
      openapi: "3.0.0",
      info: {
        title: "Sleepcode API Documentation",
        version: "1.0",
      },
    },
    apiFolder: "src/pages/api"
  });

  return {
    props: {
      spec,
    },
  };
};

export default ApiDoc;