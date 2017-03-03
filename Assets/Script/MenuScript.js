#pragma strict
import UnityEngine.SceneManagement;

function Start () {
}

/// Change Scene function: called through MenuManager in Button component
/// Closes all other scenes and opens target scenes by ID
function ChangeScene (targetSceneID : int) {
	Debug.Log("ChangeScene called: #" + targetSceneID);
	SceneManager.LoadScene(targetSceneID, LoadSceneMode.Single);


}