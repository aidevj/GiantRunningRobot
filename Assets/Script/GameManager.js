﻿#pragma strict

public class GameManager extends MonoBehaviour{
    // Prefabs //
    public var playerPrefab : GameObject;
    public var attackBoxPrefab : GameObject;
    public var boosterGaugePrefab : GameObject;
    public var HPBarPrefab : GameObject;
    public var HPBarText: GameObject;	// directrly alter Text component

    // Game Objects //
    // public to be shared across scripts, but not alterable in Inspector
    @HideInInspector
    public var player : GameObject;
    @HideInInspector
   	public var attackBox : GameObject;
   	@HideInInspector
    public var boosterGauge : GameObject;
    @HideInInspector
    public var HPBar : GameObject;


    function Start () {
        // Create Game objects

        // Create Heirarchy----------
        // Player
        //		AttackBox
        //		BoosterGauge
        // HUD
        // 		Background
        //		HPBar
        //--------------------------

        player = Instantiate(playerPrefab, new Vector3(-2.86, 3.55, 0), Quaternion.identity);

        attackBox = Instantiate(attackBoxPrefab, transform.position, Quaternion.identity); // instantiate at position of GM-GO
        attackBox.transform.parent = player.transform;

        boosterGauge = Instantiate(boosterGaugePrefab, transform.position, Quaternion.identity); // instantiate at position of GM-GO
        boosterGauge.transform.parent = player.transform;

        HPBar = Instantiate(HPBarPrefab, transform.position, Quaternion.identity);
        HPBar.transform.parent = GameObject.Find("HUD").transform; // TO DO: change position locally to HUD, to be done in HUDScript?


   }

    function Update () {
    	//attackBox.transform.position = Vector3(1, 0.5, 0);
    }
}
