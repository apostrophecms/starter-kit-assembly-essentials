import { NodeSDK } from '@opentelemetry/sdk-node';
import { resourceFromAttributes } from '@opentelemetry/resources';
import { ATTR_SERVICE_NAME, ATTR_SERVICE_VERSION } from '@opentelemetry/semantic-conventions';
import { getNodeAutoInstrumentations } from '@opentelemetry/auto-instrumentations-node';
import { OTLPTraceExporter } from '@opentelemetry/exporter-trace-otlp-http';
import pkg from './package.json' with { type: 'json' };

// 1. Add the application metadata (resource)
const resource = resourceFromAttributes({
  [ATTR_SERVICE_NAME]: pkg.name,
  [ATTR_SERVICE_VERSION]: pkg.version
});

// 2. Initialize the OTLP exporter with correct endpoint
const traceExporter = new OTLPTraceExporter({
  url: 'http://localhost:4318/v1/traces',
  headers: {},
});

// 3. Initialize the SDK
const sdk = new NodeSDK({
  resource,
  traceExporter,
  instrumentations: [getNodeAutoInstrumentations()]
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

export default {
  sdk,
  shutdown
};