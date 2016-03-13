 var status=0;
    function doit(q)
        {
            
            // 1.check status
            // 2.if status = 0, then popup(game)
            if(status==0)
            {  
                alert("asteroid game");
                ag();
                status++;

            }
            // 3.if status = 1 && id = books then popup(cowsandbulls)

            else if(status==1 && q=='books')
            {
                alert("cows and bulls");
                status++;
            }
            //   else popup(message) then popup(game)
            else if(status==1 && q!='books')
            {
                alert("Ha ha! Wrong item. Now suffer.");
                alert("asteroid game");
                ag();
                
            }
            // 4.if status = 2 && id!=violin then popup(message) then popup(game)
            else if(status==2 && q!='violin')
            {    
                alert("Ha ha! Wrong item. Now suffer.");
                alert("asteroid game");
                ag();
                

            }
            //   else popup(violin)
            else if(status==2 && q=='violin')
            {
                alert("Violin. Connect 4");
                status++;
            }

            // 5.if status > 2 popup(message) then popup(game) 
            else if(status>2)
            {
                alert("Aww! You're stuck with me baby.");
                alert("asteroid game");
                ag();
            }
            
        }