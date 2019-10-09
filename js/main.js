let timerDisplay = document.querySelector('#timer')
let sessionTime = document.querySelector('#sessionTime')
let breakTime = document.querySelector('#breakTime')

let startButton = document.querySelector('#start')
let resetButton = document.querySelector('#reset')
let pauseButton = document.querySelector('#pause')
let stopButton = document.querySelector('#stop')

let upSessionTimeButton = document.querySelector('#sessionUp')
let downSessionTimeButton = document.querySelector('#sessionDown')
let upBreakTimeButton = document.querySelector('#breakUp')
let downBreakTimeButton = document.querySelector('#breakDown')

let isPaused = false

const convertSecondsToMinSec = function(seconds) {
    if (seconds < 60) {
        if (seconds < 10) {
            return '00:0' + seconds
        } else {
            return '00:' + seconds
        }
    }
    let m = Math.floor(seconds / 60)
    let s = seconds % 60
    m = m < 10 ? '0' + m : m
    s = s < 10 ? '0' + s : s
    return m + ':' + s
}

let timer = null
let achievement = sessionTime.textContent * 60

const timerStart = function() {
	if (timer != null && !isPaused) {
		return
	} else if (isPaused) {
		let timeRemaining = timerDisplay.textContent

		timeRemaining = Number(timeRemaining.split(':')[0]) * 60 + Number(timeRemaining.split(':')[1])
			
		achievement = Number(timeRemaining)
	}

	if (timer === null) {
		if (isPaused) {
			isPaused = false
			} else {
				achievement = sessionTime.textContent * 60
			}
			timerDisplay.textContent = convertSecondsToMinSec(achievement)
			let x = setInterval(function() {
				achievement -= 1
				timerDisplay.textContent = convertSecondsToMinSec(achievement)
			}, 1000)
		return x
	}
}

const startButtonPressed = function() {
	timer = timerStart()
}
const pauseButtonPressed = function() {
	clearInterval(timer)
	timer = null
	isPaused = true
}
const stopButtonPressed = function() {
	clearInterval(timer)
	timer = null
	isPaused = false
	timerDisplay.textContent = convertSecondsToMinSec(sessionTime.textContent * 60)
}
const resetButtonPressed = function() {
	sessionTime.textContent = 25
	breakTime.textContent = 5
	stopButtonPressed()
}

const upSessionTime = function() {
	if (timer == null) {
		sessionTime.textContent = Number(sessionTime.textContent) + 1
		timerDisplay.textContent = convertSecondsToMinSec(Number(sessionTime.textContent) * 60)
	}
}
const downSessionTime = function() {
	if (timer == null && Number(sessionTime.textContent) > 1) {
		sessionTime.textContent = Number(sessionTime.textContent) - 1
		timerDisplay.textContent = convertSecondsToMinSec(Number(sessionTime.textContent) * 60)
	}
}
const upBreakTime = function() {
	if (timer == null) {
		breakTime.textContent = Number(breakTime.textContent) + 1
	}
}
const downBreakTime = function() {
	if (timer == null && Number(breakTime.textContent) > 1) {
		breakTime.textContent = Number(breakTime.textContent) - 1
	}
}

startButton.addEventListener('click', startButtonPressed)
pauseButton.addEventListener('click', pauseButtonPressed)
stopButton.addEventListener('click', stopButtonPressed)
resetButton.addEventListener('click', resetButtonPressed)

upSessionTimeButton.addEventListener('click', upSessionTime)
downSessionTimeButton.addEventListener('click', downSessionTime)
upBreakTimeButton.addEventListener('click', upBreakTime)
downBreakTimeButton.addEventListener('click', downBreakTime)
