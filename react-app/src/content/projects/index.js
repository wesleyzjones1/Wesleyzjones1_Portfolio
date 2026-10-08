/**
 * projects/index.js — the ordered list of projects shown on the site.
 *
 * To add a project: create a file next to this one (copy _template.js),
 * import it below and add it to the array. Order here is display order.
 */

import datetrails from './datetrails'
import universalSwitching from './universal-switching'
import tradelab from './tradelab'
import utilityhub from './utilityhub'
import pathfindingVisualizer from './pathfinding-visualizer'
import graphPlotter from './graph-plotter'
import sortingAlgorithmVisualizer from './sorting-algorithm-visualizer'
import countdownTimer from './countdown-timer'
import factorioBlueprintGenerator from './factorio-blueprint-generator'
import interactiveWorldMap from './interactive-world-map'

export const projects = [
  datetrails,
  universalSwitching,
  tradelab,
  utilityhub,
  pathfindingVisualizer,
  graphPlotter,
  sortingAlgorithmVisualizer,
  countdownTimer,
  factorioBlueprintGenerator,
  interactiveWorldMap,
]
