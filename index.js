"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const pg_1 = require("pg");
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
const port = 3001;
app.get('/', (req, res) => {
    const pool = openDb();
    pool.query('SELECT * FROM task', (error, result) => {
        if (error) {
            res.status(500).json({ error: error });
        }
        res.status(200).json(result.rows);
    });
});
app.post('/new', (req, res) => {
    const pool = openDb();
    pool.query('INSERT INTO task (description) VALUES ($1) returning *', [req.body.description], (error, result) => {
        if (error) {
            res.status(500).json({ error: error.message });
        }
        res.status(200).json({ id: result.rows[0].id });
    });
});
app.delete("/delete/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const pool = openDb();
    const id = parseInt(req.params.id);
    pool.query('DELETE FROM task WHERE id = $1', [id], (error, result) => {
        if (error) {
            res.status(500).json({ error: error.message });
        }
        res.status(200).json({ message: "Task deleted" });
    });
}));
const openDb = () => {
    const pool = new pg_1.Pool({
        /*user: 'postgres',
         host: 'localhost',
         database:'todo' ,
         password: 'root',
         port: 5432*/
        user: 'root',
        host: 'dpg-cgdjikceoogo8r34dcsg-a.oregon-postgres.render.com',
        database: 'todo_742a',
        password: 'mPu1zJUne5vGpQgB2Cu6WqmP4kZm6yO6',
        port: 5432,
        ssl: true
    });
    return pool;
};
app.listen(port);
