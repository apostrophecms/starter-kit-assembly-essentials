import fs from 'node:fs/promises';
import { NodeSDK, resources } from '@opentelemetry/sdk-node';
import { SemanticResourceAttributes } from '@opentelemetry/semantic-conventions';
import { getNodeAutoInstrumentations } from '@opentelemetry/auto-instrumentations-node';
import { JaegerExporter } from '@opentelemetry/exporter-jaeger';

// 1. Add the application meta data (resource)
const pkg = JSON.parse(await fs.readFile('./package.json'));
const resource = new resources.Resource({
  [SemanticResourceAttributes.SERVICE_NAME]: pkg.name,
  [SemanticResourceAttributes.SERVICE_VERSION]: pkg.version
});

// 2. Initialize the exporter
const traceExporter = new JaegerExporter({
  tags: [],
  endpoint: 'http://localhost:14268/api/traces'
});

// 3. Initialize the SDK
const sdk = new NodeSDK({
  resource,
  traceExporter,
  instrumentations: [ getNodeAutoInstrumentations() ]
});

// 4. The shutdown handler
const shutdown = async () => {
  await sdk
    .shutdown()
    .then(
      () => console.log('OpenTelemetry stopped'),
      (err) => console.log('Error shutting down OpenTelemetry', err)
    );
};

export {
  sdk,
  shutdown
};
