import { State } from '@/core/state.js';
import { drawEngine } from '@/core/draw-engine.js';
import { controls } from '@/core/controls.js';
import { gameStateMachine } from '@/game-state-machine.js';
import { menuState } from '@/game-states/menu.state.js';
import { audioEngine } from '@/core/audio-engine.js';

class GameState implements State {
  ballImage = new Image();
  ballSize = 100;
  ballPosition = new DOMPoint(100, 100);
  ballVelocity = new DOMPoint(10, 10);

  constructor() {
    this.ballImage.src = 'ball.png';
  }

  // Make sure ball starts at the same spot when game is entered
  onEnter() {
    this.ballPosition = new DOMPoint(100, 100);
    this.ballVelocity = new DOMPoint(10, 10);
  }

  onUpdate() {
    // Update velocity from controller
    this.ballVelocity.x += controls.inputDirection.x;
    this.ballVelocity.y += controls.inputDirection.y;

    // Check collisions with edges of map
    if (this.ballPosition.x + this.ballSize > drawEngine.canvasWidth || this.ballPosition.x <= 0) {
      this.ballVelocity.x *= -1;
    }

    if (this.ballPosition.y + this.ballSize > drawEngine.canvasHeight || this.ballPosition.y <= 0) {
      this.ballVelocity.y *= -1;
    }

    this.ballPosition.x += this.ballVelocity.x;
    this.ballPosition.y += this.ballVelocity.y;

    // Apply Drag
    this.ballVelocity.x *= 0.99;
    this.ballVelocity.y *= 0.99;

    drawEngine.context.fillStyle = 'blue';
    drawEngine.context.fillRect(0, 0, drawEngine.canvasWidth, drawEngine.canvasHeight);
    drawEngine.context.drawImage(this.ballImage, this.ballPosition.x, this.ballPosition.y, this.ballSize, this.ballSize);

    if (controls.isEscape) {
      gameStateMachine.setState(menuState);
      audioEngine.stop();
    }
  }
}

export const gameState = new GameState();
