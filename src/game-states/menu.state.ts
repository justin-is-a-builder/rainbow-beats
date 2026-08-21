import { State } from '@/core/state.js';
import { audioEngine } from '@/core/audio-engine.js';
import { drawEngine } from '@/core/draw-engine.js';
import { controls } from '@/core/controls.js';
import { gameStateMachine } from '@/game-state-machine.js';
import { gameState } from './game.state.js';

class MenuState implements State {
  private isStartSelected = true;

  onUpdate() {
    const xCenter = drawEngine.context.canvas.width / 2;
    drawEngine.drawText('Menu', 80, xCenter, 90);
    drawEngine.drawText('Start Game', 60, xCenter, 600, this.isStartSelected ? 'white' : 'gray');
    drawEngine.drawText('Toggle Fullscreen', 60, xCenter, 700, this.isStartSelected ? 'gray' : 'white');
    this.updateControls();
  }

  updateControls() {
    if ((controls.isUp && !controls.previousState.isUp)
      || (controls.isDown && !controls.previousState.isDown)) {
      this.isStartSelected = !this.isStartSelected;
    }

    if (controls.isConfirm && !controls.previousState.isConfirm) {
      if (this.isStartSelected) {
        gameStateMachine.setState(gameState);
        audioEngine.unlock();
        audioEngine.play([]);
      } else {
        this.toggleFullscreen();
      }
    }
  }

  toggleFullscreen() {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
    } else {
      document.exitFullscreen();
    }
  }
}

export const menuState = new MenuState();
