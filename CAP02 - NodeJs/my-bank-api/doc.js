export const swaggerDocument = {
  swagger: '2.0',
  info: {
    description: 'My Bank API description',
    version: '1.0.0',
    title: 'MY-BANK-API',
  },
  host: 'localhost:3000',
  tags: [
    {
      name: 'account',
      description: 'Account management',
    },
  ],
  paths: {
    '/account': {
      post: {
        tags: ['account'],
        summary: 'Add a new Account to the store',
        description: '',
        operationId: 'addAccount',
        consumes: ['application/json', 'application/xml'],
        produces: ['application/xml', 'application/json'],
        parameters: [
          {
            in: 'body',
            name: 'body',
            description: 'Account object that needs to be added to the store',
            required: true,
            schema: {
              $ref: '#/definitions/Account',
            },
          },
        ],
        responses: {
          '405': {
            description: 'Invalid input',
          },
        },
        security: [
          {
            Accountstore_auth: ['write:Accounts', 'read:Accounts'],
          },
        ],
      },
      put: {
        tags: ['account'],
        summary: 'Update an existing Account',
        description: '',
        operationId: 'updateAccount',
        consumes: ['application/json', 'application/xml'],
        produces: ['application/xml', 'application/json'],
        parameters: [
          {
            in: 'body',
            name: 'body',
            description: 'Account object that needs to be added to the store',
            required: true,
            schema: {
              $ref: '#/definitions/Account',
            },
          },
        ],
        responses: {
          '400': {
            description: 'Invalid ID supplied',
          },
          '404': {
            description: 'Account not found',
          },
          '405': {
            description: 'Validation exception',
          },
        },
        security: [
          {
            Accountstore_auth: ['write:Accounts', 'read:Accounts'],
          },
        ],
      },
    },
  },
  securityDefinitions: {
    Accountstore_auth: {
      type: 'oauth2',
      authorizationUrl: 'http://Accountstore.swagger.io/oauth/dialog',
      flow: 'implicit',
      scopes: {
        'write:Accounts': 'modify Accounts in your account',
        'read:Accounts': 'read your Accounts',
      },
    },
    api_key: {
      type: 'apiKey',
      name: 'api_key',
      in: 'header',
    },
  },
  definitions: {
    Order: {
      type: 'object',
      properties: {
        id: {
          type: 'integer',
          format: 'int64',
        },
        AccountId: {
          type: 'integer',
          format: 'int64',
        },
        quantity: {
          type: 'integer',
          format: 'int32',
        },
        shipDate: {
          type: 'string',
          format: 'date-time',
        },
        status: {
          type: 'string',
          description: 'Order Status',
          enum: ['placed', 'approved', 'delivered'],
        },
        complete: {
          type: 'boolean',
          default: false,
        },
      },
      xml: {
        name: 'Order',
      },
    },
    Category: {
      type: 'object',
      properties: {
        id: {
          type: 'integer',
          format: 'int64',
        },
        name: {
          type: 'string',
        },
      },
      xml: {
        name: 'Category',
      },
    },
    User: {
      type: 'object',
      properties: {
        id: {
          type: 'integer',
          format: 'int64',
        },
        username: {
          type: 'string',
        },
        firstName: {
          type: 'string',
        },
        lastName: {
          type: 'string',
        },
        email: {
          type: 'string',
        },
        password: {
          type: 'string',
        },
        phone: {
          type: 'string',
        },
        userStatus: {
          type: 'integer',
          format: 'int32',
          description: 'User Status',
        },
      },
      xml: {
        name: 'User',
      },
    },
    Tag: {
      type: 'object',
      properties: {
        id: {
          type: 'integer',
          format: 'int64',
        },
        name: {
          type: 'string',
        },
      },
      xml: {
        name: 'Tag',
      },
    },
    Account: {
      type: 'object',
      required: ['name', 'photoUrls'],
      properties: {
        id: {
          type: 'integer',
          format: 'int64',
        },
        category: {
          $ref: '#/definitions/Category',
        },
        name: {
          type: 'string',
          example: 'doggie',
        },
        photoUrls: {
          type: 'array',
          xml: {
            name: 'photoUrl',
            wrapped: true,
          },
          items: {
            type: 'string',
          },
        },
        tags: {
          type: 'array',
          xml: {
            name: 'tag',
            wrapped: true,
          },
          items: {
            $ref: '#/definitions/Tag',
          },
        },
        status: {
          type: 'string',
          description: 'Account status in the store',
          enum: ['available', 'pending', 'sold'],
        },
      },
      xml: {
        name: 'Account',
      },
    },
    ApiResponse: {
      type: 'object',
      properties: {
        code: {
          type: 'integer',
          format: 'int32',
        },
        type: {
          type: 'string',
        },
        message: {
          type: 'string',
        },
      },
    },
  },
};
