/*
NOTE: Created a game where you play agaisnt PC instead of 2 human players.

Apologies to whoever is reading this, quite a bit of logic

*I would like to ensure my grid size does not change after appendChild (append the img to the li element). Not sure how to go about this.
*/


//Loading in important HTML elements and hiding some buttons
let grid = document.querySelector('.grid')
grid.style.display = 'none'

let reset = document.querySelector('#reset')
reset.style.display = 'none'

let boxes = document.querySelectorAll('.box')


//Wait for player to choose mode 
document.querySelector('#firstPlayer').addEventListener('click', () => {
  startGameAsFirstPlayer()
})

document.querySelector('#secondPlayer').addEventListener('click', () => {
  startGameAsSecondPlayer()
})


//initialise some variables to keep track of game
let count = 1
let arr = [1,2,3,4,5,6,7,8,9]
let mock = [[10, 10, 10],[10, 10, 10],[10, 10, 10]]


//The code below are all for 1st player mode
function startGameAsFirstPlayer() {
  grid.style.display = 'flex'
  document.querySelectorAll('button').forEach((button, idx) => {
    button.style.display = 'none'
  })

  enableClick1()
}


//Just a helper function
function helpStart1(e) {
  addImageAsFirstPlayer(e.target)
}

//firstPlayer
function addImageAsFirstPlayer(element) {
  if (element == 'robot') {

    //robot's turn
    //make it a bit smarter
    if (arr.includes(5)) {
      if (Math.random() > 0.5) {
          var rndInt = arr.indexOf(5)
          var chosenElementId = `box5`
      } else {
        var rndInt = Math.floor(Math.random() * arr.length)
        var chosenElementId = `box${arr[rndInt]}`
      }
    } else {
      var rndInt = Math.floor(Math.random() * arr.length)
      var chosenElementId = `box${arr[rndInt]}`
    }
    
    chosenElement = document.querySelector(`#${chosenElementId}`)
    let img = document.createElement('img')

    img.setAttribute('src', 'cross.jpg')
    img.className = 'gameImage'

    chosenElement.appendChild(img)

    let id = parseInt(chosenElementId.charAt(3))

    coordinates = getCoordinates(id)
    let x = coordinates[0]
    let y = coordinates[1]

    mock[x][y] = 0

    arr.splice(rndInt, 1)
  }


  //If person clicks on used box
  if (element.className == 'gameImage') {
    return
  }

  if (count%2 === 1) {
    //person's turn
    let img = document.createElement('img')
    img.setAttribute('src', 'tick.jpg')
    img.className = 'gameImage'

    element.appendChild(img)

    let id = parseInt(element.id.charAt(3))
    let position = arr.indexOf(id)

    coordinates = getCoordinates(id)
    let x = coordinates[0]
    let y = coordinates[1]

    mock[x][y] = 1

    arr.splice(position, 1)
  } 

  count ++

  //check if game is over
  if(checkGameOver()) {
    resetHelper1()
    return false
  }

  //Call robot to play after player
  if (count%2 === 0 && count != 10) {
    disableClick1()
    setTimeout(function() {addImageAsFirstPlayer('robot')}, 500)
    setTimeout(enableClick1, 499)
    return false
  }

  if (arr.length === 0) {
    tie()
    resetHelper1()
    return false
  }

  //testing
  return false
}

//helper function
function getCoordinates(id) {
  let x
  let y

  if (id/3 <= 1) {
    x = 0
  } else if (id/3 <= 2) {
    x = 1
  } else if (id/3 <= 3) {
    x = 2
  }

  if (id%3 == 0) {
    y = 2
  } else if (id%3 == 1) {
    y = 0
  } else if (id%3 == 2) {
    y = 1
  }

  return [x, y]
}


function resetHelper1() {
  disableClick1()
  reset.style.display = 'inline-block'

  window.scrollTo(0, document.body.scrollHeight)

  //reset webpage once button is clicked
  reset.addEventListener('click', () => {
    images = document.querySelectorAll('.gameImage')
    images.forEach((img, idx) => {
      img.remove()
    })

    count = 1
    arr = [1,2,3,4,5,6,7,8,9]
    grid.style.display = 'none'
    reset.style.display = 'none'
    mock = [[10, 10, 10],[10, 10, 10],[10, 10, 10]]

    document.querySelectorAll('button').forEach((button, idx) => {
      button.style.display = 'inline-block'
    })

    document.querySelector('.winLose').innerHTML = ''

    reset.style.display = 'none'
  })
}

//check if game is over
function checkGameOver() {

  //check for player's win
  //check horizontal
  for (i = 0; i < 3; i ++) {
    if (mock[i][0] === 1 && mock[i][1] === 1 && mock[i][2] === 1) {
      youWin()
      return true
    }
  }

  //check vertical
  for (i = 0; i < 3; i ++) {
    if (mock[0][i] === 1 && mock[1][i] === 1 && mock[2][i] === 1) {
      youWin()
      return true
    }
  }

  //check diagonal
  if (mock[0][0] === 1 && mock[1][1] === 1 && mock[2][2] === 1) {
    youWin()
    return true
  }

  if (mock[0][2] === 1 && mock[1][1] === 1 && mock[2][0] === 1) {
    youWin()
    return true
  }
  

  //check for robot's win
  //check horizontal
  for (i = 0; i < 3; i ++) {

    if (mock[i][0] === 0 && mock[i][1] === 0 && mock[i][2] === 0) {
      youLose()
      return true
    }
  }

  //check vertical
  for (i = 0; i < 3; i ++) {
    if (mock[0][i] === 0 && mock[1][i] === 0 && mock[2][i] === 0) {
      youLose()
      return true
    }
  }

  //check diagonal
  if (mock[0][0] === 0 && mock[1][1] === 0 && mock[2][2] === 0) {
    youLose()
    return true
  }

  if (mock[2][0] === 0 && mock[1][1] === 0 && mock[0][2] === 0) {
    youLose()
    return true
  }

  return false

}

function youWin() {
  document.querySelector('.winLose').innerHTML = 'You Won!!!'
}

function youLose() {
  document.querySelector('.winLose').innerHTML = 'You Lost and I won!'
}

function tie() {
  document.querySelector('.winLose').innerHTML = 'It was a tie.'
}


//The code below is very similar to above, but for playing as a 2nd player
function startGameAsSecondPlayer() {
  grid.style.display = 'flex'
  document.querySelectorAll('button').forEach((button, idx) => {
    button.style.display = 'none'
  })
  
  setTimeout(function() {addImageAsSecondPlayer('robot')}, 500)
  setTimeout(enableClick2, 499)
  
}


//Just a helper function
function helpStart2(e) {
  addImageAsSecondPlayer(e.target)
}

function addImageAsSecondPlayer(element) {
  if (element == 'robot') {

    //robot's turn
    if (arr.includes(5)) {
      if (Math.random() > 0.5) {
          var rndInt = arr.indexOf(5)
          var chosenElementId = `box5`
      } else {
        var rndInt = Math.floor(Math.random() * arr.length)
        var chosenElementId = `box${arr[rndInt]}`
      }
    } else {
      var rndInt = Math.floor(Math.random() * arr.length)
      var chosenElementId = `box${arr[rndInt]}`
    }

    chosenElement = document.querySelector(`#${chosenElementId}`)
    let img = document.createElement('img')

    img.setAttribute('src', 'tick.jpg')
    img.className = 'gameImage'

    chosenElement.appendChild(img)

    let id = parseInt(chosenElementId.charAt(3))

    coordinates = getCoordinates(id)
    let x = coordinates[0]
    let y = coordinates[1]

    mock[x][y] = 0

    arr.splice(rndInt, 1)
  }


  //If person clicks on used box
  if (element.className == 'gameImage') {
    return
  }

  if (count%2 === 0) {

    //person's turn
    let img = document.createElement('img')
    img.setAttribute('src', 'cross.jpg')
    img.className = 'gameImage'

    element.appendChild(img)

    let id = parseInt(element.id.charAt(3))
    let position = arr.indexOf(id)

    coordinates = getCoordinates(id)
    let x = coordinates[0]
    let y = coordinates[1]

    mock[x][y] = 1

    arr.splice(position, 1)

  } 

  count ++

  //check if game is over
  if(checkGameOver()) {
    resetHelper2()
    return false
  }

  //Call robot to play after player
  if (count%2 === 1 && count != 10) {

    disableClick2()
    setTimeout(function() {addImageAsSecondPlayer('robot')}, 500)
    setTimeout(enableClick2, 499)

    return false
  }

  //it runs this code twice sometimes...
  //solved! due to no return false statement
  //previously
  if (arr.length === 0) {
    tie()
    resetHelper2()
    return false
  }
}

function resetHelper2() {
  disableClick2()
  reset.style.display = 'inline-block'

  window.scrollTo(0, document.body.scrollHeight)

  reset.addEventListener('click', () => {
    images = document.querySelectorAll('.gameImage')
    images.forEach((img, idx) => {
      img.remove()
    })

    count = 1
    arr = [1,2,3,4,5,6,7,8,9]
    grid.style.display = 'none'
    reset.style.display = 'none'
    mock = [[10, 10, 10],[10, 10, 10],[10, 10, 10]]

    document.querySelectorAll('button').forEach((button, idx) => {
      button.style.display = 'inline-block'
    })

    document.querySelector('.winLose').innerHTML = ''

    reset.style.display = 'none'
  })

}

function disableClick1() {
  boxes.forEach((box, idx) => {
    box.removeEventListener('click', helpStart1)
  })
}

function enableClick1() {
  boxes.forEach((box, idx) => {
    box.addEventListener('click', helpStart1)
  })
}

function disableClick2() {
  boxes.forEach((box, idx) => {
    box.removeEventListener('click', helpStart2)
  })
}

function enableClick2() {
  boxes.forEach((box, idx) => {
    box.addEventListener('click', helpStart2)
  })
}


// Make machine play itself
function trainFirstPlayerMode(n) {
  //make ai play n games agaisnt itself

  for (let j = 0; j < n; j ++) {
    document.querySelector('#firstPlayer').click()

    //choose box as 1st player
    while (arr.length != 0 && checkGameOver() == false) {
    let rndInt = Math.floor(Math.random() * arr.length)
    let chosenElementId = `box${arr[rndInt]}`
    let chosenElement = document.querySelector(`#${chosenElementId}`)
    let img = document.createElement('img')

    img.setAttribute('src', 'tick.jpg')
    img.className = 'gameImage'

    chosenElement.appendChild(img)

    let id = parseInt(chosenElementId.charAt(3))

    coordinates = getCoordinates(id)
    let x = coordinates[0]
    let y = coordinates[1]

    mock[x][y] = 1

    arr.splice(rndInt, 1)

    //wait for robot to play before continuing
    if(checkGameOver()) {
      break
    }

    if(arr.length == 0) {
      tie()
      break
    }

    count ++
    addImageAsFirstPlayer('robot')
  }

    resetHelper1()
    reset.click()
  }

  console.log(`Finished Training ${n} times`)
  
}

// trainFirstPlayerMode(100)














// class ai() {

//   constructor() {
//     //maps state to action
//     this.dict = {}
//   }

//   aiMakesMove(state, action) {
//     this.dict[state] = action
//   }

//   chooseFromBestAvailableAction(state) {
//     let availableActions = this.dict[state]
//     let bestAction = availableActions
//   }

// }