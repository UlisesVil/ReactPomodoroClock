import React from 'react';
import accurateInterval from 'accurate-interval';

class TimerLengthControl extends React.Component{
    render(){
        return(
            <div className="length-control">
                <div id={this.props.titleID}>
                    {this.props.title}
                </div>
                <button id={this.props.minID}
                        className="btn-level"
                        value="-"
                        onClick={this.props.onClick}>
                    <i className="fas fa-angle-double-down" />                        
                </button>
                <div id={this.props.lengthID}
                     className="btn-level">
                         {this.props.length}
                </div>
                <button id={this.props.addID}
                        className="btn-level"
                        value="+"
                        onClick={this.props.onClick}>
                    <i className="fas fa-angle-double-up" />
                </button>
            </div>
        )
    }
};

class Timer extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            brkLength: 5,
            seshLength: 25,
            timerState:'stopped',
            timerType: 'Session',
            timer: 1500,
            intervalID: '',
            alarmColor: {color:'white'}  
        }

        this.setBrkLength = this.setBrkLength.bind(this);
        this.setSeshLength = this.setSeshLength.bind(this);
        this.lengthControl = this.lengthControl.bind(this);
        this.timerControl = this.timerControl.bind(this);
        this.beginCountDown = this.beginCountDown.bind(this);
        this.decrementTimer = this.decrementTimer.bind(this);
        this.phaseControl = this.phaseControl.bind(this);
        this.warning = this.warning.bind(this);
        this.buzzer = this.buzzer.bind(this);
        this.switchTimer = this.switchTimer.bind(this);
        this.clockify = this.clockify.bind(this);
        this.reset = this.reset.bind(this);
    }

    setBrkLength(e) {
        this.lengthControl('brkLength', e.currentTarget.value,
            this.state.brkLength, 'Session');
    }

    setSeshLength(e) {
        this.lengthControl('seshLength',
        e.currentTarget.value,
        this.state.seshLength, 'Break');
    }

    lengthControl (stateToChange, sign, currentLength, timerType){
        if (this.state.timerState === 'runing') return;
        if(this.state.timerType === timerType){
            if(sign === "-" && currentLength !== 1){
                this.setState({[stateToChange]: currentLength -1});
            }else if (sign === "+" && currentLength !== 60){
                this.setState({[stateToChange]: currentLength + 1});
            }
        }else{
            if ( sign === "-" && currentLength !== 1) {
                this.setState({[stateToChange]: currentLength -1, 
                timer: currentLength * 60 - 60});
            }else if(sign === "+" && currentLength !== 60){
                this.setState({[stateToChange]: currentLength + 1,
                timer: currentLength * 60 + 60});
            }
        }
    }

    timerControl() {
        let control = this.state.timerState === 'stopped' ? (
            this.beginCountDown(),
            this.setState({timerState:'runing'})
        ) : (
            this.setState({timerState: 'stopped'}),
            this.state.intervalID &&
            this.state.intervalID.clear()
        );
    }

    beginCountDown() {
        this.setState({
            intervalID: accurateInterval(()=> {
                this.decrementTimer();
                this.phaseControl();
            }, 1000)
        })
    }

    decrementTimer() {
        this.setState({
            timer:this.state.timer -1
        });
    }

    phaseControl() {
        let timer = this.state.timer;
        this.warning(timer);
        this.buzzer(timer);
    
        //variables "fixit and warn" was added to fix the problem of "==" and send us the error
        //Expected an assignment or function call and instead saw an expression  no-unused-expressions in the compiler
        //and fixed the test 14/29 and 15/29 #Timer section FreecodeCamp test
    
        if (timer < 0) { 
        let fixit = this.state.timerType == 'Session' ? ( 
            this.state.intervalID && this.state.intervalID.clear(),
            this.beginCountDown(),
            this.switchTimer(this.state.brkLength * 60, 'Break')
        ) : (
            this.state.intervalID && this.state.intervalID.clear(),
            this.beginCountDown(),
            this.switchTimer(this.state.seshLength * 60, 'Session')
        );
        }
    }


    warning(_timer) {
        let warn=_timer < 61 ?
        this.setState({
            alarmColor:{color: '#a50d0d'}
        }) :
        this.setState({
            alarmColor:{color: 'white'}
        });
    }

    buzzer (_timer) {
        if (_timer === 0) {
            this.audioBeep.play();
        }
    }

    switchTimer(num, str) {
        this.setState({
          timer: num,
          timerType: str,
          alarmColor: {color: 'white'}
        })
    }

    clockify() {
        let minutes = Math.floor(this.state.timer / 60);
        let seconds = this.state.timer - minutes * 60;
        seconds = seconds < 10 ? '0' + seconds : seconds;
        minutes = minutes < 10 ? '0' + minutes : minutes;
        return minutes + ':' + seconds;
    }

    reset(){
        this.setState({
            brkLength: 5,
            seshLength: 25,
            timerState: 'stopped',
            timerType: 'Session',
            timer: 1500,
            intervalID: '',
            alarmColor: {color: 'white'}
        });
        this.state.intervalID && this.state.intervalID.clear();
        this.audioBeep.pause();
        this.audioBeep.currentTime = 0;
    }


    render(){
       
        return(
            <div id="content">
                <div className = "main-title">
                    Pomodoro Clock
                </div>

                <div id="controls">
                    <div className="controlLeft">
                        <TimerLengthControl
                            titleID= "break-label"
                            minID = "break-decrement"
                            addID = "break-increment"
                            lengthID = "break-length"
                            title = "Break Length"
                            onClick = {this.setBrkLength}
                            length = {this.state.brkLength}
                        />
                    </div>

                    <div className="controlRight">
                        <TimerLengthControl 
                            titleID = "session-label"
                            minID = "session-decrement"
                            addID = "session-increment"
                            lengthID = "session-length"
                            title = "Session Length"
                            onClick = {this.setSeshLength}
                            length = {this.state.seshLength}
                        />
                    </div>
                </div>
                <div className = "timer" style = {this.state.alarmColor}>
                    <div className = "timer-wrapper">
                        <div id="timer-label">
                            {this.state.timerType}
                        </div>
                        <div id='time-left'>
                            {this.clockify()}
                        </div>
                    </div>    
                </div>
                <div className= "timer-control">
                    <button id= "start_stop" onClick={this.timerControl}>
                        <i className = "far fa-play-circle"/>
                        <i className = "far fa-pause-circle"/>    
                    </button>
                    <button id = "reset" onClick = {this.reset}>
                        <i className = "fas fa-history" />
                    </button>
                </div>
                <audio id="beep"
                    preload = "auto"
                    src="https://raw.githubusercontent.com/freeCodeCamp/cdn/master/build/testable-projects-fcc/audio/BeepSound.wav"
                    ref={(audio)=>{this.audioBeep = audio;}}
                />
            </div>
        )
    }
};

export default Timer;
