//Connect Four
var n;
var x;
//get it from the html page:
//n = localStorage.getItem("level");
//x = localStorage.getItem("connect");
n = 4;
x = 4;
//declare a 2D array:
var x = new Array(n);
for (var i = 0; i < n; i++) {
  x[i] = new Array(n);
}
//initialize the array:
for(i=0;i<n;i++)
	for(j=0;j<n;j++)
		a[i][j] = 0;
var me = 1;
var comp = -1;
//n X n matrix, connect x.
function createBoard()
{
	//create the board dynamically
}
//on clicking the column, the coin falls into the first empty spot from the bottom:
function push(col,player,n,x)
{
	var c = col;
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
//check if a connect x has been made:
function check(row,col,player,n,x)
{
	if(checkcol(row,col,player,n,x))
		return true;
	else if(checkrow(row,col,player,n,x))
		return true;
	else if(checkdiag(row,col,player,n,x))
		return true;
	else return false;
}
function checkcol(row,col,player,n,x)
{
	var flag=1;
	for(var i=row;i<row+4;i++)
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
			if(a[i][j]==a[i][j+1] && a[i][j]==player)
				if(a[i][j+1]==a[i][j+2])
					if(a[i][j+2]==a[i][j+3])
						return true;
	}
	return false;

}
function checkdiag(row,col,player,n,x)
{
	//non-main diagonal:
	if(r<x-1)
		return false;
	if(c<x-1)
		return false;
	for(var i = row+x-1,var j=col-x+1;i>=row;i--,j++)
	{
		if(a[i][j]==a[i-1][j+1] && a[i][j]==player)
			if(a[i-1][j+1]==a[i-2][j+2])
				if(a[i-2][j+2]==a[i-3][j+3])
					return true;
	}
	//main diagonal
	for(var i = row-x+1,var j=col-x+1;i<=row;i++,j++)
	{
		if(a[i][j]==a[i+1][j+1] && a[i][j]==player)
			if(a[i+1][j+1]==a[i+2][j+2])
				if(a[i+2][j+2]==a[i+3][j+3])
					return true;

	}
	return false;
}
//computer deciding
function makemove(n,x)
{
	for(var i=0;i<n;i++)
	{
		for(var j=n-1;j>=0;j++)
		{
			if(a[i][j]==0)
			{
				if(check(i,j,comp,n,x-1))
					{
						return push(j,-1,n,x);
					}
				if(check(i,j,me,n,x-1))
					{
						return push(j,-1,n,x);
					}
				for(var k = x-2,k>=1;k--)
				{
					if(check(i,j,comp,n,k))
					{
						return push(j,-1,n,x);
					}

				}
				for(var k = x-2,k>=1;k--)
				{
					if(check(i,j,me,n,k))
					{
						return push(j,-1,n,x);
					}

				}

			
			}
		}

	}
	return push(Math.random()*(n-1),j,comp,n,l);
}
