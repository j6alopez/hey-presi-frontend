const { writeFileSync, mkdirSync } = require( 'fs' );
require( 'dotenv' ).config();

const targetPath = './src/environments/environment.ts';
const envFileContent = `export const environment = {
  backend_base_url: "${ process.env[ 'BACKEND_BASE_URL' ] }",
  mapbox_key: "${ process.env[ 'MAPBOX_KEY' ] }",
};
`;

mkdirSync( './src/environments', { recursive: true } );
writeFileSync( targetPath, envFileContent );
