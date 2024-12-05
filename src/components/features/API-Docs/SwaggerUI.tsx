'use client';

import SwaggerUI from 'swagger-ui-react';
import 'swagger-ui-react/swagger-ui.css';

type SwaggerProps = {
  spec: Record<string, any>; // You can refine this type if you have a more specific shape for the Swagger spec
};

const ReactSwagger: React.FC<SwaggerProps> = ({ spec }) => {
  return <SwaggerUI spec={spec} />;
};

export default ReactSwagger;
