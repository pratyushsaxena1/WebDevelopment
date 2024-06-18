const sqlite3 = require('sqlite3').verbose();

function insertData(dbName, sqlFilePath) {
    const connection = new sqlite3.Database(dbName);
    const sqlScript = require('fs').readFileSync(sqlFilePath, 'utf8');
    connection.exec(sqlScript, (err) => {
        if (err) {
            console.error(`Error executing script for ${dbName}: ${err.message}`);
        } else {
            console.log(`Data inserted successfully for ${dbName}`);
        }

        connection.close();
    });
}

insertData('login.db', 'insert_login.sql');
insertData('user_information.db', 'insert_user_information.sql')