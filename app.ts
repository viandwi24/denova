declare global { interface Window { app: any; }  }

const app: any = () => {
    return window.app ?? {};
};

export { app };
export default app;
export function bind(app: any) {
    return window.app = app;
};