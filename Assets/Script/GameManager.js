#pragma strict

public class GameManager extends MonoBehaviour{
    // Prefabs //
    public var playerPrefab : GameObject;

    // Game objects //
    @HideInInspector
    public var player;


    function Start () {
        // create player
        player = Instantiate(playerPrefab, new Vector3(-2.86, 3.55, 0), Quaternion.identity);
    }

    function Update () {

    }
}
