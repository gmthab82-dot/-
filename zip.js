import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import * as archiverModule from 'archiver';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const output = fs.createWriteStream(path.join(__dirname, 'coloring_app.zip'));
const archive = new archiverModule.ZipArchive({
  zlib: { level: 9 }
});

output.on('close', function() {
  console.log(archive.pointer() + ' total bytes');
  console.log('ZIP file created successfully: coloring_app.zip');
});

archive.on('error', function(err) {
  throw err;
});

archive.pipe(output);

archive.glob('**/*', {
  ignore: [
    'node_modules/**',
    '.git/**',
    'dist/**',
    'release-builds/**',
    'coloring_app.zip',
    'coloring_app.tar.gz',
    'zip.js',
    'zip.cjs'
  ]
});

archive.finalize();
