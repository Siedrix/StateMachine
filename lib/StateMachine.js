Class("StateMachine").includes(CustomEventSupport)({
    prototype : {
        _states : [],
        _transition : [],
        _currentState : "",
        _data : {},
        init : function () {
            this._states = [];
            this._transition = [];
            this._data = [];
        },
        addState : function (stateName) {
            this._states.push(stateName);
        },
        getStates : function () {
            return this._states;
        },
        setState : function (state, data) {
            if(this._states.indexOf(state) === -1){
                throw "Invalid state";
            }

            if(this._currentState){
                this.dispatch(this._currentState+"::Leave", this._data);
                this.dispatch(this._currentState+"::"+state, data);
            }

            this._currentState = state;
            this._data = data || null;

            this.dispatch(state+"::Enter", data);
        },
        getCurrentState : function () {
            return this._currentState;
        },
        getCurrentStateData : function () {
            return this._data;
        },
        onEnter : function (state, callback) {
            this.bind(state+"::Enter", callback);
        },
        onLeave : function (state, callback) {
            this.bind(state+"::Leave", callback);
        },
        onTransition : function (from, to, callback) {
            this.bind(from +"::"+to, callback);
        }
    }
});