#pragma strict
import UnityEngine.UI;

private var gm : GameManager;					// GameManager object: reference of GameManager script
public var HPBarObj : GameObject;			// Visible HP Bar object
private var player;
private var playerScript;		// Reference to playerScript component
private var HPnumtext;


function Start () {
	// Store object's script components in a variable to be used
	//player = GameObject.Find("player");		///////
	//playerScript = player.GetComponent(playerScript);

	//HPnumtext = HPNumTextObj.GetComponent(UI.Text);		///////

}

function Update () {
	// Check Player HP and apply it to bar

	// change text to show HP number on bar
	//txt.text="Score : " + currentscore;
	//HPnumtext.text = player.HP;

	// Check State of player--if gliding, deplete Player's BoosterGauge count gradually

	// Otherwise, have it constantly increasing (until max)
}
