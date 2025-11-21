
// script.js

let score = 0; // puntuación inicial
const pointsPerQuestion = 0.5; // cada pregunta vale 0.5 puntos
const totalPoints = 10; // puntuación máxima

// Creamos el footer para mostrar la puntuación
document.addEventListener("DOMContentLoaded", () => {
    const footer = document.createElement("footer");
    footer.style.marginTop = "30px";
    footer.style.fontSize = "20px";
    footer.style.fontWeight = "bold";
    footer.style.color = "#333";
    footer.textContent = `Puntuación: ${score} / ${totalPoints}`;
    document.body.appendChild(footer);

    const options = document.querySelectorAll(".option");

    options.forEach(option => {
        option.style.cursor = "pointer"; // Para que se vea clicable

        option.onclick = () => {
            const question = option.closest(".question-item");

            // Evitar que una pregunta se responda más de una vez
            if (question.dataset.answered === "true") return;
            question.dataset.answered = "true";

            // Definir cuál es la respuesta correcta
            const correctAnswer = question.querySelector(".option[data-answer='B']") 
                               || question.querySelector(".option[data-answer='C']");

            // Verificar si la opción clicada es la correcta
            const isCorrect = option === correctAnswer;

            showPokemon(isCorrect, question);

            // Actualizar puntuación
            if (isCorrect) {
                score += pointsPerQuestion;
            }

            // Mostrar puntuación actualizada en el footer
            footer.textContent = `Puntuación: ${score} / ${totalPoints}`;
        };
    });
});

// Definimos los Pokémon que aparecerán
const correctPokemon = {
    name: "Bulbasaur-----De Tipo Planta/Veneno ",
    type: "¡ESTE POKEMON INDICA QUE LA OPCIÓN ELEGIDA ES LA CORRECTA!!",
    img: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png"
};

const incorrectPokemon = {
    name: "Charmeleon-------De tipo Fuego",
    type: "¡ESTE POKEMON INDICA QUE LA OPCIÓN ELEGIDA ES LA INCORRECTA!! ",
    img: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/5.png"
};

// Función para mostrar el Pokémon después de contestar
function showPokemon(isCorrect, questionElement) {
    const pokemon = isCorrect ? correctPokemon : incorrectPokemon;

    // Crear tarjeta estilo pokedex
    const card = document.createElement("div");
    card.classList.add("pokemon-card");

    const img = document.createElement("img");
    img.src = pokemon.img;
    img.alt = pokemon.name;

    const name = document.createElement("div");
    name.classList.add("pokemon-name");
    name.textContent = pokemon.name;

    const type = document.createElement("div");
    type.classList.add("pokemon-type");
    type.textContent = "Resultado: " + pokemon.type;

    card.appendChild(img);
    card.appendChild(name);
    card.appendChild(type);

    // Insertar justo después de la pregunta contestada
    questionElement.insertAdjacentElement("afterend", card);
}
