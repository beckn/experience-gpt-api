import 'express';

interface Locals {
    [key: string]: any;
}


declare module 'express' {
    export interface Response {
        locals: Locals;
    }
}