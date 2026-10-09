/**
 * projects/index.js — the ordered list of projects shown on the site.
 *
 * To add a project: create a file next to this one (copy _template.js),
 * import it below and add it to the array. Order here is display order.
 */

import datetrails from './datetrails'
import pathfindingVisualizer from './pathfinding-visualizer'
import graphPlotter from './graph-plotter'
import sortingAlgorithmVisualizer from './sorting-algorithm-visualizer'
import universalSwitchingTools from './universal-switching-tools'
import tradingBot from './trading-bot'
import countdownTimer from './countdown-timer'
import factorioBlueprintGenerator from './factorio-blueprint-generator'
import interactiveWorldMap from './interactive-world-map'

export const projects = [
  datetrails,
  pathfindingVisualizer,
  graphPlotter,
  sortingAlgorithmVisualizer,
  universalSwitchingTools,
  tradingBot,
  countdownTimer,
  factorioBlueprintGenerator,
  interactiveWorldMap,
]
