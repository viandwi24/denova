import { Service, view, Request, response } from "../../../mod.ts";

@Service()
export class ExampleController {

    public async index() {
        return await view('example.index');
    }

    public async show(request: Request) {
        let { id } = request.params;
        let content = await view('example.show', { id });
        return response(content, 201);
    }

    public async api(request: Request) {
        let data = { name: 'Alfian Dwi Nugraha', address: 'Mojokerto, Jawa Timur, Indonesia.' };
        return response(data, 200).withHeaders({ tes: '1', tes2: '2' });
    }

    public async post(request: Request) {
        let body = await request.context.request.body();
        let { name } = body.value;
        return "your name : " + name;
    }
}