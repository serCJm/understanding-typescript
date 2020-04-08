// note, can execute node app.ts
// however, node treats it as a regular js file
// TS features will not work
// need to compile ts to js first
// also, need to install node types
// npm install --save-dev @types/node @types/express

// can use es6 imports with ts instead of common js
// because it will get compiled to commonjs
import express, { Request, Response, NextFunction } from "express";
import todoRoutes from "./routes/todos";
import { json } from "body-parser";

const app = express();

app.use(json());

app.use("/todos", todoRoutes);

app.use((err: Error, _req: Request, res: Response, _next: NextFunction) => {
	res.status(500).json({ message: err.message });
});

app.listen(3000);
