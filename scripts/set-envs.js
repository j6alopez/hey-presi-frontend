const { writeFileSync, mkdirSync } = require( 'fs' );
require( 'dotenv' ).config();

const targetPath = './src/environments/environment.ts';
const envFileContent = `export const environment = {
  backend_base_url: "${ process.env[ 'BACKEND_BASE_URL' ] }",
};
`;

mkdirSync( './src/environments', { recursive: true } );
writeFileSync( targetPath, envFileContent );
