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
    let process = Deno.run(opts);
    return process;
}

const throttle = 500;
let process: Deno.Process = await startProcess();
let timeout: number|null = null;

async function runApp() {
    process.close();
    process = await startProcess();
    console.log("[Denovamon] Change file detected - restarting denova http.")    
}

for await (const event of Deno.watchFs('.')) {
    if (event.kind !== "access") {
        if (timeout) clearTimeout(timeout);
        timeout = setTimeout(runApp, throttle);
    }
}
