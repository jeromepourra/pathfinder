<!DOCTYPE html>
<html lang="fr">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="./css/style.css">
    <link rel="icon" href="./img/favicon.ico">
    <title>Pathfinder</title>
</head>

<body>

    <div id="root">
        <header>
            <h1>Pathfinder</h1>
            <button id="findpath">Findpath</button>
        </header>
        <main>
            <div id="view">
                <table id="grid" class="grabbable"></table>
            </div>
        </main>
        <footer>
            <p>Jérôme Pourra - Pathfinder - 2024</p>
        </footer>
    </div>

    <script src="https://code.jquery.com/jquery-3.7.1.min.js"></script>
    <script type="module" src="./src/main.js"></script>

</body>

</html>