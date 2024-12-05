'use client';

import SwaggerUI from 'swagger-ui-react';
import 'swagger-ui-react/swagger-ui.css';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
type Props = {
  spec: Record<string, any>,
};

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
function ReactSwagger({ spec }: Props) {
  return <SwaggerUI spec={spec} />;
}

export default ReactSwagger;
