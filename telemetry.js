const { NodeSDK, resources } = require('@opentelemetry/sdk-node');
const { SemanticResourceAttributes } = require('@opentelemetry/semantic-conventions');
const { getNodeAutoInstrumentations } = require('@opentelemetry/auto-instrumentations-node');
const { JaegerExporter } = require('@opentelemetry/exporter-jaeger');

// 1. Add the application meta data (resource)
const pkg = require('./package-lock.json');
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

module.exports = {
  sdk,
  shutdown
};
