#pragma strict
public var selected : int;			//holder for the selected level index
public var objs : GameObject[]; 	//array to hold all the "buttons"
public var spriteHolder;			//Placeholder for changing sprites between two options

function Start () {
	selected = 0; 	//preset to first object being selected
	spriteHolder = objs[0].GetComponent(Image).sprite; //sets the sprite of the preselected "button"
}

function Update () {
	if (Input.GetKeyDown(KeyCode.DownArrow) && selected < objs.length-1){

		spriteHolder = objs[selected].GetComponent(Image).sprite; //saves top side sprite
		objs[selected].GetComponent(Image).sprite = objs[selected+1].GetComponent(Image).sprite; //changes top's sprite to the one from teh bottom
		selected ++; 
		objs[selected].GetComponent(Image).sprite = spriteHolder; //sets the bottoms's sprite to the holder's (up's original)

	}
	else if (Input.GetKeyDown(KeyCode.UpArrow) && selected >0){

		spriteHolder = objs[selected].GetComponent(Image).sprite; //saves bottom side sprite
		objs[selected].GetComponent(Image).sprite = objs[selected-1].GetComponent(Image).sprite;//changes bottom's sprite to the one from teh up
		selected --;
		objs[selected].GetComponent(Image).sprite = spriteHolder;//sets the up's sprite to the holder's (bottom's original)
	}

	if (Input.GetKeyDown(KeyCode.Return)){
		if(selected == 0 && objs.length == 2)
	    	GameObject.Find("MenuManager").GetComponent(MenuScript).ChangeScene(1);
		else if(selected == 0 && objs.length == 3)
	    	GameObject.Find("MenuManager").GetComponent(MenuScript).UnloadScene(2);
	    else if(selected == 1)
	    	GameObject.Find("MenuManager").GetComponent(MenuScript).ChangeScene(4);
	    else
	    	GameObject.Find("MenuManager").GetComponent(MenuScript).ChangeScene(0);
	}

}
