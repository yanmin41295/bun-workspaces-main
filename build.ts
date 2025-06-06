import {$} from 'bun';
import fse from 'fs-extra';

try {
    fse.removeSync('./build/public');
    fse.removeSync('./build/app.exe');
    await $`vite build`.cwd('./packages/preview-pro');
    fse.copySync('./packages/preview-pro/dist', './build/public');
    await $`bun build --compile ./src/app.ts --target=bun-windows-x64 --outfile ../../build/app`.cwd('./packages/backend');
} catch (e: any) {
    console.error(JSON.stringify(e));
}

