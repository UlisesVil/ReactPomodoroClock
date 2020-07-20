(this.webpackJsonppomodoroclock=this.webpackJsonppomodoroclock||[]).push([[0],{10:function(e,t,a){e.exports=a(16)},15:function(e,t,a){},16:function(e,t,a){"use strict";a.r(t);var i=a(0),n=a.n(i),r=a(8),s=a.n(r),o=(a(15),a(2)),l=a(1),c=a(3),h=a(4),m=a(6),u=a(5),b=a(9),d=a.n(b),p=function(e){Object(m.a)(a,e);var t=Object(u.a)(a);function a(){return Object(c.a)(this,a),t.apply(this,arguments)}return Object(h.a)(a,[{key:"render",value:function(){return n.a.createElement("div",{className:"length-control"},n.a.createElement("div",{id:this.props.titleID},this.props.title),n.a.createElement("button",{id:this.props.minID,className:"btn-level",value:"-",onClick:this.props.onClick},n.a.createElement("i",{className:"fa fa-arrow-down fa-2x"})),n.a.createElement("div",{id:this.props.lengthID,className:"btn-level"},this.props.length),n.a.createElement("button",{id:this.props.addID,className:"btn-level",value:"+",onClick:this.props.onClick},n.a.createElement("i",{className:"fa fa-arrow-up fa-2x"})))}}]),a}(n.a.Component),v=function(e){Object(m.a)(a,e);var t=Object(u.a)(a);function a(e){var i;return Object(c.a)(this,a),(i=t.call(this,e)).state={brkLength:5,seshLength:25,timerState:"stopped",timerType:"Session",timer:1500,intervalID:"",alarmColor:{color:"white"}},i.setBrkLength=i.setBrkLength.bind(Object(l.a)(i)),i.setSeshLength=i.setSeshLength.bind(Object(l.a)(i)),i.lengthControl=i.lengthControl.bind(Object(l.a)(i)),i.timerControl=i.timerControl.bind(Object(l.a)(i)),i.beginCountDown=i.beginCountDown.bind(Object(l.a)(i)),i.decrementTimer=i.decrementTimer.bind(Object(l.a)(i)),i.phaseControl=i.phaseControl.bind(Object(l.a)(i)),i.warning=i.warning.bind(Object(l.a)(i)),i.buzzer=i.buzzer.bind(Object(l.a)(i)),i.switchTimer=i.switchTimer.bind(Object(l.a)(i)),i.clockify=i.clockify.bind(Object(l.a)(i)),i.reset=i.reset.bind(Object(l.a)(i)),i}return Object(h.a)(a,[{key:"setBrkLength",value:function(e){this.lengthControl("brkLength",e.currentTarget.value,this.state.brkLength,"Session")}},{key:"setSeshLength",value:function(e){this.lengthControl("seshLength",e.currentTarget.value,this.state.seshLength,"Break")}},{key:"lengthControl",value:function(e,t,a,i){var n;if("runing"!==this.state.timerState)if(this.state.timerType===i)"-"===t&&1!==a?this.setState(Object(o.a)({},e,a-1)):"+"===t&&60!==a&&this.setState(Object(o.a)({},e,a+1));else if("-"===t&&1!==a)this.setState((n={},Object(o.a)(n,e,a-1),Object(o.a)(n,"timer",60*a-60),n));else if("+"===t&&60!==a){var r;this.setState((r={},Object(o.a)(r,e,a+1),Object(o.a)(r,"timer",60*a+60),r))}}},{key:"timerControl",value:function(){"stopped"===this.state.timerState?(this.beginCountDown(),this.setState({timerState:"runing"})):(this.setState({timerState:"stopped"}),this.state.intervalID&&this.state.intervalID.clear())}},{key:"beginCountDown",value:function(){var e=this;this.setState({intervalID:d()((function(){e.decrementTimer(),e.phaseControl()}),1e3)})}},{key:"decrementTimer",value:function(){this.setState({timer:this.state.timer-1})}},{key:"phaseControl",value:function(){var e=this.state.timer;if(this.warning(e),this.buzzer(e),e<0)"Session"==this.state.timerType?(this.state.intervalID&&this.state.intervalID.clear(),this.beginCountDown(),this.switchTimer(60*this.state.brkLength,"Break")):(this.state.intervalID&&this.state.intervalID.clear(),this.beginCountDown(),this.switchTimer(60*this.state.seshLength,"Session"))}},{key:"warning",value:function(e){e<61?this.setState({alarmColor:{color:"#a50d0d"}}):this.setState({alarmColor:{color:"white"}})}},{key:"buzzer",value:function(e){0===e&&this.audioBeep.play()}},{key:"switchTimer",value:function(e,t){this.setState({timer:e,timerType:t,alarmColor:{color:"white"}})}},{key:"clockify",value:function(){var e=Math.floor(this.state.timer/60),t=this.state.timer-60*e;return(e=e<10?"0"+e:e)+":"+(t=t<10?"0"+t:t)}},{key:"reset",value:function(){this.setState({brkLength:5,seshLength:25,timerState:"stopped",timerType:"Session",timer:1500,intervalID:"",alarmColor:{color:"white"}}),this.state.intervalID&&this.state.intervalID.clear(),this.audioBeep.pause(),this.audioBeep.currentTime=0}},{key:"render",value:function(){var e=this;return n.a.createElement("div",null,n.a.createElement("div",{className:"main-title"},"Pomodoro Clock"),n.a.createElement(p,{titleID:"break-label",minID:"break-decrement",addID:"break-increment",lengthID:"break-length",title:"Break Length",onClick:this.setBrkLength,length:this.state.brkLength}),n.a.createElement(p,{titleID:"session-label",minID:"session-decrement",addID:"session-increment",lengthID:"session-length",title:"Session Length",onClick:this.setSeshLength,length:this.state.seshLength}),n.a.createElement("div",{className:"timer",style:this.state.alarmColor},n.a.createElement("div",{className:"timer-wrapper"},n.a.createElement("div",{id:"timer-label"},this.state.timerType),n.a.createElement("div",{id:"time-left"},this.clockify()))),n.a.createElement("div",{className:"timer-control"},n.a.createElement("button",{id:"start_stop",onClick:this.timerControl},n.a.createElement("i",{className:"fa fa-play fa-2x"}),n.a.createElement("i",{className:"fa fa-pause fa-2x"})),n.a.createElement("button",{id:"reset",onClick:this.reset},n.a.createElement("i",{className:"fa fa-refresh fa-2x"}))),n.a.createElement("audio",{id:"beep",preload:"auto",src:"https://raw.githubusercontent.com/freeCodeCamp/cdn/master/build/testable-projects-fcc/audio/BeepSound.wav",ref:function(t){e.audioBeep=t}}))}}]),a}(n.a.Component);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));s.a.render(n.a.createElement(n.a.StrictMode,null,n.a.createElement(v,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))}},[[10,1,2]]]);
//# sourceMappingURL=main.08b8788b.chunk.js.map