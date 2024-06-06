const prompt = require('prompt-sync')({sigint: true});

const hat = '^';
const hole = 'O';
const fieldCharacter = '░';
const pathCharacter = '*';

class Field {
  constructor(field = [[]]) {
    this.field = field;
    this.positionX = 0;
    this.positionY = 0;
    this.gameActive = false;
    this.field[0][0] = pathCharacter;
  }

  // Generate randomly filled field
  static generateField(height, width, percOfHoles) {
    const generatedField = [];
    for (let i = 0; i < height; i++) {
      generatedField[i] = [];
      for (let j = 0; j < width; j++) {
        generatedField[i][j] = fieldCharacter;
      }
    }

    // Generate random positions
    const randomPositionX = () => Math.floor(Math.random() * height);
    const randomPositionY = () => Math.floor(Math.random() * width);

    // Place hat on grid, not on initial pathCharacter space
    let randomX, randomY;
    do {
          randomX = randomPositionX();
          randomY = randomPositionY();
        } while (generatedField[randomX][randomY] != fieldCharacter);
        generatedField[randomX][randomY] = hat;

    // Place holes, not on hat, pathCharacter or other hole
    const numOfHoles = (height * width) * (percOfHoles / 100);
    for (let i = 0; i < numOfHoles; i++) {
      do {
        randomX = randomPositionX();
        randomY = randomPositionY();
      } while (generatedField[randomX][randomY] != fieldCharacter);
      generatedField[randomX][randomY] = hole;
    }

    return generatedField;
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

const myField = new Field(Field.generateField(10, 10, 5));
myField.playGame();