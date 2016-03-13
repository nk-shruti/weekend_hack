  function ag()
        {
            alert("inside ag");
            var room = document.getElementById('room');
            var lol = document.getElementById('container');
            document.getElementById('wholething').removeChild(room);
            document.getElementById('score').style.visibility="visible";
            lol.style.visibility="visible";
            var camera, scene, renderer, player, coin;
            var mouse = new THREE.Vector2();
            var enemies = [];
            var enemySpeed = 3;
            var scoreDiv = document.getElementById( "score" );
            var bestScoreDiv = document.getElementById( "bestScore" );
            var sphereRadius = 10;
            var flag;
            var enemyRange = new THREE.Vector3(550,700,700);
            var coinRange = 500;
            var fireSpeed = 4;
            var bullets = [];
            var mouseclick = false;
            var container = document.getElementById( "container" );
            
            renderer = new THREE.WebGLRenderer();
            renderer.setSize( container.clientWidth, container.clientHeight );
            if(status==0)
            {
                    document.body.appendChild( container );
                    
                    container.appendChild( renderer.domElement );
            }   
            
            camera = new THREE.PerspectiveCamera(70, container.clientWidth / container.clientHeight, 1, 1000 );
            camera.position.z = 400;
            scene = new THREE.Scene();
            var geometry = new THREE.SphereGeometry( sphereRadius );
            var geometry2 = new THREE.SphereGeometry(sphereRadius/2);
                //var texture = THREE.ImageUtils.loadTexture( 'crate.gif' );
                //texture.anisotropy = renderer.getMaxAnisotropy();
            var material = new THREE.MeshBasicMaterial( { color: 0x00ff11 } );
                // enemies
            var n = 30;
            for ( var i = 0; i < n; i++ ) {
                    var mesh = new THREE.Mesh( geometry, material );
                    mesh.position.set( enemyRange.x/2 - enemyRange.x*Math.random(),
                                       enemyRange.y/2 - enemyRange.y*Math.random(),
                                       enemyRange.z/2 - enemyRange.z*Math.random());
                    scene.add( mesh );

                    enemies.push( mesh );
                }
                
            coin = new THREE.Mesh( geometry, new THREE.MeshBasicMaterial( {color: 0xFFFF00} ) );
            var fire = new THREE.Mesh(geometry2, new THREE.MeshBasicMaterial({ color:0xff0000}));
            coin.position.set( coinRange/2 - coinRange * Math.random(),
                                  coinRange/2 - coinRange * Math.random(),
                                  0.0);
            scene.add( coin );
            player = new THREE.Mesh( geometry, new THREE.MeshBasicMaterial() );
            scene.add( player );
            container.addEventListener('mousemove',onMouseMove,false);
            animate();
            function onMouseMove( event ) {

                // mouse.x = event.clientX - container.offsetLeft;
                // mouse.y = - ( event.clientY - container.offsetTop );
                // player.position.set(  -(enemyRange.x/2-mouse.x),mouse.y+enemyRange.y/4, 0.0 );
                mouse.x = ( ( event.clientX - container.offsetLeft ) / container.clientWidth ) * 2 - 1;
                mouse.y = - ( ( event.clientY - container.offsetTop ) / container.clientHeight ) * 2 + 1;
                player.position.set( 275 * mouse.x, 275* mouse.y, 0.0 );
            }

            function onClickof()
            {
                
                var fire = new THREE.Mesh(geometry2, new THREE.MeshBasicMaterial({ color:0xff0000}));
                fire.scale.set(2,2,2);
                fire.position.z = 0.0;
                fire.position.y = 0.25 + player.position.y;
                fire.position.x = 0.25 + player.position.x;
                scene.add(fire);
                bullets.push(fire);


            }
            function animate() {

                requestAnimationFrame( animate );

                container.addEventListener( 'click', onClickof, false );    

                
                for ( var i = 0; i < enemies.length; i++ ){
                    if ( enemies[i].position.z > enemyRange.z/2 ) 
                    { 
                        enemies[i].position.x = enemyRange.x/2 - enemyRange.x * Math.random(); 
                        enemies[i].position.y = enemyRange.y/2- enemyRange.y * Math.random(); 
                        enemies[i].position.z = -enemyRange.z/2;
                    } 
                    else 
                    {
                        if ( enemies[i].position.distanceTo( player.position ) < 2 * sphereRadius) 
                        { 
                            scoreDiv.innerHTML = "0"; 
                        }
                        enemies[i].position.z += enemySpeed; 
                    }
                }
                for(var j = 0;j<bullets.length;j++)
                {
                    if (bullets[j].position.z > enemyRange.z) 
                    { 
                        bullets.splice(j,1);
                    } 
                    else 
                    {
                        for(var k=0;k<enemies.length;k++)
                            {
                            if ( bullets[j].position.distanceTo( enemies[k].position ) < 3*sphereRadius/2) 
                            { 
                                var score = Number(scoreDiv.innerHTML) + 7; 
                                scoreDiv.innerHTML = score.toString();
                                 if(score>=7)
                                {
                                     alert("You won!");

                                    alert("Your first clue is : This helped you solve the Chinese Mafia case.");
                                    score=0;
                                    scoreDiv.innerHTML = score.toString();
                                    document.getElementById('wholething').appendChild(room);
                                    document.getElementById('score').style.visibility="hidden";
                                    lol.style.visibility="hidden";
                                }
                                enemies[k].position.x = enemyRange.x/2 - enemyRange.x * Math.random(); 
                                enemies[k].position.y = enemyRange.y/2- enemyRange.y * Math.random(); 
                                bullets[j].position.z = enemyRange.z;
                                bullets.splice(j,1); j--;
                                                        
                            }
                        }
                        bullets[j].position.z -= 4; 
                    }
                }
            
                if ( player.position.distanceTo( coin.position ) < 2 * sphereRadius ) {
                    coin.position.x = coinRange/2 - coinRange * Math.random();
                    coin.position.y = coinRange/2 - coinRange * Math.random();

                    score = Number(scoreDiv.innerHTML) + 1; 

                    scoreDiv.innerHTML = score.toString();
                    if(score>=7)
                    {
                        alert("You won!");
                         alert("Your first clue is : This helped you solve the Chinese Mafia case.");
                        score=0;
                        scoreDiv.innerHTML = score.toString();
                        document.getElementById('wholething').appendChild(room);
                        document.getElementById('score').style.visibility="hidden";
                        lol.style.visibility="hidden";
                    }

                }
    
                renderer.render( scene, camera );

            }


        }
