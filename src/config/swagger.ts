import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import { Application } from 'express';

const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Perwatch API",
            version: "1.0.0",
            description: "Perwatch API dokümantasyonu",
        },
        servers: [
            {
                url: "http://localhost:3000",
                description: "Geliştirme sunucusu",
            }
        ],
        tags: [
            {
                name: "Users",
                description: "Kullanıcı işlemleri"
            },
            {
                name: "Posts",
                description: "Gönderi işlemleri"
            }
        ],
        components: {
            schemas: {
                User: {
                    type: "object",
                    required: ["name", "email", "password"],
                    properties: {
                        id: {
                            type: "string",
                            description: "Kullanıcı ID",
                            example: "507f1f77bcf86cd799439011"
                        },
                        name: {
                            type: "string",
                            description: "Kullanıcı adı",
                            example: "Ahmet Veli"
                        },
                        email: {
                            type: "string",
                            description: "Kullanıcı email adresi",
                            format: "email",
                            example: "ahmet@example.com"
                        },
                        password: {
                            type: "string",
                            description: "Kullanıcı şifresi",
                            example: "********"
                        },
                        createdAt: {
                            type: "string",
                            description: "Kullanıcı oluşturulma tarihi",
                            format: "date-time"
                        },
                        updatedAt: {
                            type: "string",
                            description: "Kullanıcı güncellenme tarihi",
                            format: "date-time"
                        }
                    }
                },
                Post: {
                    type: "object",
                    required: ["title", "content", "author", "tags"],
                    properties: {
                        id: {
                            type: "string",
                            description: "Gönderi ID",
                            example: "507f1f77bcf86cd799439012"
                        },
                        title: {
                            type: "string",
                            description: "Gönderi başlığı",
                            example: "Gönderi Başlığı"
                        },
                        content: {
                            type: "string",
                            description: "Gönderi içeriği",
                            example: "Gönderi içeriği"
                        },
                        author: {
                            type: "string",
                            description: "Gönderi yazarı ID",
                            example: "507f1f77bcf86cd799439011"
                        },
                        tags: {
                            type: "array",
                            description: "Gönderi etiketleri",
                            items: {
                                type: "string",
                            },
                            example: ["etiket1", "etiket2"]
                        },
                        createdAt: {
                            type: "string",
                            description: "Gönderi oluşturulma tarihi",
                            format: "date-time"
                        },
                        updatedAt: {
                            type: "string",
                            description: "Gönderi güncellenme tarihi",
                            format: "date-time"
                        }
                    }
                },
                Error: {
                    type: "object",
                    properties: {
                        status: {
                            type: "string",
                            description: "Error",
                        },
                        message: {
                            type: "string",
                            description: "Error mesajı",
                        }
                    }
                }
            },
            responses: {
                BadRequest: {
                    description: "Geçersiz istek",
                    content: {
                        "application/json": {
                            schema: {
                                $ref: "#/components/schemas/Error"
                            },
                            example: {
                                status: "Error",
                                message: "Doğrulama hatası",
                                errors: [
                                    {
                                        field: "email",
                                        message: "Geçersiz email formatı"
                                    },
                                ]
                            }
                        }
                    }
                },
                NotFound: {
                    description: "Kaynak Bulunamadı",
                    content: {
                        "application/json": {
                            schema: {
                                $ref: "#/components/schemas/Error"
                            },
                            example: {
                                status: "Error",
                                message: "Bir Hata Oluştu"
                            }
                        }
                    }
                }
            }
        },
    },
    apis: ["./src/routes/*.ts"],
    failOnErrors: true
};

const specs = swaggerJsdoc(options);

export const setupSwagger = (app: Application): void => {
    app.use("/swagger", swaggerUi.serve, swaggerUi.setup(specs, { 
        explorer: true,
        swaggerOptions: {
            tagsSorter: "alpha",
            operationsSorter: "alpha",
            docExpansion: 'list',
            filter: true,
            showRequestDuration: true
        }
    }));
}