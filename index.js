const Matrix = document.querySelector("#Matrix")
const container = document.querySelector('#container')
const generate = document.querySelector('#generate')

let move = 0

let player_table =[ [0,0,0],
                    [0,0,0],
                    [0,0,0]
                ]
let cmp_table = [   [0,0,0],
                    [0,0,0],
                    [0,0,0]
                ]


const win_logo = (player)=>{
    const win_log = document.createElement('div')
    win_log.setAttribute('id', 'log')
    const message =document.createElement('h1')
    message.innerText = `${player} won`
    win_log.appendChild(message)
    container.appendChild(win_log)

    const leftover_cells = document.getElementsByClassName('square')
    for( cell of leftover_cells){
        cell.removeEventListener('click', marksquare)
    }

}

const tie = ()=>{
    const tie_log = document.createElement('div')
    tie_log.setAttribute('id', 'log')
    const message =document.createElement('h1')
    message.innerText = `tied`
    tie_log.appendChild(message)
    container.appendChild(tie_log)
    const leftover_cells = document.getElementsByClassName('square')
    for( cell of leftover_cells){
        cell.removeEventListener('click', marksquare)
    }
}


const setting_table = (cell_number, player)=>{
    let table
    if(player === "you"){
        table = player_table
    }
    if(player === "cmp"){
        table = cmp_table
    }

    if(cell_number < 3){
        table[0][cell_number % 3] = 1
    }
    if( 3 <= cell_number && cell_number < 6){
        table[1][cell_number % 3] = 1
    }
    if(6<= cell_number && cell_number < 9){
        table[2][cell_number % 3] = 1
    }

}

const win_tic = (player)=>{
    let table
    if(player === "you"){
        table = player_table
    }
    if(player === "cmp"){
        table = cmp_table
    }
    let sum;

    for(let i = 0 ; i < 3 ; i++ ){
       sum = table[i].reduce((sum, number) => sum + number , 0)
       if(sum == 3){
        win_logo(player)
        return
       }

    }
    for(let i = 0 ; i < 3 ; i++){
        sum = table[0][i] + table[1][i] +table[2][i]
        if(sum == 3){
            win_logo(player)
            return
        }

    }


    if(table[0][0] == 1 && table[1][1] == 1 && table[2][2] ==1){
        win_logo(player)
        return
    }

    if(table[0][2] == 1 && table[1][1] == 1 && table[2][0] ==1 ){
        win_logo(player)
        return
    }
    if(move == 9){
        tie()
        return
    }
}


const marksquare =(event) => {
    
    const player = event.target
    const player_number = player.getAttribute('name') 
    player.setAttribute('class',"you")
    setting_table(player_number,"you")
    move++
    win_tic("you")
    player.removeEventListener('click', marksquare)
    const next_cell_list = document.getElementsByClassName('square')
    if(next_cell_list.length != 0){

        const number = Math.floor( Math.random() * next_cell_list.length)
        const cmp_cell = next_cell_list[number]
        const cmp_number = cmp_cell.getAttribute("name")
        
        cmp_cell.removeEventListener('click',marksquare)
        cmp_cell.setAttribute('class',"cmp")
        setting_table(cmp_number,"cmp")
        move++
        win_tic("cmp")
    }


}


const CreateMatrix = () =>{

    while(Matrix.firstChild){
        Matrix.removeChild(Matrix.firstChild)
    }
    move = 0
    player_table =[ [0,0,0],
                    [0,0,0],
                    [0,0,0]
                ]
    cmp_table = [   [0,0,0],
                    [0,0,0],
                    [0,0,0]
                ]

    const log = document.querySelector('#log')

    if( log != null){
        log.parentNode.removeChild(log)
    }
    for(let i = 0; i < 9; i++){
        const square = document.createElement('div')
        square.setAttribute('name',i)
        square.classList.add('square')

        Matrix.appendChild(square)
        square.addEventListener('click', marksquare)
    }
}


//add an event lisenter that will listen for the DOM to be loaded 
document.addEventListener('DOMContentLoaded', () =>{
    CreateMatrix()
}
)

generate.addEventListener('click',CreateMatrix)