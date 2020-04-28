const swaggerJSDoc = require('swagger-jsdoc');

const swaggerDefinition = {
    info: {
        // API informations (required)
        title: 'BCIO BackOffice API', // Title (required)
        version: '1.0.0', // Version (required)
        description: `This API is used from the backoffice of BCIO and
         exposes the main logic of the application`, // Description (optional)
    },
    openapi: '3.0.0',
    servers: [{
        url: '/api/'  
    }],
    components: {
        securitySchemes: {
            bearerAuth: {
                type: "http",
                scheme: "bearer",
                bearerFormat: "JWT"
            }
        },
        parameters:  {
            UsernameQueryParam: {
                name: "username",
                in: "query",
                description: "An email for login.",
                required: true,
                schema: {
                    example: "user@example.com",
                    type: "string",
                    format: "email"
                }
            },
            PasswordQueryParam: {
                name: "password",
                in: "query",
                description: "A passoword for login.",
                required: true,
                schema: {
                    example: "safe1234",
                    type: "string",
                    format: "password"
                }
            },
            NotificationIdPathParam: {
                name: "id",
                in: "path",
                description: "ID of the Notification we want to read|unread",
                required: true,
                schema: {
                    example: 3,
                    type: "integer"
                }
            },
            NotificationActionPathParam: {
                name: "action",
                in: "path",
                description: "The action to do.",
                required: true,
                schema: {
                    example: "read",
                    type: "string",
                    enum: ["read", "unread"]
                }
            }

        },
        schemas: {
            LoginInfo: {
                type: "object",
                description: "the response to a login request",
                properties: {
                    user: {
                        $ref: '#/components/schemas/User'
                    },
                    token: {
                        type: "string",
                        description: "A valid token for that user"
                    }
                }
            },
            User: {
                type: "object",
                description: "the response to a login request",
                properties: {
                    id: {
                        type: "integer",
                        description: "The user's Id"
                    },
                    username: {
                        type: "string",
                        description: "The user's email"
                    },
                    name: {
                        type: "string",
                        description: "The user's name"
                    }
                }
            },
            NewCampaign: {
                type: "object",
                description: "The Campaign object",
                properties: {
                    name: {
                        type: "string",
                        description: "The campaign's name",
                        example: "my campaign"
                    },
                    pageId: {
                        type: "integer",
                        description: "The campaign's pageId",
                        example: 1
                    },
                    positionId: {
                        type: "integer",
                        description: "The campaign's positionId",
                        example: 1
                    },
                    from: {
                        type: "string",
                        format: "date-time",
                        example: "2019-10-29T16:10:57.336Z",
                        description: "The campaign's start datetime",
                    },
                    to: {
                        type: "string",
                        format: "date-time",
                        example: "2019-11-29T16:10:57.336Z",
                        description: "The campaign's end datetime",
                    }
                }
            },
            UpdateCampaign: {
                type: "object",
                description: "The Campaign object",
                properties: {
                    name: {
                        type: "string",
                        description: "The campaign's name",
                        example: "my campaign"
                    },
                    from: {
                        type: "string",
                        format: "date-time",
                        example: "2019-10-29T16:10:57.336Z",
                        description: "The campaign's start datetime",
                    },
                    to: {
                        type: "string",
                        format: "date-time",
                        example: "2019-11-29T16:10:57.336Z",
                        description: "The campaign's end datetime",
                    }
                }
            },
            CampaignCreated: {
                type: "object",
                description: "The Campaign object",
                properties: {
                    campaign: {
                        type: "object",
                        description: "The Campaign object",
                        properties: {
                            id: {
                                type: "integer",
                                description: "The campaign's Id",
                                example: 1
                            },
                            name: {
                                type: "string",
                                description: "The campaign's name",
                                example: "my campaign"
                            },
                            status: {
                                type: "string",
                                description: "The campaign's status",
                                example: "DRAFT",
                                enum: ["DRAFT", "SCHEDULED", "LIVE", "CLOSED", "PAUSED"]
    
                            },
                            pageId: {
                                type: "integer",
                                description: "The campaign's Id",
                                example: 1
                            },
                            positionId: {
                                type: "integer",
                                description: "The campaign's Id",
                                example: 1
                            },
                            from: {
                                type: "string",
                                format: "date-time",
                                example: "2019-10-29T16:10:57.336Z",
                                description: "The campaign's start datetime",
                            },
                            to: {
                                type: "string",
                                format: "date-time",
                                example: "2019-10-29T16:10:57.336Z",
                                description: "The campaign's end datetime",
                            },
                            lastNotificationDate: {
                                type: "string",
                                format: "date-time",
                                example: "2019-10-29T16:10:57.336Z",
                                description: "The campaign's last notification date",
                            },
                            createdAt: {
                                type: "string",
                                description: "The campaign's creation time",
                                format: "date-time"
                            },
                            updatedAt: {
                                type: "string",
                                description: "The campaign's last update time",
                                format: "date-time"
                            },
                            deletedAt: {
                                type: "string",
                                description: "The campaign's deleted time",
                                format: "date-time"
                            }
                        }
                    },
                    warning: {
                        type: "string",
                        description: "The warning text",
                        example: "Another campaign in the same dates."
                    }
                }
            },
            CampaignWithOffers: {
                type: "object",
                description: "The Campaign object with the offers",
                properties: {
                    id: {
                        type: "integer",
                        description: "The campaign's Id",
                        example: 1
                    },
                    name: {
                        type: "string",
                        description: "The campaign's name",
                        example: "my campaign"
                    },
                    status: {
                        type: "string",
                        description: "The campaign's status",
                        example: "DRAFT",
                        enum: ["DRAFT", "SCHEDULED", "LIVE", "CLOSED", "PAUSED"]

                    },
                    page: {
                        $ref: '#/components/schemas/Page'
                    },
                    position: {
                        $ref: '#/components/schemas/Position'
                    }
                    ,
                    from: {
                        type: "string",
                        format: "date-time",
                        example: "2019-10-29T16:10:57.336Z",
                        description: "The campaign's start datetime",
                    },
                    to: {
                        type: "string",
                        format: "date-time",
                        example: "2019-10-29T16:10:57.336Z",
                        description: "The campaign's end datetime",
                    },
                    lastNotificationDate: {
                        type: "string",
                        format: "date-time",
                        example: "2019-10-29T16:10:57.336Z",
                        description: "The campaign's last notification date",
                    },
                    createdAt: {
                        type: "string",
                        description: "The campaign's creation time",
                        format: "date-time"
                    },
                    updatedAt: {
                        type: "string",
                        description: "The campaign's last update time",
                        format: "date-time"
                    },
                    deletedAt: {
                        type: "string",
                        description: "The campaign's deleted time",
                        format: "date-time"
                    },
                    offers: {
                        type: "array",
                        description: "A list of Offers",
                        items: {
                            $ref: '#/components/schemas/Offer'
                        }
                    }
                }
            }, 
            Campaign: {
                type: "object",
                description: "The Campaign object",
                properties: {
                    id: {
                        type: "integer",
                        description: "The campaign's Id",
                        example: 1
                    },
                    name: {
                        type: "string",
                        description: "The campaign's name",
                        example: "my campaign"
                    },
                    status: {
                        type: "string",
                        description: "The campaign's status",
                        example: "DRAFT",
                        enum: ["DRAFT", "SCHEDULED", "LIVE", "CLOSED", "PAUSED"]

                    },
                    page: {
                        $ref: '#/components/schemas/Page'
                    },
                    position: {
                        $ref: '#/components/schemas/Position'
                    }
                    ,
                    from: {
                        type: "string",
                        format: "date-time",
                        example: "2019-10-29T16:10:57.336Z",
                        description: "The campaign's start datetime",
                    },
                    to: {
                        type: "string",
                        format: "date-time",
                        example: "2019-10-29T16:10:57.336Z",
                        description: "The campaign's end datetime",
                    },
                    lastNotificationDate: {
                        type: "string",
                        format: "date-time",
                        example: "2019-10-29T16:10:57.336Z",
                        description: "The campaign's last notification date",
                    },
                    createdAt: {
                        type: "string",
                        description: "The campaign's creation time",
                        format: "date-time"
                    },
                    updatedAt: {
                        type: "string",
                        description: "The campaign's last update time",
                        format: "date-time"
                    },
                    deletedAt: {
                        type: "string",
                        description: "The campaign's deleted time",
                        format: "date-time"
                    }
                }
            },            
            Campaigns: {
                type: "array",
                description: "A list of Campaigns",
                items: {
                    $ref: '#/components/schemas/Campaign'
                }
            },
            Tag: {
                type: "object",
                description: "The Tag object",
                properties: {
                    id: {
                        type: "integer",
                        description: "The tag's Id",
                        example: 3
                    },
                    name: {
                        type: "string",
                        description: "The tag's name",
                        example: "SP001"

                    },
                    description: {
                        type: "string",
                        description: "The tag's description",
                        example: "SPORT"
                    },
                    type: {
                        type: "string",
                        description: "The tag's type",
                        example: "segmentation"
                    },
                    createdAt: {
                        type: "string",
                        description: "The tag's creation time",
                        format: "date-time"
                    },
                    updatedAt: {
                        type: "string",
                        description: "The tag's last update time",
                        format: "date-time"
                    },
                    deletedAt: {
                        type: "string",
                        description: "The tag's deleted time",
                        format: "date-time"
                    }
                }
            },
            Tags: {
                type: "array",
                description: "A list of Tags",
                items: {
                    $ref: '#/components/schemas/Tag'
                }
            },
            NewNotification: {
                type: "object",
                description: "The notification object",
                properties: {
                    type: {
                        type: "string",
                        description: "The notification's type",
                        example: "Warning"
                    },
                    campaignId: {
                        type: "integer",
                        description: "The notification's campaignId",
                        example: 7
                    },
                    text: {
                        type: "string",
                        description: "The notification's campaignId",
                        example: "New campaign need an update"
                    }
                }
            },
            Notification: {
                type: "object",
                description: "The notification object",
                properties: {
                    id: {
                        type: "integer",
                        description: "The notification's Id",
                        example: 3
                    },
                    type: {
                        type: "string",
                        description: "The notification's type",
                        example: "Warning"

                    },
                    userId: {
                        type: "integer",
                        description: "The userId of the notification",
                        example: 2
                    },
                    campaignId: {
                        type: "integer",
                        description: "The notification's campaignId",
                        example: 7
                    },
                    text: {
                        type: "string",
                        description: "The notification's campaignId",
                        example: "New campaign need an update"
                    },
                    read: {
                        type: "boolean",
                        description: "The notification's campaignId",
                        example: false
                    },
                    campaign: {
                        $ref: '#/components/schemas/Campaign'
                    },
                    createdAt: {
                        type: "string",
                        description: "The notification's creation time",
                        format: "date-time"
                    },
                    updatedAt: {
                        type: "string",
                        description: "The notification's last update time",
                        format: "date-time"
                    },
                    deletedAt: {
                        type: "string",
                        description: "The notification's deleted time",
                        format: "date-time"
                    }
                }
            },
            Notifications: {
                type: "object",
                description: "the notifications with counter of unread",
                properties: {
                    notifications: { 
                        type: "array",
                        description: "A list of notifications",
                        items: {
                            $ref: '#/components/schemas/Notification'
                        }
                    },
                    totalUnread: {
                        type: "integer",
                        description: "total unread notifications for that user",
                        example: 5
                    }

                }
            },
            Error: {
                type: "object",
                description: "Information for the error",
                properties: {
                    message: {
                        type: "string",
                        description: "The field with the error"
                    }
                }
            },
            InputPage: {
                type: "object",
                description: "The Page object",
                properties: {
                    name: {
                        type: "string",
                        description: "The page's name",
                        example: "portada el Pais"

                    }
                }
            },
            Page: {
                type: "object",
                description: "The Page object",
                properties: {
                    id: {
                        type: "integer",
                        description: "The page's Id",
                        example: 3
                    },
                    name: {
                        type: "string",
                        description: "The page's name",
                        example: "portada el Pais"

                    },
                    slug: {
                        type: "string",
                        description: "The tag's slug",
                        example: "portada-el-pais"
                    },
                    createdAt: {
                        type: "string",
                        description: "The page's creation time",
                        format: "date-time"
                    },
                    updatedAt: {
                        type: "string",
                        description: "The page's last update time",
                        format: "date-time"
                    },
                    deletedAt: {
                        type: "string",
                        description: "The page's deleted time",
                        format: "date-time"
                    }
                }
            },
            Pages: {
                type: "array",
                description: "A list of Pages",
                items: {
                    $ref: '#/components/schemas/Page'
                }
            },
            InputPosition: {
                type: "object",
                description: "The Position object",
                properties: {
                    name: {
                        type: "string",
                        description: "The position's name",
                        example: "portada"
                    }
                }
            },
            InputPositions: {
                type: "array",
                description: "A list of Positions",
                items: {
                    type: "object",
                    description: "The Position object",
                    properties: {
                        id: {
                            type: "integer",
                            description: "The position's Id",
                            example: 3
                        },
                        name: {
                            type: "string",
                            description: "The position's name",
                            example: "portada"
                        }
                    }
                }
            },
            Position: {
                type: "object",
                description: "The Position object",
                properties: {
                    id: {
                        type: "integer",
                        description: "The position's Id",
                        example: 3
                    },
                    name: {
                        type: "string",
                        description: "The position's name",
                        example: "portada"

                    },
                    createdAt: {
                        type: "string",
                        description: "The position's creation time",
                        format: "date-time"
                    },
                    updatedAt: {
                        type: "string",
                        description: "The position's last update time",
                        format: "date-time"
                    },
                    deletedAt: {
                        type: "string",
                        description: "The position's deleted time",
                        format: "date-time"
                    }
                }
            },
            Positions: {
                type: "array",
                description: "A list of Positions",
                items: {
                    $ref: '#/components/schemas/Position'
                }
            },
            InputOffer: {
                type: "object",
                description: "The offer object",
                properties: {
                    name: {
                        type: "string",
                        description: "The Offer's name",
                        example: "offer 1"

                    },
                    defaultOffer: {
                        type: "boolean",
                        description: "The Offer's defaultOffer",
                        example: true

                    },
                    description: {
                        type: "string",
                        description: "The Offer's description",
                        example: "this is one offer"

                    },
                    image: {
                        type: "string",
                        description: "The Offer's image",
                        example: "hhtp:www.example-picture-url.com/pic.jpg",
                        format: "uri"

                    },
                    campaignId: {
                        type: "integer",
                        description: "The Offer's campaignId",
                        example: 3

                    },
                    offerUrl: {
                        type: "string",
                        description: "The Offer's url",
                        example: "http://example.com",
                        format: "uri"

                    },
                    goal: {
                        type: "integer",
                        description: "The Offer's goal",
                        example: 3

                    },
                    brandname: {
                        type: "string",
                        description: "The Offer's brandname",
                        example: "My brand"

                    },
                    headline: {
                        type: "string",
                        description: "The Offer's headline",
                        example: "Click here"
                    },
                    subtitle: {
                        type: "string",
                        description: "The Offer's subtitle",
                        example: "to know more"

                    },
                    kickerText: {
                        type: "string",
                        description: "The Offer's kickerText",
                        example: "one kickertex"

                    },
                    kickerUrl: {
                        type: "string",
                        description: "The Offer's kickerUrl",
                        example: "http://example.com",
                        format: "uri"

                    },
                    kickerClass: {
                        type: "string",
                        description: "The Offer's kickerClass",
                        example: "my-class"

                    },
                    segmentationTags: {
                        type: "string",
                        description: "The Offer's segmentationTags",
                        example: "one, two, three"

                    },
                    documentationTags: {
                        type: "string",
                        description: "The Offer's documentationTags",
                        example: "one, two, three"

                    },
                    author: {
                        type: "string",
                        description: "The Offer's documentationTags",
                        example: "one, two, three"

                    },
                    authorLink: {
                        type: "string",
                        description: "The Author's link",
                        example: "http://example.com",
                        format: "uri"
                    },
                    authorLfooterUrl: {
                        type: "string",
                        description: "The Footer's url",
                        example: "http://example.com",
                        format: "uri"
                    },
                    photoAuthor: {
                        type: "string",
                        description: "The photoAuthor",
                        example: "Joe Doe"

                    },
                    copyright: {
                        type: "string",
                        description: "The photo copyright",
                        example: "Apache"

                    }
                }
            },
            Offer: {
                type: "object",
                description: "The Offer object",
                properties: {
                    id: {
                        type: "integer",
                        description: "The Offer's Id",
                        example: 3
                    },
                    name: {
                        type: "string",
                        description: "The Offer's name",
                        example: "offer 1"

                    },
                    defaultOffer: {
                        type: "boolean",
                        description: "The Offer's defaultOffer",
                        example: true

                    },
                    description: {
                        type: "string",
                        description: "The Offer's description",
                        example: "this is one offer"

                    },
                    image: {
                        type: "string",
                        description: "The Offer's image",
                        example: "hhtp:www.example-picture-url.com/pic.jpg",
                        format: "uri"

                    },
                    offerUrl: {
                        type: "string",
                        description: "The Offer's url",
                        example: "http://example.com",
                        format: "uri"

                    },
                    goal: {
                        type: "integer",
                        description: "The Offer's goal",
                        example: 3

                    },
                    brandname: {
                        type: "string",
                        description: "The Offer's brandname",
                        example: "My brand"

                    },
                    headline: {
                        type: "string",
                        description: "The Offer's headline",
                        example: "Click here"
                    },
                    subtitle: {
                        type: "string",
                        description: "The Offer's subtitle",
                        example: "to know more"

                    },
                    kickerText: {
                        type: "string",
                        description: "The Offer's kickerText",
                        example: "one kickertex"

                    },
                    kickerUrl: {
                        type: "string",
                        description: "The Offer's kickerUrl",
                        example: "http://example.com",
                        format: "uri"

                    },
                    kickerClass: {
                        type: "string",
                        description: "The Offer's kickerClass",
                        example: "my-class"

                    },
                    status: {
                        type: "string",
                        description: "The Offer's status",
                        example: "DRAFT",
                        enum: ["DRAFT", "PAUSED", "LIVE"]

                    },
                    campaignId: {
                        type: "integer",
                        description: "The Offer's campaignId",
                        example: 3

                    },
                    uuid: {
                        type: "string",
                        description: "The Offer's uuid",
                        example: "1241414123-12314dasfad-asdfdasfafsd"

                    },
                    clicks: {
                        type: "integer",
                        description: "The Offer's segmentationTags",
                        example: 5

                    },
                    impressions: {
                        type: "integer",
                        description: "The Offer's segmentationTags",
                        example: 20

                    },
                    segmentationTags: {
                        type: "string",
                        description: "The Offer's segmentationTags",
                        example: "one, two, three"

                    },
                    documentationTags: {
                        type: "string",
                        description: "The Offer's documentationTags",
                        example: "one, two, three"

                    },
                    author: {
                        type: "string",
                        description: "The Offer's documentationTags",
                        example: "one, two, three"

                    },
                    authorLink: {
                        type: "string",
                        description: "The Author's link",
                        example: "http://example.com",
                        format: "uri"
                    },
                    footerUrl: {
                        type: "string",
                        description: "The Footer's url",
                        example: "http://example.com",
                        format: "uri"
                    },
                    photoAuthor: {
                        type: "string",
                        description: "The photoAuthor",
                        example: "Joe Doe"

                    },
                    copyright: {
                        type: "string",
                        description: "The photo copyright",
                        example: "Apache"

                    },
                    createdAt: {
                        type: "string",
                        description: "The Offer's creation time",
                        format: "date-time"
                    },
                    updatedAt: {
                        type: "string",
                        description: "The Offer's last update time",
                        format: "date-time"
                    },
                    deletedAt: {
                        type: "string",
                        description: "The Offer's deleted time",
                        format: "date-time"
                    }
                }
            },
            Offers: {
                type: "array",
                description: "A list of Offers",
                items: {
                    $ref: '#/components/schemas/Offer'
                }
            },
            CronResponse: {
                type: "object",
                description: "the response to a cron process",
                properties: {
                    result: {
                        type: "string",
                        description: "The result of the process",
                        example: "ok"
                    }
                }
            },
            CreateNotification: {
                type: "object",
                description: "the response to a cron process",
                properties: {
                    result: {
                        type: "string",
                        description: "The result of the process",
                        example: "ok"
                    }
                }
            },
            ImageResponse: {
                type: "object",
                description: "The response with the upload URL",
                properties: {
                    putURL: {
                        type: "string",
                        format: "uri",
                        description: "The URL to upload the image",
                        example: "https://storage.googleapis.com/dni-bcio-int-images-dev/jkask%C3%B1j2faj%C3%B1k__200__500.png?GoogleAccessId=backend-api%40dni-bcio-int.iam.gserviceaccount.com&Expires=1577825668&Signature=PhlXtU8LF49CsbQ%2BxPttsFvS41XsAsrfMXf0KY6cdmUZkizegaoLNtqMqmwDzCoLJvJxWoDLt8Nfe9lveG79qeNt26XIcCkKQ5riIihAsN8usvGp9%2FnWFHdcZq53%2BB4FZqBm%2FAOkBllCrbWAR6Ft2rzef1HTL7Z7mUZMb0EthmbjlJe94mBbgxhmMQxbSr%2F0ohfbBQ0phP8G9HY53xd%2Fod%2Fl3aziO7yrSv3xdgUjQWrq%2Fhcrn3G0ANmH6E3wwltnTluR%2BZ97QpGt13yS%2FZ72sQXary2QkdFhZwnTrJJ1zkT8PKX220%2B%2BzsOcIf%2BR4LeSIsET4U7M%2FdmHYDmwZGxDHA%3D%3D"
                    },
                    getURL: {
                        type: "string",
                        format: "uri",
                        description: "The URL to get the image",
                        example: "https://storage.googleapis.com/dni-bcio-int-images-dev/jkaskñjlfajñk__200__500.png"
                    }
                }
            },
            BasicResponse: {
                type: "string",
                description: "A basic response",
                example: "OK"
            }
            
        },
        responses: {
            Unauthorized: {
                description: "The request has not been applied because it lacks valid authentication credentials for the target resource.",
                content:{
                    "application/json": {
                        schema: {
                            $ref: '#/components/schemas/Error'
                        }
                    }
                }
            },
            InternalServerError: {
                description: "Internal server error.",
                content: {
                    "application/json": {
                        schema: {
                            $ref: '#/components/schemas/Error'
                        }
                    }
                }
            },
            UnprocessableEntity: {
                description: "Unprocessable Entity.",
                content: {
                    "application/json": {
                        schema: {
                            $ref: '#/components/schemas/Error'
                        }
                    }
                }
            },
            NotFoundError: {
                description: "Not Found.",
                content: {
                    "application/json": {
                        schema: {
                            $ref: '#/components/schemas/Error'
                        }
                    }
                }
            }
        }
    },
    security: [
        {bearerAuth: []}
    ]
};

const options = {
    swaggerDefinition,
    apis: ['./routes/*.js']
};

const swaggerSpec = swaggerJSDoc(options);

module.exports = swaggerSpec;