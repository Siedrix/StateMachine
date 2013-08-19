== StateMaquine

This is a really simple state machine to handle enter, leave and transitions from states.

I think that one page applications should have a app object that handles state, so I'm making this library to test that hypotesis.

=== Usage

Start you app state machine and create the states of you application.

    window.app = new StateMachine();

    app.addState("Live");
    app.addState("Default");

To change the state do

    app.setState("Default",{
            isDefault : true
    });

On state changes you can listen to them in 3 different ways, you can listen when the app enters the state, when the app leaves a state or when the app changes from a state to another specific space with:

__On Enter State__

    app.onEnter("Default", function (data) {
            // Do something here
    });

__On Leave State__

    app.onLeave("Default", function (data) {
            // Do something here
    });

__On Transitions__

    app.onTransition("Default", "Live", function (data) {
            // Do something here
    });
