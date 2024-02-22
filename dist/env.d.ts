export declare const env: {
    node: string;
    isProduction: boolean;
    isTest: boolean;
    isDevelopment: boolean;
    cryptoSecret: string;
    jwtSecret: string;
    availImageTypes: string;
    baseUrl: string;
    app: {
        name: string;
        host: string;
        schema: string;
        routePrefix: string;
        port: string | number | boolean;
        dirs: {
            entities: string[];
            controllers: string[];
            middlewares: string[];
        };
    };
    db: {
        type: string;
        host: string;
        port: number;
        username: string;
        password: string;
        database: string;
        synchronize: boolean;
        logging: boolean;
    };
    aws: {
        AWS_ACCESS_KEY_ID: string;
        AWS_SECRET_ACCESS_KEY: string;
        AWS_DEFAULT_REGION: string;
        AWS_BUCKET: string;
    };
};
export declare const mailEnv: {
    SERVICE: string;
    HOST: string;
    PORT: string;
    SECURE: string;
    FROM: string;
    AUTH: {
        user: string;
        pass: string;
    };
};
