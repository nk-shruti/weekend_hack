//Connect Four
var n;
var x;
var turn=1;
//get it from the html page:
//n = localStorage.getItem("level");
//x = localStorage.getItem("connect");
n = 4;
x = 4;
//declare a 2D array:
var a = new Array(n);
for (var i = 0; i < n; i++) {
  a[i] = new Array(n);
}
//initialize the array:
for(i=0;i<n;i++)
	for(j=0;j<n;j++)
		a[i][j] = 0;
var me = 1;
var comp = -1;
//n X n matrix, connect x.
function createBoard(n)
{
	//create the board dynamically
	for(var i=0;i<n;i++)
	{
		for(var j=0;j<n;j++)
		{
			var p = document.createElement("div");
			p.style.position="absolute";
			p.style.left= 6 + j + j*(500/n - n) + "px";
			p.style.top = 6 + i + i*(400/n - n) + "px";
			p.style.width = Math.floor(500/n) - n + "px";
			p.style.height = Math.floor(400/n) - n + "px";
			p.style.marginLeft="auto";
			p.style.marginTop="auto";
			//p.setAttribute("id",(10*i+j));
			p.id=10*i+j;
			//p.style.border="1px solid black;"
			p.style.background="yellow";
			container.appendChild(p);


		}
	}
}
createBoard(4);
window.onkeypress = function(event)
{	
	if(turn==1)
	{

		e=event.keyCode;
		if(e==49)
		{
			//alert('1');
			user(0);
		}
		else
		if(e==50)
		{
			//alert('2');
			user(1);
			
		}
		else
			if(e==51)
			{
				//alert('3');
				user(2);
			}
		else 
			if(e==52)
			{
				//alert('4');
				user(3)
			}
		else alert("Please do enter one of 1 2 3 4. Limited time only is there.");
	}
}

function user(num)
{
	alert(num);
	var row = push(num,me,n,x);
	if(row==-1)
	{
		alert("Invalid input. Please don't waste time.");

	}
	else 
	{
		turn = 0;
		var p = 10*row+num;
		document.getElementById(p).style.backgroundColor="red";
		a[p/10][num] = me;
		if(check(row,num,me,n,x)==true) 
			alert("YAY! You won.");
		else {alert("Keep playing");
			computers(n,x);}

	}
}
//on clicking the column, the coin falls into the first empty spot from the bottom:
function push(col,player,n,x)
{
	var c = col;
	var i;
	for(i=n-1;i>=0;i--)
	{
		if(a[i][c]==0)
		{
			a[i][c] = player;
			return i;
		}
	}
	return -1;
}

function check(row,col,player,n,x)
{
	if(checkcol(row,col,player,n,x))
		return true;
	else if(checkrow(row,col,player,n,x))
		return true;
	/*else if(checkdiag(row,col,player,n,x))
		return true;*/
	else return false;
}
function checkcol(row,col,player,n,x)
{
	var flag=1;
	for(var i=row;i<row+x;i++)
	{
		if(i>n-1)
		{
			flag = 0;
			break;
		}
		if(a[i][col]!=player)
		{
			flag = 0;
			break;
		}
	}
	if(flag==1) return true;
	else return false;
}
function checkrow(row,col,player,n,x)
{
	var flag = 1;
	for(var i = col-(x-1);i<=col;i++)
	{
		if(i>=0)
			if(a[i][j]==a[i][j+1] && a[i][j]==player && j<n)
				if(a[i][j+1]==a[i][j+2] && j<n)
					if(a[i][j+2]==a[i][j+3] && j<n)
						return true;
	}
	return false;

}
/*
function checkdiag(row,col,player,n,x)
{
	//non-main diagonal:
	var i,j;
	if(row<x-1)
		return false;
	if(col<x-1)
		return false;
	for(i = row+x-1,j=col-x+1;i>=row;i--,j++)
	{
		if(a[i][j]==a[i-1][j+1] && a[i][j]==player)
			if(a[i-1][j+1]==a[i-2][j+2])
				if(a[i-2][j+2]==a[i-3][j+3])
					return true;
	}
	//main diagonal
	for(i = row-x+1,j=col-x+1;i<=row;i++,j++)
	{
		if(a[i][j]==a[i+1][j+1] && a[i][j]==player)
			if(a[i+1][j+1]==a[i+2][j+2])
				if(a[i+2][j+2]==a[i+3][j+3])
					return true;

	}
	return false;
}*/
function computers(n,x)
{
	alert("into first stupid function");
	var p = makemove(n,x)
	if(p==-1) makemove(n,x);
	else 
	{
		turn =1;
		document.getElementById(p).style.backgroundColor="black";
		a[p/10][p%10] = comp;
		if(check(p/10,p%10,me,n,x)==true) 
			alert("OH NO! You LOST.");

	}
}
	var m;

//computer deciding
function makemove(n,x)
{
	alert("into this stupid function");
	return 0;
	for(var i=0;i<n;i++)
	{
		for(var j=n-1;j>=0;j++)
		{
			if(a[i][j]==0)
			{
				if(check(i,j,comp,n,x-1))
					{
						m = push(j,-1,n,x);
						if(m==-1) continue;
						else return 10*m+j;
					}
				if(check(i,j,me,n,x-1))
					{
						m = push(j,-1,n,x);
						if(m==-1) continue;
						else return 10*m+j;
					}
				for(var k=x-2;k>=1;k--)
				{
					if(check(i,j,comp,n,k))
					{
						m = push(j,-1,n,x);
						if(m==-1) continue;
						else return 10*m+j;
					}

				}
				for(var k = x-2;k>=1;k--)
				{
					if(check(i,j,me,n,k))
					{
						m = push(j,-1,n,x);
						if(m==-1) continue;
						else return 10*m+j;
					}

				}

			
			}
		}

	}
	m=push(Math.random()*(n-1),j,comp,n,l);
	if(m==-1) return m;
						else return 10*m+j;
}
