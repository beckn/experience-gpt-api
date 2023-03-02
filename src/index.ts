import express, { Express } from 'express';
import { initApp } from './app';

const app: Express = express();

initApp({ app });