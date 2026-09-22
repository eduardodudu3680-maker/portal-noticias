const express = require("express");
const dotenv = require("dotenv");

dotenv.config();

const app = express();

const PORT = process.env.PORT || 3000;
const API_KEY = process.env.GNEWS_API_KEY;

app.get("/", (req, res) => {
    res.send(`
<!DOCTYPE html>
<html lang="pt-BR">

<head>

<meta charset="UTF-8">

<meta name="viewport" content="width=device-width, initial-scale=1.0">

<title>Notícia Agora</title>

<style>

* {
    box-sizing: border-box;
}

body {
    margin: 0;
    font-family: Arial, sans-serif;
    background: #f2f4f7;
    color: #111;
}

header {
    background: #111827;
    color: white;
    position: sticky;
    top: 0;
    z-index: 100;
    box-shadow: 0 3px 15px rgba(0,0,0,0.2);
}

.topo {
    max-width: 1200px;
    margin: auto;
    padding: 18px 20px;
    display: flex;
    align-items: center;
    justify-content: space-between;
}

.logo {
    font-size: 25px;
    font-weight: bold;
}

.logo span {
    color: #3b82f6;
}

#menuBtn {
    background: transparent;
    border: none;
    color: white;
    font-size: 28px;
    cursor: pointer;
    display: none;
}

nav {
    max-width: 1200px;
    margin: auto;
    padding: 0 20px 15px;
    display: flex;
    gap: 10px;
    overflow-x: auto;
}

nav button {
    border: none;
    background: #1f2937;
    color: white;
    padding: 10px 18px;
    border-radius: 20px;
    cursor: pointer;
    white-space: nowrap;
    font-size: 14px;
}

nav button:hover,
nav button.ativo {
    background: #2563eb;
}

main {
    max-width: 1200px;
    margin: auto;
    padding: 25px 20px 50px;
}

.cabecalho {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 15px;
    margin-bottom: 25px;
}

.cabecalho h2 {
    margin: 0;
    font-size: 30px;
}

.info {
    color: #666;
    font-size: 14px;
    margin-top: 8px;
}

#atualizar {
    border: none;
    background: #2563eb;
    color: white;
    padding: 12px 18px;
    border-radius: 10px;
    font-weight: bold;
    cursor: pointer;
}

#atualizar:active {
    transform: scale(0.97);
}

.noticias {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 20px;
}

.card {
    background: white;
    border-radius: 15px;
    overflow: hidden;
    box-shadow: 0 3px 15px rgba(0,0,0,0.08);
    transition: 0.2s;
    display: flex;
    flex-direction: column;
}

.card:hover {
    transform: translateY(-4px);
}

.card img {
    width: 100%;
    height: 190px;
    object-fit: cover;
    background: #ddd;
}

.card-conteudo {
    padding: 18px;
    display: flex;
    flex-direction: column;
    flex: 1;
}

.card h3 {
    margin: 0 0 10px;
    font-size: 19px;
    line-height: 1.3;
}

.card p {
    color: #666;
    line-height: 1.5;
    margin: 0 0 15px;
}

.data {
    color: #888;
    font-size: 12px;
    margin-top: auto;
    margin-bottom: 12px;
}

.ler {
    display: block;
    text-align: center;
    text-decoration: none;
    background: #111827;
    color: white;
    padding: 11px;
    border-radius: 8px;
    font-weight: bold;
}

.ler:hover {
    background: #2563eb;
}

.mensagem {
    background: white;
    padding: 30px;
    border-radius: 15px;
    text-align: center;
    grid-column: 1 / -1;
}

footer {
    background: #111827;
    color: #aaa;
    text-align: center;
    padding: 30px 20px;
}

footer strong {
    color: white;
}

@media (max-width: 850px) {

    .noticias {
        grid-template-columns: repeat(2, 1fr);
    }

}

@media (max-width: 600px) {

    #menuBtn {
        display: block;
    }

    nav {
        display: none;
        flex-direction: column;
        padding-bottom: 15px;
    }

    nav.aberto {
        display: flex;
    }

    nav button {
        width: 100%;
        text-align: left;
    }

    .cabecalho {
        flex-direction: column;
        align-items: flex-start;
    }

    .cabecalho h2 {
        font-size: 25px;
    }

    #atualizar {
        width: 100%;
    }

    .noticias {
        grid-template-columns: 1fr;
    }

    .card img {
        height: 210px;
    }

}

</style>

</head>

<body>

<header>

    <div class="topo">

        <div class="logo">
            Notícia <span>Agora</span>
        </div>

        <button id="menuBtn">☰</button>

    </div>

    <nav id="menu">

        <button class="categoria ativo" data-categoria="brasil">
            🇧🇷 Brasil
        </button>

        <button class="categoria" data-categoria="mundo">
            🌎 Mundo
        </button>

        <button class="categoria" data-categoria="esportes">
            ⚽ Esportes
        </button>

        <button class="categoria" data-categoria="tecnologia">
            💻 Tecnologia
        </button>

        <button class="categoria" data-categoria="entretenimento">
            🎬 Entretenimento
        </button>

    </nav>

</header>


<main>

    <div class="cabecalho">

        <div>

            <h2 id="titulo">
                🇧🇷 Brasil
            </h2>

            <div class="info" id="info">
                Carregando notícias...
            </div>

        </div>

        <button id="atualizar">
            🔄 Atualizar
        </button>

    </div>


    <section class="noticias" id="noticias">

        <div class="mensagem">
            📰 Carregando notícias...
        </div>

    </section>

</main>


<footer>

    <p>
        <strong>Notícia Agora</strong>
    </p>

    <p>
        Portal de notícias automático.
    </p>

    <p>
        As notícias são exibidas a partir de suas fontes originais.
    </p>

</footer>


<script>

const noticias = document.getElementById("noticias");
const titulo = document.getElementById("titulo");
const info = document.getElementById("info");
const atualizar = document.getElementById("atualizar");
const menuBtn = document.getElementById("menuBtn");
const menu = document.getElementById("menu");

let categoriaAtual = "brasil";

const nomes = {
    brasil: "🇧🇷 Brasil",
    mundo: "🌎 Mundo",
    esportes: "⚽ Esportes",
    tecnologia: "💻 Tecnologia",
    entretenimento: "🎬 Entretenimento"
};


async function carregarNoticias(categoria = categoriaAtual) {

    categoriaAtual = categoria;

    titulo.textContent = nomes[categoria];

    noticias.innerHTML = `
        <div class="mensagem">
            📰 Buscando as notícias mais recentes...
        </div>
    `;

    info.textContent = "Atualizando...";

    try {

        const resposta = await fetch(
            "/api/noticias/" + categoria
        );

        const dados = await resposta.json();

        if (!resposta.ok) {
            throw new Error(
                dados.erro || "Erro ao carregar notícias"
            );
        }

        if (!dados.articles || dados.articles.length === 0) {

            noticias.innerHTML = `
                <div class="mensagem">
                    😕 Nenhuma notícia encontrada.
                </div>
            `;

            return;
        }

        noticias.innerHTML = "";

        dados.articles.forEach(noticia => {

            const card = document.createElement("article");

            card.className = "card";

            const imagem = noticia.image
                ? noticia.image
                : "https://via.placeholder.com/800x450?text=Noticia";

            const tituloNoticia =
                noticia.title || "Sem título";

            const descricao =
                noticia.description ||
                "Leia a notícia completa na fonte original.";

            const data = noticia.publishedAt
                ? new Date(noticia.publishedAt).toLocaleString(
                    "pt-BR",
                    {
                        dateStyle: "short",
                        timeStyle: "short"
                    }
                )
                : "";

            card.innerHTML = `

                <img
                    src="${imagem}"
                    alt="Imagem da notícia"
                    onerror="this.src='https://via.placeholder.com/800x450?text=Noticia'"
                >

                <div class="card-conteudo">

                    <h3>${escaparHTML(tituloNoticia)}</h3>

                    <p>
                        ${escaparHTML(descricao)}
                    </p>

                    <div class="data">
                        ${data}
                    </div>

                    <a
                        class="ler"
                        href="${noticia.url}"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        Ler notícia completa
                    </a>

                </div>
            `;

            noticias.appendChild(card);

        });

        info.textContent =
            dados.articles.length +
            " notícias encontradas • " +
            new Date().toLocaleTimeString("pt-BR");

    } catch (erro) {

        console.error(erro);

        noticias.innerHTML = `
            <div class="mensagem">

                ❌ Não foi possível carregar as notícias.

                <br><br>

                Tente atualizar novamente.

            </div>
        `;

        info.textContent = "Erro ao carregar.";

    }

}


function escaparHTML(texto) {

    const div = document.createElement("div");

    div.textContent = texto;

    return div.innerHTML;

}


document.querySelectorAll(".categoria").forEach(botao => {

    botao.addEventListener("click", () => {

        document
            .querySelectorAll(".categoria")
            .forEach(b => b.classList.remove("ativo"));

        botao.classList.add("ativo");

        carregarNoticias(
            botao.dataset.categoria
        );

        menu.classList.remove("aberto");

    });

});


atualizar.addEventListener(
    "click",
    () => carregarNoticias(categoriaAtual)
);


menuBtn.addEventListener(
    "click",
    () => menu.classList.toggle("aberto")
);


carregarNoticias("brasil");

</script>

</body>

</html>
    `);
});


app.get("/api/noticias/:categoria", async (req, res) => {

    try {

        if (!API_KEY) {

            return res.status(500).json({
                erro: "Chave da GNews não configurada no servidor."
            });

        }

        const categorias = {

            brasil: "nation",

            mundo: "world",

            esportes: "sports",

            tecnologia: "technology",

            entretenimento: "entertainment"

        };

        const categoria = req.params.categoria;

        if (!categorias[categoria]) {

            return res.status(400).json({
                erro: "Categoria inválida."
            });

        }

        const url =
            "https://gnews.io/api/v4/top-headlines" +
            "?category=" + categorias[categoria] +
            "&lang=pt" +
            "&country=br" +
            "&max=10" +
            "&apikey=" + encodeURIComponent(API_KEY);

        const resposta = await fetch(url);

        const dados = await resposta.json();

        if (!resposta.ok) {

            return res.status(resposta.status).json({
                erro: dados.errors || "Erro na API da GNews."
            });

        }

        res.json(dados);

    } catch (erro) {

        console.error(erro);

        res.status(500).json({
            erro: "Erro interno do servidor."
        });

    }

});


app.get("/api/status", (req, res) => {

    res.json({
        online: true,
        portal: "Notícia Agora",
        chaveConfigurada: Boolean(API_KEY)
    });

});


app.listen(PORT, () => {

    console.log(
        "Portal rodando na porta " + PORT
    );

});
