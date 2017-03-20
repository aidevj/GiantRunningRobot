#pragma strict
import UnityEngine.SceneManagement;
import UnityEngine.UI;

var btn : Button;
public var target_scene_name : String;		// String: name of Scene the button will load upon click

function Start() {
	// Get Button component and create a event handler
	btn.onClick.AddListener(TaskOnClick);

}

/// Called by event listener
/// Loads the target scene non-asynchronously
function TaskOnClick() {
	Debug.Log("clicked");
	// Close all currently loaded scenes and loads new scene
	//SceneManager.LoadScene(target_scene_name, LoadSceneMode.Single);
}
