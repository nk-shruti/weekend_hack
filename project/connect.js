
function connect()
{
    //Connect Four
    var room = document.getElementById('room');
    var lol = document.getElementById('violin');
    document.getElementById('wholething').removeChild(room);
    lol.style.visibility="visible";
var n;
var x;
var turn=1;
//get it from the html page:
//n = localStorage.getItem("level");
//x = localStorage.getItem("connect");
n = 5;
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
    for(var j=0;j<n;j++)
        a[i][j] = 0;
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
            violin.appendChild(p);


        }
    }
}
createBoard(n);
window.onkeypress = function(event)
{   
    if(turn==1)
    {

        e=event.keyCode;
        if(e>=49 && e<=49+n)
            user(e-49);
        else
            alert("Please do enter a correct number. Limited time only is there.");
    }
}

function user(num)
{
    //alert(num);
    var row;
    row = push(num,me,n,x);
    //alert("row"+row);
    if(row==-1)
    {
        //alert("Invalid input. Please don't waste time.");

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
    //alert("into getrow");
    var i;
    for(i=n-1;i>=0;i--)
    {
        if(a[i][col]==0)
        {
            //alert(i);
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
    else if(checkdiag(row,col,player,n,x))
        return true;
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

// function checkrow(row,col,player,n,x)
// {
//  var flag = 1;

//  var k;
//  for(var i = col-(x-1);i<=col;i++)
//  {
//      if(i>=0)
//      {
            
//          if(i+x-1<n)
//          {
//              var num=0;
//              for(k=1;k<x;k++)
//              {
                    
                        
//                      if(a[row][i]==a[row][i+k] && a[row][i]==player)
//                      {
//                          flag=0;
//                          num++;
//                      }
//              }
                    
//              if(num==x)
//                      return true;
//          }
            
//      }
//  }
//  return false;
//  }
function checkrow(row,col,player,n,x)
{
    var i,j;
    i=row;
    j=col;
    var left=0;
    var right=0;
    if(a[row][col]!=player)
        return false;
    while(j>=0 && j>=col-x+1)
    {
        if(a[row][col]!=a[row][j])
            break;
        else 
            left++;
        j--;
    }
    j=col;
    while(j<n && j<=col+x-1)
    {
        if(a[row][col]!=a[row][j])
            break
        else right++;
        j++;
    }
    if(left+right>x)
        return true;
    else return false;
}
function checkdiag(row,col,player,n,x)
{
    //main diagonal check
    var back_c=0;
    var front_c=0;
    var i,j;
    i=row;
    j=col;
    if(a[i][j]!=player)
        return false;
    while(i>=row-x+1 && j>=col-x+1 && i>=0 && j>=0)
    {
        if(a[i][j]!=a[row][col])
            break;
        else 
            back_c++;
        i--;
        j--;
    }
    i=row;
    j=col;
    while(i<n && j<n && i<=row+x-1 && j<=col+x-1)
    {
        if(a[i][j]!=a[row][col])
            break;
        else
            front_c++;
        i++;
        j++;
    }
    if(back_c+front_c>x)
        return true;
    //other diagonal check
    back_c=0;
    front_c=0;
    i=row;
    j=col;
    while(i<n && j>=0 && i<=row+x-1 && j>=col-x+1)
    {
        if(a[i][j]!=a[row][col])
            break;
        else
            back_c++;
        i++;
        j--;

    }
    i=row;
    j=col;
    while(i>=0 && j<n && i>=row-x+1 && j<=col+x-1)
    {
        if(a[i][j]!=a[row][col])
            break;
        else
            front_c++;
        i--;
        j++;

    }
    if(back_c+front_c>x)
        return true;
    return false;
}

function computers(n,x)
{
    
    var p = -1;
    while(p==-1) 
        p = makemove(n,x);
    alert("p="+p);
    turn=1;
    document.getElementById(p).style.backgroundColor="black";
    a[p/10][p%10] = comp;
    if(check(p/10,p%10,comp,n,x)==true) 
        {
            alert("OH NO! You LOST.");
            turn=1;
            createBoard(n);
        }

    
}
    var m;

//computer deciding
function makemove(n,x)
{
    
    var i,j,k;

    //CHECK IF COMPUTER CAN WIN .
    for(j=0;j<n;j++)
    {
        i = getrow(j,n);
        if(i==-1)
            continue;
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
            continue;
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
                continue;
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
    }   

    //CHECK IF OPP CAN CONNECT X-K
    for(k=1;k<x-3;k++)
    {
        for(j=0;j<n;j++)
        {
            i = getrow(j,n);
            if(i==-1)
                continue;
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

    while(1)
    {
        
        var cr = Math.floor(Math.random()*(n-1));
        console.log(cr);
        var is = push(cr,comp,n,x);
        if(is!=-1)
            return is*10+cr;
        break;
    }
}
}