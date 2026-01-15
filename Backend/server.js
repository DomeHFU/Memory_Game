const express = require("express");
const cors = require("cors");
const sqlite3 = require("sqlite3").verbose();

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

const db = new sqlite3.Database("./my_game.db", err => {
    if (!err) {
        db.run(`
            CREATE TABLE IF NOT EXISTS highscore (
                name TEXT PRIMARY KEY,
                points INTEGER NOT NULL,
                time TEXT NOT NULL,
                wins INTEGER NOT NULL
            )
        `);
    }
});

app.get("/highscore", (req, res) => {
    db.all(
        "SELECT * FROM highscore ORDER BY wins DESC",
        (err, rows) => res.json(rows)
    );
});

app.post("/highscore", (req, res) => {
    const { name, points, time } = req.body;

    db.get(
        "SELECT * FROM highscore WHERE name = ?",
        [name],
        (err, row) => {

            if (!row) {
               
                db.run(
                    "INSERT INTO highscore (name, points, time, wins) VALUES (?, ?, ?, 1)",
                    [name, points, time],
                    () => res.json({ message: "Neuer Spieler gespeichert" })
                );
            } else {
            
                db.run(
                    `UPDATE highscore
                     SET points = MAX(points, ?),
                         time = ?,
                         wins = wins + 1
                     WHERE name = ?`,
                    [points, time, name],
                    () => res.json({ message: "Spieler aktualisiert, Sieg gezählt" })
                );
            }
        }
    );
});

app.delete("/highscore/:name", (req, res) => {
    db.run(
        "DELETE FROM highscore WHERE name = ?",
        [req.params.name],
        () => res.json({ message: "Spieler gelöscht" })
    );
});

app.listen(port, () => {
    console.log("Server läuft auf http://localhost:" + port);
});
