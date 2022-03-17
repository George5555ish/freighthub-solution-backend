import {Request, Response} from 'express'
interface Context {
    res: Response;
    req: Request;
}

export default Context