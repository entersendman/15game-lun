import React, { Component } from 'react';
import './Game.scss'
// require('./Game.scss');


const vectors = {37:[0, 1], 38:[1, 0], 39:[0, -1], 40:[-1, 0]}
class Game extends Component {
	constructor(props){
		super(props)
		this.sortedArray = [[1, 2, 3, 4], [5, 6, 7, 8], [9, 10, 11, 12], [13, 14, 15, '']]
		this.state = {
			array: [[1, 2, 3, 4], [5, 6, 7, 8], [9, 10, 11, 12], [13, 14, 15, '']],
			arrow: '',
			emptyCell: [3,3]
		}
		this.shuffleArray = this.shuffleArray.bind(this);
		this.keyboardPressedHandler = this.keyboardPressedHandler.bind(this);
		this.moveCell = this.moveCell.bind(this);
		this.findEmptyCell = this.findEmptyCell.bind(this);
		this.checkSort = this.checkSort.bind(this)
	}
	shuffleArray = () => {
		const shuffledArray = [...this.state.array];
		for (var i = 0; i < shuffledArray.length; i++) {
			const j = Math.floor(Math.random() * (i + 1));
			[shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
			for (var x = 0; x < shuffledArray[i].length; x++){
				const y = Math.floor(Math.random() * (x + 1));
				[shuffledArray[i][x], shuffledArray[i][y]] = [shuffledArray[i][y], shuffledArray[i][x]];
			}
		}
		this.setState({
			array: shuffledArray
		}, function () {
			this.findEmptyCell();
		})
		addEventListener('keydown', this.keyboardPressedHandler)
	}
	findEmptyCell = () => {
		const arr = [...this.state.array];
		let emptyCell = [];
		for (let i = 0; i < arr.length; i++){
			for(let j = 0; j < arr[i].length; j++){
				if(arr[i][j] === ''){
					emptyCell = [i,j]
				}
			}
		}
		this.setState({
			emptyCell: emptyCell
		})
	}
	keyboardPressedHandler(e){
		this.setState({
			arrow: e.keyCode
		})
		this.moveCell();
	}
	moveCell = () => {
		const vector = [
			...vectors[this.state.arrow]
		]
		const arr = [...this.state.array]
		const emptyCell = this.state.emptyCell
		let x = emptyCell[0] + vector[0];
		let y = emptyCell[1] + vector[1];
		if(x >= 0 && y >= 0 && y < 4 && x < 4){
			[arr[emptyCell[0]][emptyCell[1]], arr[x][y]] = [arr[x][y], arr[emptyCell[0]][emptyCell[1]]];
			this.setState({
				array: arr,
				emptyCell: [x,y]
			}, function () {
				this.checkSort();
			})
		}
	}
	checkSort = () => {
		let arr = [...this.state.array]
		let similarity = 0;
		for (let i = 0; i < arr.length; i++){
			for(let j = 0; j < arr[i].length; j++){
				if (arr[i][j] === this.sortedArray[i][j]){
					similarity++;
				}
			}
		}
		if(similarity === 16){
			alert('Congratulation! You win!');
		}
	}
	render (){
		const { array } = this.state;
		return(
			<div className='wrapper'>
				<div className='gameArea'>
					{array.map(row => (
						row.map(cell => (
							<div key={cell}
							     className={
							     	cell === '' ? 'emptyCell' : 'cell'
							     }>
								{cell}
							</div>
						))
					))}
				</div>
				<button onClick={this.shuffleArray} className='shuffleButton'>Shuffle</button>
			</div>
		)}
}
export default Game;