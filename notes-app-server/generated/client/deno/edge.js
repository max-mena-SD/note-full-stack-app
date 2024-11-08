const exports = {};
Object.defineProperty(exports, "__esModule", { value: true });

import {
  Debug,
  Decimal,
  defineDmmfProperty,
  empty,
  Extensions,
  getPrismaClient,
  getRuntime,
  join,
  makeStrictEnum,
  NotFoundError,
  objectEnumValues,
  PrismaClientInitializationError,
  PrismaClientKnownRequestError,
  PrismaClientRustPanicError,
  PrismaClientUnknownRequestError,
  PrismaClientValidationError,
  Public,
  raw,
  skip,
  sqltag,
} from ".././runtime/edge-esm.js";

const Prisma = {};

exports.Prisma = Prisma;
exports.$Enums = {};

/**
 * Prisma Client JS version: 5.21.1
 * Query Engine version: bf0e5e8a04cada8225617067eaa03d041e2bba36
 */
Prisma.prismaVersion = {
  client: "5.21.1",
  engine: "bf0e5e8a04cada8225617067eaa03d041e2bba36",
};

Prisma.PrismaClientKnownRequestError = PrismaClientKnownRequestError;
Prisma.PrismaClientUnknownRequestError = PrismaClientUnknownRequestError;
Prisma.PrismaClientRustPanicError = PrismaClientRustPanicError;
Prisma.PrismaClientInitializationError = PrismaClientInitializationError;
Prisma.PrismaClientValidationError = PrismaClientValidationError;
Prisma.NotFoundError = NotFoundError;
Prisma.Decimal = Decimal;

/**
 * Re-export of sql-template-tag
 */
Prisma.sql = sqltag;
Prisma.empty = empty;
Prisma.join = join;
Prisma.raw = raw;
Prisma.validator = Public.validator;

/**
 * Extensions
 */
Prisma.getExtensionContext = Extensions.getExtensionContext;
Prisma.defineExtension = Extensions.defineExtension;

/**
 * Shorthand utilities for JSON filtering
 */
Prisma.DbNull = objectEnumValues.instances.DbNull;
Prisma.JsonNull = objectEnumValues.instances.JsonNull;
Prisma.AnyNull = objectEnumValues.instances.AnyNull;

Prisma.NullTypes = {
  DbNull: objectEnumValues.classes.DbNull,
  JsonNull: objectEnumValues.classes.JsonNull,
  AnyNull: objectEnumValues.classes.AnyNull,
};

/**
 * Enums
 */
exports.Prisma.TransactionIsolationLevel = makeStrictEnum({
  ReadUncommitted: "ReadUncommitted",
  ReadCommitted: "ReadCommitted",
  RepeatableRead: "RepeatableRead",
  Serializable: "Serializable",
});

exports.Prisma.NoteScalarFieldEnum = {
  id: "id",
  title: "title",
  content: "content",
};

exports.Prisma.SortOrder = {
  asc: "asc",
  desc: "desc",
};

exports.Prisma.QueryMode = {
  default: "default",
  insensitive: "insensitive",
};

exports.Prisma.ModelName = {
  Note: "Note",
};
/**
 * Create the Client
 */
const config = {
  "generator": {
    "name": "client",
    "provider": {
      "fromEnvVar": null,
      "value": "prisma-client-js",
    },
    "output": {
      "value":
        "/home/maxmena/Projects/notes-app-full/notes-app-server/generated/client",
      "fromEnvVar": null,
    },
    "config": {
      "engineType": "library",
    },
    "binaryTargets": [
      {
        "fromEnvVar": null,
        "value": "debian-openssl-3.0.x",
        "native": true,
      },
    ],
    "previewFeatures": [
      "deno",
    ],
    "sourceFilePath":
      "/home/maxmena/Projects/notes-app-full/notes-app-server/prisma/schema.prisma",
    "isCustomOutput": true,
  },
  "relativeEnvPaths": {
    "rootEnvPath": null,
    "schemaEnvPath": "../../.env",
  },
  "relativePath": "../../prisma",
  "clientVersion": "5.21.1",
  "engineVersion": "bf0e5e8a04cada8225617067eaa03d041e2bba36",
  "datasourceNames": [
    "db",
  ],
  "activeProvider": "postgresql",
  "postinstall": false,
  "inlineDatasources": {
    "db": {
      "url": {
        "fromEnvVar": "DATABASE_URL",
        "value": null,
      },
    },
  },
  "inlineSchema":
    '// This is your Prisma schema file,\n// learn more about it in the docs: https://pris.ly/d/prisma-schema\n\n// Looking for ways to speed up your queries, or scale easily with your serverless or edge functions?\n// Try Prisma Accelerate: https://pris.ly/cli/accelerate-init\n\ngenerator client {\n  provider        = "prisma-client-js"\n  previewFeatures = ["deno"]\n  output          = "../generated/client"\n}\n\ndatasource db {\n  provider = "postgresql"\n  url      = env("DATABASE_URL")\n}\n\nmodel Note {\n  id      Int    @id @default(autoincrement())\n  title   String\n  content String\n}\n',
  "inlineSchemaHash":
    "e08b57cc71c42678d5fdcf11fd510ceb01f827162e8083bc89dbb8ea110b6778",
  "copyEngine": true,
};
config.dirname = "/";

config.runtimeDataModel = JSON.parse(
  '{"models":{"Note":{"dbName":null,"fields":[{"name":"id","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":true,"isReadOnly":false,"hasDefaultValue":true,"type":"Int","default":{"name":"autoincrement","args":[]},"isGenerated":false,"isUpdatedAt":false},{"name":"title","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"String","isGenerated":false,"isUpdatedAt":false},{"name":"content","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"String","isGenerated":false,"isUpdatedAt":false}],"primaryKey":null,"uniqueFields":[],"uniqueIndexes":[],"isGenerated":false}},"enums":{},"types":{}}',
);
defineDmmfProperty(exports.Prisma, config.runtimeDataModel);
config.engineWasm = undefined;

config.injectableEdgeEnv = () => ({
  parsed: {
    DATABASE_URL:
      typeof globalThis !== "undefined" && globalThis["DATABASE_URL"] ||
      typeof process !== "undefined" && process.env &&
        process.env.DATABASE_URL ||
      undefined,
  },
});

if (
  typeof globalThis !== "undefined" && globalThis["DEBUG"] ||
  typeof process !== "undefined" && process.env && process.env.DEBUG ||
  undefined
) {
  Debug.enable(
    typeof globalThis !== "undefined" && globalThis["DEBUG"] ||
      typeof process !== "undefined" && process.env && process.env.DEBUG ||
      undefined,
  );
}

const PrismaClient = getPrismaClient(config);
exports.PrismaClient = PrismaClient;
Object.assign(exports, Prisma);
export { exports as default, Prisma, PrismaClient };
