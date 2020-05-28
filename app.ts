declare global {
    interface Window {
        app: any;
    }
}

const app: any = () => {
    return window.app ?? {};
};

export const version: string = "0.1.2";
export { app };
export default app;
export function bind(app: any): object {
    return window.app = app;
};