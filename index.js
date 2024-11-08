import express from "express";
import axios from "axios";
import bodyParser from "body-parser";

const app = express();
const port = 3000;

// Configurar a pasta de visualizações e o EJS
app.set("view engine", "ejs");
app.set("views", "./views");


// Servir arquivos estáticos da pasta "public"

app.use(express.static("public"));

app.get("/", async (req, res) => {
    try {
        const result = await axios.get("https://v2.jokeapi.dev/joke/Any?type=twopart");
        res.render("index", { setup: result.data.setup, delivery: result.data.delivery });
    } catch (error) {
        console.error(error.response.data);
        res.status(500).send("Erro ao obter piada.");
    }
});


app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});