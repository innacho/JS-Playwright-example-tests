const mysql = require('mysql2/promise');
import { DBcred } from '../config/';

// Настройка подключения
const pool = mysql.createPool({
    host: '********',
    port: 3306,
    user: DBcred.login,
    password: DBcred.password,
    database: DBcred.DBname,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
});

// Функция выполнения запросов
async function queryDatabase(query, params) {
    const connection = await pool.getConnection();
    try {
        const [rows] = await connection.execute(query, params);
        return rows; // Возвращаем строки из результата
    } finally {
        connection.release(); // Закрываем подключение
    }
}

// Функция для закрытия пула
async function closePool() {
    await pool.end();
}

module.exports = { queryDatabase, closePool };