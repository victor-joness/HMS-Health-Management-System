import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "HMS API",
      version: "1.1.0",
      description: "Documentação da API HMS",
    },
    components: {
      securitySchemes: {
        basicAuth: {
          type: "http",
          scheme: "basic",
          description: "Use seu username e senha para autenticação básica",
        },
      },
    },
    security: [
      {
        basicAuth: [],
      },
    ],
  },
  apis: ["./src/interfaces/routes/*.ts"],
  servers: [
    {
      url: "http://localhost:5005/api",
      description: "Servidor local",
    },
  ],
};

const swaggerDocs = swaggerJsdoc(swaggerOptions);

const setupSwagger = (app: any) => {
  app.use("/api/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));
};

export { setupSwagger };
