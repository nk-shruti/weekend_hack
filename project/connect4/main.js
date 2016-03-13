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
	var row;
	row = push(num,me,n,x);
	alert("row"+row);
	if(row==-1)
	{
		alert("Invalid input. Please don't waste time.");

	}
	else 
	{
		turn = 0;
		var p = 10*row+num;
		document.getElementById(p).style.backgroundColor="red";
		a[row][num] = me;
		if(check(row,num,me,n,x)==true) 
			alert("YAY! You won.");
		else {alert("Keep playing");
			computers(n,x);
		}

	}
}
function getrow(col,n)
{
	alert("into getrow");
	var i;
	for(i=n-1;i>=0;i--)
	{
		if(a[i][col]==0)
		{
			alert(i);
			return i;
		}
		
	}
	return -1;

}
//on clicking the column, the coin falls into the first empty spot from the bottom:
function push(col,player,n,x)
{
	var c = col;
	var i;
	i = getrow(col,n);
	if(i==-1) return i;
	else 
	{
		a[i][col] = player;
		return i;
	}
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
			if(a[row][i]==a[row][i+1] && a[row][i]==player && i<n)
				if(a[row][i+1]==a[row][i+2] && i<n)
					if(a[row][i+2]==a[row][i+3] && i<n)
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
	alert("into oooo first stupid function");
	var p ;
	while(p==-1) 
		p = makemove(n,x);
	alert("p="+p);
	turn=1;
	document.getElementById(p).style.backgroundColor="black";
	a[p/10][p%10] = comp;
	if(check(p/10,p%10,me,n,x)==true) 
		alert("OH NO! You LOST.");

	
}
	var m;

//computer deciding
function makemove(n,x)
{
	alert("into this stupid function");
	var i,j,k;

	//CHECK IF COMPUTER CAN WIN .
	for(j=0;j<n;j++)
	{
		i = getrow(j,n);
		if(i==-1)
			break;
		a[i][j] = comp;
		if(check(i,j,comp,n,x))
		{
			a[i][j]=0;
			push(j,comp,n,x);
			return 10*i+j;
		}
		else
		{
			a[i][j] = 0;
		}
	}
	//CHECK IF OPPONENT CAN WIN .
	for(j=0;j<n;j++)
	{
		i = getrow(j,n);
		if(i==-1)
			break;
		a[i][j] = me;
		if(check(i,j,me,n,x))
		{
			a[i][j]=0;
			push(j,comp,n,x);
			return 10*i+j;
		}
		else
		{
			a[i][j] = 0;
		}
	}	
	//CHECK IF COMP CAN CONNECT X-K
	for(k=1;k<x-1;k++)
	{
		for(j=0;j<n;j++)
		{
			i = getrow(j,n);
			if(i==-1)
				break;
			a[i][j] = comp;
			if(check(i,j,comp,n,x-k))
			{
				a[i][j]=0;
				push(j,comp,n,x);
				return 10*i+j;
			}
			else
			{
				a[i][j] = 0;
			}
	}	

	//CHECK IF OPP CAN CONNECT X-K
	for(k=1;k<x-1;k++)
	{
		for(j=0;j<n;j++)
		{
			i = getrow(j,n);
			if(i==-1)
				break;
			a[i][j] = me;
			if(check(i,j,me,n,x-k))
			{
				a[i][j]=0;
				push(j,comp,n,x);
				return 10*i+j;
			}
			else
			{
				a[i][j] = 0;
			}
		}	
	}
	return 123;
}
	// for(j=0;j<n;j++)
	// {
	// 	for(i=n-1;i>=0;i--)
	// 	{
	// 		if(a[i][j]==0)
	// 		{
	// 			if(check(i,j,me,n,x))
	// 			{
	// 				push(j,comp,n,x);
	// 				return 10*i+j;
	// 			}
	// 			break;
	// 		}
	// 	}
	// }
	// for(k=1;k<x;k++)
	// {
	// 	for(j=0;j<n;j++)
	// 	{
	// 		for(i=n-1;i>=0;i--)
	// 		{
	// 			if(a[i][j]==0)
	// 			{
	// 				if(check(i,j,comp,n,x-k))
	// 				{
	// 					push(j,comp,n,x);
	// 					return 10*i+j;
	// 				}
	// 				break;
	// 			}
	// 		}
	// 	}
	// }
	// for(k=1;k<x;k++)
	// {
	// 	for(j=0;j<n;j++)
	// 	{
	// 		for(i=n-1;i>=0;i--)
	// 		{
	// 			if(a[i][j]==0)
	// 			{
	// 				if(check(i,j,me,n,x-k))
	// 				{
	// 					push(j,comp,n,x);
	// 					return 10*i+j;
	// 				}
	// 				break;
	// 			}
	// 		}
	// 	}
	// }
	while(1)
	{
		var cr = Math.random()*(n-1);
		var is = push(cr,comp,n,x);
		if(is!=-1)
			return is*10+cr;
		break;
	}
}


	/*
	//CHECK IF THE COMPUTER CAN WIN!!!!!!!!!!!
	for(i=n-1;i>=0;i--)
	{
		for(j=0;j<n;j++)
		{
			if(a[i][j]==0)
			{
				if(i!=n-1)
				{
					if(a[i+1][j]!=0)
					{
						if(check(i,j,comp,n,x))
						{
							m = push(j,comp,n,x);
							if(m==i)
							{
								alert("1"+m);
								return m*10+j;
							}
						}
					}
				}
				else
				{
					if(check(i,j,comp,n,x))
					{
							m = push(j,comp,n,x);
							if(m==i)
							{
								alert("2"+m);
								return m*10+j;
							}
					}
				}

			}
		}
	}
	//CHECK IF USER CAN WIN!!!! IF SO PREVENT IT!
	for(i=n-1;i>=0;i--)
	{
		for(j=0;j<n;j++)
		{
			if(a[i][j]==0)
			{
				if(i!=n-1)
				{
					if(a[i+1][j]!=0)
					{
						if(check(i,j,me,n,x))
						{
							m = push(j,comp,n,x);
							if(m==i)
							{
								alert("3"+m);
								return m*10+j;
							}
						}
					}
				}
				else
				{
					if(check(i,j,me,n,x))
					{
							m = push(j,comp,n,x);
							if(m==i)
							{
								alert("4"+m);
								return m*10+j;
							}
					}
				}

			}
		}
	}

	for(k=1;k<x;k++)
	{
		for(i=n-1;i>=0;i--)
		{
			for(j=0;j<n;j++)
			{
				
					if(a[i][j]==0)
				{
					if(i!=n-1)
					{
						if(a[i+1][j]!=0)
						{
							if(check(i,j,comp,n,x-k))
							{
								m = push(j,comp,n,x);
								if(m==i)
								{
									alert("5"+m);
									return m*10+j;
								}
							}
						}
					}
					else
					{
						if(check(i,j,comp,n,x-k))
						{
								m = push(j,comp,n,x);
								if(m==i)
								{
									alert("6"+m+"."+k);
									return m*10+j;
								}
						}
					}

				//can I get x-k?
				}
			}
		}
	}


	for(k=2;k<x;k++)
	{
		for(i=n-1;i>=0;i--)
		{
			for(j=0;j<n;j++)
			{
				
					if(a[i][j]==0)
				{
					if(i!=n-1)
					{
						if(a[i+1][j]!=0)
						{
							if(check(i,j,me,n,x-k))
							{
								m = push(j,comp,n,x);
								if(m==i){
									alert("7"+m);
									return m*10+j;
								}
							}
						}
					}
					else
					{
						if(check(i,j,me,n,x-k))
						{
								m = push(j,comp,n,x);
								if(m==i){
									alert("8"+m);
									return m*10+j;
								}
						}
					}

				//can I prevent u from gettin x-k?
				}
			}
		}
	}
	while(1)
	{
		m = push(Math.random()*j,comp,n,x);
		if(m!=-1)
		{
			alert("9"+m);
			return m*10+j;
		}
	}	
}*/
	/*

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
						*/

