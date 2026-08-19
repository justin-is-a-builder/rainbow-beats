import { StateMachine } from './core/state-machine.js';
import { State } from './core/state.js';

export let gameStateMachine: StateMachine;

export function createGameStateMachine(initialState: State, ...initialArguments: any[]) {
  gameStateMachine = new StateMachine(initialState, ...initialArguments);
}
