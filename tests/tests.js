module( "Basic Module", {
	setup: function() {
		window.app = new StateMachine();

		app.addState("Live");
		app.addState("Default");
	},
	teardown: function() {
		delete window.app;
	}
});

test( "Its Alive", function() {
	ok( StateMachine , "Its Alive!" );
	ok( app , "Its Alive!" );
});


test( "Method" , function() {
	ok( typeof app.bind === "function", "Events::Bind");
	ok( typeof app.unbind === "function", "Events::Unbind");
	ok( typeof app.dispatch === "function", "Events::Dispatch");

	ok( typeof app.addState === "function", "States::AddState");
	ok( typeof app.setState === "function", "States::setState");
	ok( typeof app.getStates === "function", "States::getStates");

	ok( typeof app.getCurrentState === "function", "States::getCurrentState");
	ok( typeof app.getCurrentStateData === "function", "States::getCurrentStateData");

	ok( typeof app.onEnter === "function", "Events::OnEnter");
	ok( typeof app.onLeave === "function", "Events::OnEnter");
});


test("Has states", function () {
	var states = app.getStates();

	ok( _.isArray(states) , "states is an array");
	ok( states.length === 2, "There are 2 states in the app");
	ok( states.indexOf("Live") >= 0, "Live is one of the states");
	ok( states.indexOf("Default") >= 0, "Default is one of the states");
});


test("Set a state", function () {
	app.setState('Default', {
		isDefault : true
	});

	var defaultData = app.getCurrentStateData();

	ok( app.getCurrentState() === "Default", "CurrentState Should be Default");
	ok( typeof defaultData === "object", "CurrentState Should have data");
	ok( defaultData.isDefault, "data.isDefault Should be true");

	app.setState('Live');
	var liveData = app.getCurrentStateData();

	ok( app.getCurrentState() === "Live", "CurrentState Should be Live");
	ok( liveData === null , "Live state Shouldnt have data" );
});


asyncTest("Listen to enter state change", function() {
	expect( 4 );

	app.onEnter("Default", function () {
		ok( true, "Enter to state");
	});

	app.onEnter("Default", function (data) {
		ok( true, "Enter to second bind state");
		ok( typeof data === "object", "has data");
		ok( data.hasData , "has data");
		start();
	});

	app.setState('Default',{
		hasData : true
	});
});


asyncTest("Listen to leave state change", function() {
	expect( 4 );

	app.onLeave("Default", function () {
		ok( true, "Leave to state");
	});

	app.onLeave("Default", function (data) {
		ok( true, "Leave to second bind state");
		ok( typeof data === "object", "has data");
		ok( data.isDefault , "has data");
		start();
	});

	app.setState("Default",{
		isDefault : true
	});
	app.setState("Live",{
		isDefault : false
	});
});

asyncTest("Listen to a transition", function () {
	expect( 4 );

	app.onTransition("Default", "Live", function () {
		ok( true, "Leave to state");
	});

	app.onTransition("Default", "Live", function (data) {
		ok( true, "Leave to second bind state");
		ok( typeof data === "object", "has data");
		ok( data.isDefault === false , "has data");
		start();
	});

	app.setState("Default",{
		isDefault : true
	});
	app.setState("Live",{
		isDefault : false
	});
});

