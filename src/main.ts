import Phaser from 'phaser'

import LevelOne from './LevelOne'
import FinishLevel from './FinishLevel'
import WinLevel from './WinLevel'
import PreloaderLevelOne from './PreloaderLevelOne'

const config: Phaser.Types.Core.GameConfig = {
	type: Phaser.AUTO,
	scale:{
		//mode: Phaser.Scale.FIT, review this option to scale canva
		parent: 'app',
		width: 1280,
		height:720,
	},
	physics: {
		default: 'arcade',
		arcade: {
			gravity: { y: 400 },
			debug: false
		},
	},
	scene: [PreloaderLevelOne, LevelOne, FinishLevel, WinLevel],
}

export default new Phaser.Game(config)
