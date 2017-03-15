#pragma strict
import System.IO;

public class LoadInScript extends MonoBehaviour{
	var lvlArray = new Array();
	//var filePath = "/Levels/lvl1.txt"; //put real path in later
	function Start () {
		lvlArray[0] = DirectoryInfo(Application.dataPath) + "/Levels/level1.txt";
		lvlArray[1] = DirectoryInfo(Application.dataPath) + "/Levels/level2.txt";
		lvlArray[2] = DirectoryInfo(Application.dataPath) + "/Levels/level3.txt";

		ReadFile(0);
	}

	function Update () {
	}

	function ReadFile(lvlNum : int){
		var sr = new File.OpenText(lvlArray[lvlNum]);

		var input = "";
		while(true){
			input = sr.ReadLine();
			if(input == null) { break; }
			Debug.Log("line = " + input);
		}
		sr.Close();
	}

}