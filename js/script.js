const listaPokemon = document.querySelector('#listaPokemon');
let url = ` https://pokeapi.co/api/v2/pokemon/`;
const botones = document.querySelectorAll(".btn");
// console.log(botones)

for(let i = 1; i <= 151; i++){
    fetch(url + i)
        .then(respuesta => respuesta.json())
        .then(resultado => mostrarPokemon(resultado))
}

function mostrarPokemon(resultado){
    // console.log(resultado)
    let tipos = resultado.types.map( type => `<p class="${type.type.name} p-2 fs-5 tipo">${type.type.name}</p>`);
    console.log(tipos)
    tipos = tipos.join('');

    let pokeId = resultado.id.toString();
    // console.log(pokeId)
    if(pokeId.length === 1){
        pokeId = "00" + pokeId;
    }   else if(pokeId.length === 2){
        pokeId = "0" + pokeId;
    }  

    const div = document.createElement('DIV');
    div.classList.add('col-7', 'col-md-5', 'col-lg-3', 'bg-light', 'm-3', 'pokemon-todos','d-flex', 'row', 'align-content-around')
    div.innerHTML = `
            
            
            <div class="pokemon-img p-2">
                <img src="${resultado.sprites.other.dream_world.front_default}" alt="">
            </div>
            <div class="pokemon-info">
                <div class="nombre-contenedor">
                    <p class="pokemon-id">#${pokeId}</p>
                    <h2 class="pokemon-nombre">${resultado.name}</h2>
                </div>
                <div class="pokemon-tipos">
                    ${tipos}
                </div>
            </div>
            <div class="pokemon-stats">
                <p class="stats"><span>Altura:</span> ${resultado.height}cm</p>
                <p class="stats"><span>Peso:</span> ${resultado.weight}kg</p>
            </div>
        
    `
    listaPokemon.append(div)
}

botones.forEach( boton => boton.addEventListener('click', (event) => {
    const botonId = event.currentTarget.id;

    listaPokemon.innerHTML = '';

    for(let i = 1; i <= 151; i++){
        fetch(url + i)
            .then(respuesta => respuesta.json())
            .then(resultado => {

                if(botonId === "verTodos"){
                    mostrarPokemon(resultado)
                } else{
                    
                    const tipos = resultado.types.map(type => type.type.name);
                    if(tipos.some(tipo => tipo.includes(botonId))){
                        mostrarPokemon(resultado);
                    }
                }

                
            })
    }

}) )
