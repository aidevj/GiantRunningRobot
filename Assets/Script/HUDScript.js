#pragma strict
public var PlayerObj : GameObject;				// GameObject: Player object from which to refer to HP and BoosterGauge
public var HPBarObj : GameObject;				// Visible HP Bar object
public var BoosterGaugeObj : GameObject;		// Visible Booster Gauge object
public var HPNumTextObj : GameObject;

private var player;
private var HPnumtext;

// HP BAR ATTRIBUTES
private var initialSizeHP : int;				// Used for size scaling

// BOOSTER GAUGE ATTRIBUTES

function Start () {
	// Store object's script components in a variable to be used
	player = PlayerObj.GetComponent(playerScript);		///////
	HPnumtext = HPNumTextObj.GetComponent(UI.Text);		///////

}

function Update () {
	// Check Player HP and apply it to bar

	// change text to show HP number on bar
	//txt.text="Score : " + currentscore;
	//HPnumtext.text = player.HP;


	// Check State of player--if gliding, deplete Player's BoosterGauge count gradually

	// Otherwise, have it constantly increasing (until max)
}
