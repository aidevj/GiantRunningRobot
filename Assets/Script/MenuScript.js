#pragma strict
import UnityEngine.SceneManagement;
private var gm : GameManager;				// GameManager object: reference of GameManager script

function Start () {

    // Access to game object with GM script
    gm = GameObject.Find("GameManager").GetComponent(GameManager); //ASK BAKER (GameManager doesn't exist in some scenes)
}

/// Change Scene function: called through MenuManager in Button component
/// Closes all other scenes and opens target scenes by ID
public function ChangeScene (targetSceneID : int) {
	Debug.Log("ChangeScene called: #" + targetSceneID);
	SceneManager.LoadScene(targetSceneID, LoadSceneMode.Single);


}

public function AddScene (targetSceneID : int) {
	Debug.Log("AddScene called: #" + targetSceneID);
	SceneManager.LoadScene(targetSceneID, LoadSceneMode.Additive);


}

public function UnloadScene (targetSceneID : int) {
	Debug.Log("UnloadScene called: #" + targetSceneID);
	SceneManager.UnloadSceneAsync(targetSceneID);

	if(targetSceneID == 2){
		gm.currentState = gm.GameState.Active;
	}
}