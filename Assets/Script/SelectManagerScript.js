﻿#pragma strict
public var selected : int;			// holder for the selected level index
public var objs : GameObject[]; 	// array to hold all the "buttons"
public var spriteHolder;			// Placeholder for changing sprites between two options
public var selectHolder : GameObject; /////////////////////////////////////////////////////NECESSARY FOR LVL SELECTION

function Start () {
	selected = 0; 	// preset to first object being selected
	spriteHolder = objs[0].GetComponent(SpriteRenderer).sprite; //sets the sprite of the preselected "button"
	selectHolder = GameObject.CreatePrimitive(PrimitiveType.Cube);/////////////////////////////////////////////////////NECESSARY FOR LVL SELECTION
}

function Update () {
	// TO DO: Check state and use key handlers accordingly

	if (Input.GetKeyDown(KeyCode.RightArrow) && selected <2){

		spriteHolder = objs[selected].GetComponent(SpriteRenderer).sprite; //saves left side sprite
		objs[selected].GetComponent(SpriteRenderer).sprite = objs[selected+1].GetComponent(SpriteRenderer).sprite; //changes left's sprite to the one from teh right
		selected ++; 
		objs[selected].GetComponent(SpriteRenderer).sprite = spriteHolder; //sets the right's sprite to the holder's (left's original)

	}
	else if (Input.GetKeyDown(KeyCode.LeftArrow) && selected >0){

		spriteHolder = objs[selected].GetComponent(SpriteRenderer).sprite; //saves right side sprite
		objs[selected].GetComponent(SpriteRenderer).sprite = objs[selected-1].GetComponent(SpriteRenderer).sprite;//changes right's sprite to the one from teh left
		selected --;
		objs[selected].GetComponent(SpriteRenderer).sprite = spriteHolder;//sets the left's sprite to the holder's (right's original)
	}
	selectHolder.transform.position = new Vector3(selected, 0, -10);/////////////////////////////////////////////////////NECESSARY FOR LVL SELECTION
	// LEVEL lOAD SELECTION----------------------------------------------------------------
	// currently will just load MainGame regardless of selection
	if (Input.GetKeyDown(KeyCode.Return)){
		DontDestroyOnLoad(selectHolder);/////////////////////////////////////////////////////NECESSARY FOR LVL SELECTION
	    GameObject.Find("MenuManager").GetComponent(MenuScript).ChangeScene(1);
	}

}
