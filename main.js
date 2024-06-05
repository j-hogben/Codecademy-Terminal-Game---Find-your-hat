const prompt = require('prompt-sync')({sigint: true});

const hat = '^';
const hole = 'O';
const fieldCharacter = '░';
const pathCharacter = '*';

class Field {
  constructor(field) {
    this.field = field;
    this.positionX = 0;
    this.positionY = 0;
    this.gameActive = false;
    this.field[0][0] = pathCharacter;
  }

  // Extract field from array and print to console
  print() {
    for (let i = 0; i < this.field.length; i++) { 
      console.log(this.field[i].join(''));
    }
  }

  // Check if current position is within field bounds
  isInBounds() {
    return (
      this.positionX >= 0 &&
      this.positionY >= 0 &&
      this.positionX < this.field.length &&
      this.positionY < this.field[0].length
      )
  }

  // Check if current position is the hat
  isHat() {
    return (this.field[this.positionX][this.positionY] === hat);
  }

  // Check if current position is a hole
  isHole() {
    return (this.field[this.positionX][this.positionY] === hole)
  }

  updatePosition() {
    // If out of bounds, print loser message and end game
    if (!this.isInBounds()) {
      console.log('Sorry, you are out of bounds! Game over.')
      this.gameActive = false;

      // If hat found, print winner message and end game
    } else if (this.isHat()) {
        console.log('Congratulations, you win! You have found your hat.');
        this.gameActive = false;

      // If hole found, print loser message and end game
    } else if (this.isHole()) {
        console.log('Sorry, you fell down a hole! Game over.')
        this.gameActive = false;

      // If valid move, make valid move
    } else {
      this.field[this.positionX][this.positionY] = pathCharacter;
    }
  }

  move(input) {
    switch(input) {
      case 'r':
        this.positionY++;
        break;
      case 'l':
        this.positionY--;
        break;
      case 'u':
        this.positionX--;
        break;
      case 'd':
        this.positionX++;
        break;
      default:
        console.log('Invalid move, please try again.');
        break;
    }
  }

  playGame() {
    this.gameActive = true;
    while (this.gameActive) {
      this.print();
      let userMove = prompt('Which way? ').toLowerCase();
      this.move(userMove);
      this.updatePosition();
    }
  }
}

// const myfield = new Field(Field.generateField(8, 20, 20));
// myfield.playGame();

const myField = new Field([
  ['░', '░', '░', '░', '░', '░', '░', '░', '░', '░', '░', '░', '░', '░', '░'], 
  ['░', '░', '░', '^', '░', '░', '░', '░', '░', '░', '░', '░', '░', '░', '░'], 
  ['░', '░', '░', '░', '░', '░', '░', '░', '░', '░', '░', '░', '░', '░', '░'], 
  ['░', '░', '░', '░', '░', '░', '░', '░', '░', '░', '░', '░', '░', '░', '░'], 
  ['░', '░', '░', '░', '░', '░', '░', '░', '░', '░', '░', '░', '░', '░', '░'], 
  ['░', '░', '░', '░', '░', '░', '░', '░', '░', '░', '░', '░', '░', '░', '░'], 
  ['░', '░', '░', '░', '░', '░', '░', '░', '░', '░', '░', '░', '░', '░', '░'], 
  ['░', '░', '░', '░', '░', '░', '░', '░', '░', '░', '░', '░', '░', '░', '░']
]);

myField.playGame();