import swaggerJSDoc from "swagger-jsdoc";

export const swaggerSpec = swaggerJSDoc({
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Ecommerce API",
      version: "1.0.0",
      description: "Full Ecommerce Backend API (Users, Auth, Products, Categories, Orders)"
    },
    servers: [
      {
        url: "http://localhost:5001"
      }
    ]
  },
  apis: ["./src/routes/*.ts"]
});