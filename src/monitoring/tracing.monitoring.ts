import { NodeTracerProvider } from "@opentelemetry/node";
import { ConsoleSpanExporter, SimpleSpanProcessor } from "@opentelemetry/tracing";
import { TRACING_REQUEST } from "../utils/logs.tracing.condition";

/**
 * мониторинг трассировки запросов
 */

const provider = new NodeTracerProvider();
provider.addSpanProcessor(
  new SimpleSpanProcessor(
    new ConsoleSpanExporter()
  )
);

provider.register();

console.log(TRACING_REQUEST.TRACING_ENABLE);
