import {$} from 'bun';

try {
    await $`rm -rf ./build`
    await $`bun build  --compile ./src/app.ts  --target=bun-windows-x64    --outfile ../build/app`.cwd('./backend');
    await $`vite build --outDir ../build`.cwd('./frontend');
} catch (e) {
    console.error(e);
}

