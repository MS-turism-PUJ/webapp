import * as fs from 'fs';
import * as dotenv from 'dotenv';

// Cargar variables desde el archivo .env
const envConfig = dotenv.config().parsed;

if (envConfig) {
    const envFileContent = `export const environment = ${JSON.stringify(envConfig, null, 2)};`;

    // Generar un archivo TypeScript con las variables
    fs.writeFileSync('./src/environments/environment.env.ts', envFileContent);
    console.log('Archivo environment.env.ts generado correctamente.');
} else {
    console.error('No se pudo cargar el archivo .env.');
}
