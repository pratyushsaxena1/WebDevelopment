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

insertData('heroes.db', 'insert_data_heroes.sql');
insertData('all_equipment.db', 'insert_data_all_equipment.sql');
insertData('all_quests.db', 'insert_data_all_quests.sql');
insertData('assigned_equipment.db', 'insert_data_assigned_equipment.sql');
insertData('assigned_quests.db', 'insert_data_assigned_quests.sql');