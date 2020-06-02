async function startProcess() {
    const removeTrailingLineBreak = (str: string) => {
        return str.replace(/\n$/, '')
    }
    
    let cmd: string = "deno run -A -c tsconfig.json app.ts";
    let opts: Deno.RunOptions = {
        cmd: cmd.split(' ')
    };
    opts.stdout = 'inherit';
    opts.stderr = 'inherit';
    return Deno.run(opts);
}

console.log("[Denovamon] A Watcher Change For Denova. Watching...");
let process: Deno.Process = await startProcess();
let timeout: number|null = null;

async function runApp() {
    process.close();
    process = await startProcess();
    Deno.run({ cmd: ['clear'] });
    console.log("[Denovamon] Change file detected - restarting denova http.")    
}

for await (const event of Deno.watchFs('.')) {
    if (event.kind !== "access") {
        if (timeout) clearTimeout(timeout);
        timeout = setTimeout(runApp, 500);
    }
}