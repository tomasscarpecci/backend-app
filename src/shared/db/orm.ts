import { MikroORM, Options } from '@mikro-orm/core';
import { MongoHighlighter } from '@mikro-orm/mongo-highlighter';
import { defineConfig } from '@mikro-orm/mongodb';

export const initORM: Options = defineConfig({
  entities: ['dist/**/*.Entity.js'], // Entidades compiladas
  entitiesTs: ['src/**/*.Entity.ts'], // Entidades TypeScript
  dbName: 'newsportalusers', // Nombre de la base de datos
  clientUrl: 'mongodb://127.0.0.1:27017', // URL de conexión a MongoDB
  debug: true, // Habilitar el modo debug
  highlighter: new MongoHighlighter(), // Resaltador de consultas
});