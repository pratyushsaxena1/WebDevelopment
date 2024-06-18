const express = require('express');
const app = express();
const sqlite3 = require('sqlite3').verbose();

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));

const connection = new sqlite3.Database('assigned_equipment.db');
const connection2 = new sqlite3.Database('assigned_quests.db');

app.get('/', async (req, res) => {
  res.render('form');
});

app.post('/update_database', (req, res) => {
    const { hero, equipment, quest } = req.body;
    connection.run("INSERT INTO assigned_equipment(c_id, e_id) VALUES (?, ?)", [hero, equipment], (err) => {
        if (err) {
            console.error(`Error executing SQL query for assigned_equipment: ${err.message}`);
            res.status(500).send('Internal Server Error');
            return;
        }
        connection2.run("INSERT INTO assigned_quests(c_id, q_id) VALUES (?, ?)", [hero, quest], (err) => {
            if (err) {
                console.error(`Error executing SQL query for assigned_quests: ${err.message}`);
                res.status(500).send('Internal Server Error');
                return;
            }
            console.log("Data inserted successfully");
            connection.all("SELECT * FROM assigned_equipment", (err, assignedEquipment) => {
                if (err) {
                    console.error(`Error fetching data from assigned_equipment: ${err.message}`);
                    res.status(500).send('Internal Server Error');
                    return;
                }

                connection2.all("SELECT * FROM assigned_quests", (err, assignedQuests) => {
                    if (err) {
                        console.error(`Error fetching data from assigned_quests: ${err.message}`);
                        res.status(500).send('Internal Server Error');
                        return;
                    }
                    res.render('databases', { assignedEquipment, assignedQuests });
                });
            });
        });
    });
});

app.listen(8080, "0.0.0.0", () => {
  console.log('Server started');
});