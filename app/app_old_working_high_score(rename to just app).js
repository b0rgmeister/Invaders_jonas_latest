"use strict";
import os from 'os'; 
import { remote } from 'electron'; 
import jetpack from 'fs-jetpack'; 
import env from './env';
var mongojs = require('mongojs');
var mongodb = require('mongodb');
var db = mongodb.Db;
var Server = mongodb.Server;
var assert = require('assert');
var HighScore;



console.log('Loaded environment variables:', env);

var app = remote.app;
var appDir = jetpack.cwd(app.getAppPath()); 



var mongojs = require('mongojs');
// Create mongo connection - try 1
var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');
var url = 'mongodb://172.31.5.64:27017/scoreboard';
MongoClient.connect(url, function(err, db) {
  assert.equal(null, err);
  console.log("Connected correctly to server.");
    var sort = { "score" : -1 };
    var grabbed_high_scores = db.collection("scoreboard_new").find().sort(sort).limit(1).toArray(function(err, result) {
    if (err) throw err;{
        console.log("RESULT: "+JSON.stringify(result[0]['score']));
        HighScore = result[0]['score']
        db.close();
}
});
});






document.addEventListener('DOMContentLoaded', function () {

var game = new Phaser.Game(800, 914, Phaser.CANVAS, 'main', { preload: preload, create: create, update: update});

function preload() 
{

    game.load.image('sky', 'assets/sky.png');
    game.load.image('ground', 'assets/platform.png');
    game.load.image('dude', 'assets/dude.png');
    game.load.audio('bullet_shot', 'assets/shoot.wav')
    game.load.audio('impact', 'assets/impact.wav')
    game.load.image('bullet', 'assets/projectile.png');
    game.load.image('alien', 'assets/alien.png',180,180);
    game.load.spritesheet('bunker', 'assets/Bunkers.png', 240, 195, 7)
    game.load.image('Cloud_Call', 'assets/cloudcall.png')
    game.load.image('sides', 'assets/side.png')
    game.load.spritesheet('explosion', 'assets/explosion.png',188,150,2)
    game.load.spritesheet('player_lives', 'assets/player_lives.png',490,135,3)
    game.load.image('enemy_bomb', 'assets/enemy_bombs.png')
    console.log("Images Loaded");
    game.add.plugin(PhaserInput.Plugin);

}

var enemy_bomb;
var shooter;
var explosions;
var explosion
var player;
var platforms;
var cursors;
var bullet_shot;
var impact;
var alien;
var score = 0;
var projectile;
var bullets;
var cloudcall;
var side;
var side2;
var jumpButton;
var bullets_time = 0;
var bullet;
var AllAliensDead = false;
var bullets_left = 50;
var aliens;
var enemy_bombs;
var living_dudes = [];
var randomized = [];
var bombs_time = 100;
var player_life = 3;
var destroyed1 = 1;
var destroyed2 = 1;
var destroyed3 = 1;
var destroyed4 = 1;
var bunker1;
var bunker2;
var bunker3;
var bunker4;
var alien_dudes;
var player_dead = 0;
var bullet_kill = 0;
var scoreText;
var living_bunkers = [];
var gameover = false;
var cache_time_now = 0;
var player_life_image;
var game_over = 0;
var HighScoreText;
var send_only_1 = 1;
var ScoreName;
var display_once = 1;
var repeat = 1;
var ExitOut;
var enter_once = 1;
var continue_onwards = 0;
var input;

function create() {





    console.log("creating players life")


    bullet_shot = game.add.audio('bullet_shot')
    impact = game.add.audio('impact')

    console.log("Arcade physics initialised and the binds");
    game.physics.startSystem(Phaser.Physics.ARCADE);
    jumpButton = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
    ExitOut = game.input.keyboard.addKey(Phaser.Keyboard.ESC);


    console.log("Adding Background");
    game.add.sprite(0, 0, 'sky');


    console.log("Adding the cloudcall in");
    cloudcall = game.add.sprite(670,10, 'Cloud_Call');
    cloudcall.scale.setTo(0.3,0.3)



    console.log("creating enemy bombs")
    enemy_bombs = game.add.group();
    enemy_bombs.enableBody = true;
    enemy_bombs.physicsBodyType = Phaser.Physics.ARCADE
    enemy_bombs.createMultiple(200, 'enemy_bomb')
    enemy_bomb = enemy_bombs.getFirstExists(false);
    enemy_bomb.body.setSize(0.2,0.3)
    enemy_bomb.width = 20
    enemy_bomb.height = 35
    enemy_bombs.setAll('outOfBoundsKILL', true);
    enemy_bombs.setAll('checkWorldBounds', true);


    console.log("Creating Bunkers")
    bunker1 = game.add.sprite(48, 843, 'bunker')
    bunker1.enableBody = true;
    bunker1.anchor.setTo(0.5,0.5)
    bunker1.width = 80
    bunker1.height = 80
    game.physics.arcade.enable(bunker1)
    bunker1.body.immovable = true;



    bunker2 = game.add.sprite(304, 843, 'bunker')
    bunker2.enableBody = true;
    bunker2.anchor.setTo(0.5,0.5)
    bunker2.height = 80
    bunker2.width = 80
    game.physics.arcade.enable(bunker2)
    bunker2.body.immovable = true;


    bunker3 = game.add.sprite(548, 843, 'bunker')
    bunker3.enableBody = true;
    bunker3.anchor.setTo(0.5,0.5)
    bunker3.height = 80
    bunker3.width = 80
    bunker3.enableBody = true;
    game.physics.arcade.enable(bunker3)
    bunker3.body.immovable = true;
    

    bunker4 = game.add.sprite(752, 843, 'bunker')
    bunker4.enableBody = true;
    bunker4.anchor.setTo(0.5,0.5)
    bunker4.height = 80
    bunker4.width = 80
    bunker4.enableBody = true;
    game.physics.arcade.enable(bunker4)
    bunker4.body.immovable = true;




    console.log("creating a group of explosions")
    explosions = game.add.group()
    explosions.enableBody = true;
    explosions.physicsBodyType = Phaser.Physics.ARCADE
    explosions.createMultiple(100,'explosion')

    console.log("adding the ground");
    platforms = game.add.group();
    side = game.add.group();


    console.log("enabling as a body");
    platforms.enableBody = true;
    side.enableBody = true;


    console.log("Creating the platform ground");
     var ground = platforms.create(0, game.world.height  + 40 , 'ground');
    side = platforms.create(-40,750, 'sides')
    side2 = platforms.create(800, 850, 'sides')
    side.width = 40
    side.height = 140
    side2.height = 140
    side2.width = 40
    


    console.log("so you dont fall through") ;
    ground.body.immovable = true;
    side.body.immovable = true;
    side2.body.immovable = true;


    console.log("scaling the ground to fit");
     ground.scale.setTo(2, 2);



    console.log("player settings");
    player = game.add.sprite(400, 900, 'dude');
    player.scale.setTo(0.3,0.3);
    player.height = 35
    player.width = 50
    player.anchor.setTo(0.5,0.5);
    player.checkWorldBounds = true;
    


    console.log("arcade physics");
    game.physics.arcade.enable(player);
    player.body.immovable = false;


    console.log("Creating the alien group")
    aliens = game.add.group();
    aliens.enableBody = true; 
    aliens.physicsBodyType = Phaser.Physics.ARCADE;
    aliens.setAll('checkWorldBounds', true);
    for (var y = 0; y < 7; y++){
        for (var x = 0; x <8; x++){
            var alien = aliens.create(x * 65, y * 55, 'alien');
            alien.width = 40
            alien.height = 50
            alien.anchor.setTo(0.5,0.5)
            alien.body.setSize(20,30,535,360)
        }
        aliens.y = 50
    var tween = game.add.tween(aliens).to( { x: 325}, 600, Phaser.Easing.Linear.None, true, 0, 1000, true);
    tween.onLoop.add(descend, this);
    var tweem = game.add.tween(aliens).to( { y: 450 }, 5000, Phaser.Easing.Linear.None, true, 1000, 40000, true);
    }
    


    living_dudes.push(aliens)



    console.log("creating the bullets group")
    bullets = game.add.group();
    bullets.enableBody = true;
    bullets.physicsBodyType = Phaser.Physics.ARCADE
    bullets.createMultiple(50, 'bullet');
    bullets.setAll('outOfBoundsKILL', true);
    bullets.setAll('checkWorldBounds', true);


    bunker1.body.setSize(242,195,0,0)
    bunker2.body.setSize(242,195,0,0)
    bunker3.body.setSize(242,195,0,0)
    bunker4.body.setSize(242,195,0,0)

    living_bunkers = [bunker1, bunker2, bunker3, bunker4, player, player, player]

    scoreText = game.add.text(16,0,"S C O R E < 0 >", {fontSize: '32px', fill: '#FFFFFF'});

    var lives_left_text = game.add.text(270, 0, "L i v e s  L e f t ", {fontSize: '32px', fill: '#FFFFFF'});

    HighScoreText = game.add.text(200,35,"H I G H S C O R E < "+ HighScore +" >", {fontSize: '32px', fill: '#FFFFFF'});

    
    player_life_image = game.add.sprite(500, 0, 'player_lives')
    player_life_image.enableBody= true;
    player_life_image.physicsBodyType = Phaser.Physics.ARCADE
    player_life_image.scale.setTo(0.3,0.3)




}   



function update() {


    if ((destroyed1 > 5) && (destroyed2 > 5) && (destroyed3 > 5) && (destroyed4 > 5)){
        game_over = 1
        you_lose()
    }



    if (player_life == 3){
        player_life_image.frame = 0
    }
    else if (player_life == 2){
        player_life_image.frame = 1
    }
    else if (player_life == 1){
        player_life_image.frame = 2
    }


    if (score == 56){
        game_over = 1;
        you_win()
    }






    enemy_shoots()

    if (player_life == 0){
        game_over = 1;
        you_lose()
    }



    //bunker 1
    game.physics.arcade.collide(bunker1,enemy_bombs,bunker_being_destroyed1,null,this)
    game.physics.arcade.collide(bullet,bunker1, bunker_being_destroyed1,null,this)
    //bunker 2
    game.physics.arcade.collide(enemy_bombs,bunker2,bunker_being_destroyed2,null,this)
    game.physics.arcade.collide(bullet,bunker2,bunker_being_destroyed2,null,this)
    //bunker 3
    game.physics.arcade.collide(enemy_bombs,bunker3,bunker_being_destroyed3,null,this)
    game.physics.arcade.collide(bullet,bunker3,bunker_being_destroyed3,null,this)
    //bunker 4
    game.physics.arcade.collide(enemy_bombs,bunker4,bunker_being_destroyed4,null,this)
    game.physics.arcade.collide(bullet,bunker4,bunker_being_destroyed4,null,this)

    game.physics.arcade.collide(bullets,aliens,collider,null,this);
    game.physics.arcade.overlap(enemy_bombs,player,collider_player,null,this)
    game.physics.arcade.collide(enemy_bombs,bullets,canceled_out,null,this)
    game.physics.arcade.collide(player,side);
    game.physics.arcade.collide(player,platforms);
    game.physics.arcade.collide(player, side2);
    game.debug.text('Bullets left:'+ bullets_left,655,130);
    game.debug.text('game_time'+game.time.now,670,150)



     
    if (player_dead == 0){
        player.body.velocity.x = 0;        
    }

    cursors = game.input.keyboard.createCursorKeys();
    if(player_dead == 0){
        if (cursors.left.isDown)
        {
            player.body.velocity.x = -550;
        }
        if (cursors.right.isDown)
        {
            player.body.velocity.x = +550;
        }
    }
    if (jumpButton.isDown){
        if (player_dead == 0){
            fireBullet();
            bullet_kill = 1
        }
    }
        
    
}




function fireBullet(){
    if (game.time.now > bullets_time)
    {
        bullet_shot.play();
        bullets_left = bullets_left - 1
        bullet = bullets.getFirstExists(false);
        if (bullet)
        {
            bullet.anchor.setTo(0.5,0.5)
            bullet.width = 8;
            bullet.height = 25;
            bullet.reset(player.x - 4 , player.y - 35);
            bullet.body.velocity.y = -450
            bullets_time = game.time.now + 200;
        }
    }
}



function enemy_shoots(){
    if (game.time.now > bombs_time)
    {
        bombs_time = bombs_time + 1000
        console.log("bomb dropped")
        let livingAliens = living_dudes[0].children.filter(alien => alien.alive);
        if (livingAliens.length){
            var alien_random=game.rnd.integerInRange(0,livingAliens.length-1);
            shooter = livingAliens[alien_random]
            enemy_bomb.reset(shooter.worldPosition.x, shooter.worldPosition.y);
            enemy_bomb.body.velocity.y = 1000
        
        let livingBunkers = living_bunkers.filter(bunker => bunker.alive);
        var bunker_random = Math.floor(Math.random() * livingBunkers.length);
        game.physics.arcade.moveToObject(enemy_bomb, livingBunkers[bunker_random],2000)

        var yAxis = livingBunkers[bunker_random].worldPosition.y - shooter.worldPosition.y;
        var xAxis = livingBunkers[bunker_random].worldPosition.x - shooter.worldPosition.x;
        enemy_bomb.angle = (Math.atan2(yAxis, xAxis)*180 / 3.14159 - 90);
        if (game_over == 1){
            bombs_time = bombs_time + 1000000
        }
        }
        
        
        

    }
}



function canceled_out(){
    impact.play();
    bullet.kill();
    enemy_bomb.kill()
    var explosion = explosions.getFirstExists(false);
    explosion.scale.setTo(0.25,0.25)
    explosion.reset(enemy_bomb.body.x,enemy_bomb.body.y)
    explosion.animations.add('boom', [0,1],5)
    explosion.animations.play('boom')
}



function collider(bullet,alien){
    impact.play();
    var explosion = explosions.getFirstExists(false);
    explosion.scale.setTo(0.25,0.25)
    explosion.reset(alien.body.x-35,alien.body.y-40)
    explosion.animations.add('boom', [0,1],5)
    explosion.animations.play('boom')
    bullet.kill();
    alien.destroy();
    score = score + 1; 
    scoreText.text = 'S C O R E < '+ score + ' >'
}

function collider_player(){
    player_dead = 1
    enemy_bomb.kill()
    player.kill()
    player_life = player_life - 1
    player.kill()
    var explosion = explosions.getFirstExists(false);
    explosion.scale.setTo(0.35,0.35)
    explosion.reset(player.x - 30,player.y - 22)
    explosion.animations.add('boom', [0,1],5)
    explosion.animations.play('boom')
    impact.play()
    setTimeout(revive_player,2000)
}


function descend()
{
    aliens.y += 10;
}

function bunker_being_destroyed1(){
    if (bullet_kill == 1){
        bullet.kill()
        bullet_kill = 0
    }

    enemy_bomb.kill()
    if (destroyed1 < 7){
        var the_bounds = bunker1.getBounds()
        var explosion = explosions.getFirstExists(false);
        explosion.reset(bunker1.x - 33,bunker1.y - 40)
        explosion.scale.setTo(0.35,0.35)
        explosion.animations.add('boom', [0,1],5)
        explosion.animations.play('boom')
        impact.play()
        if (destroyed1 == 1){
            bunker1.frame = 2
        }
        else if (destroyed1 == 2){
            bunker1.frame = 3
        }
        else if (destroyed1 == 3){
            bunker1.frame = 4
        }
        else if (destroyed1 == 4){
            bunker1.frame = 5
        }
        else{
            bunker1.frame = 6
            bunker1.destroy()
            enemy_bomb.kill()
        }
        destroyed1 = destroyed1 + 1
    }

}





function bunker_being_destroyed2(){
    var explosion = explosions.getFirstExists(false);
    explosion.reset(bunker2.x - 33,bunker2.y - 40)
    explosion.scale.setTo(0.35,0.35)
    explosion.animations.add('boom', [0,1],5)
    explosion.animations.play('boom')
    if (bullet_kill == 1){
        bullet.kill()
        bullet_kill = 0
    }
    enemy_bomb.kill()
    if (destroyed2 < 7){
        if (destroyed2 == 1){
            bunker2.frame = 2
        }
        else if (destroyed2 == 2){
            bunker2.frame = 3
        }
        else if (destroyed2 == 3){
            bunker2.frame = 4
        }
        else if (destroyed2 == 4){
            bunker2.frame = 5
        }
        else{
            bunker2.frame = 6
            bunker2.destroy()
            enemy_bomb.kill()
        }
        // console.log(2, destroyed2);

        destroyed2 = destroyed2 + 1
    }
}






function bunker_being_destroyed3(){
    var explosion = explosions.getFirstExists(false);
    explosion.reset(bunker3.x - 33,bunker3.y - 40)
    explosion.scale.setTo(0.35,0.35)
    explosion.animations.add('boom', [0,1],5)
    explosion.animations.play('boom')
    if (bullet_kill == 1){
        bullet.kill()
        bullet_kill = 0
    }
    enemy_bomb.kill()
    if (destroyed3 < 7){
        if (destroyed3 == 1){

            bunker3.frame = 2
        }
        else if (destroyed3 == 2){
            bunker3.frame = 3
        }
        else if (destroyed3 == 3){
            bunker3.frame = 4
        }
        else if (destroyed3 == 4){
            bunker3.frame = 5
        }
        else{
            bunker3.frame = 6
            bunker3.destroy()
            enemy_bomb.kill()
        }
        // console.log(3, destroyed3);

        destroyed3 = destroyed3 + 1
    }
}


function bunker_being_destroyed4(){
    var explosion = explosions.getFirstExists(false);
    explosion.reset(bunker4.x - 33,bunker4.y - 40)
    explosion.scale.setTo(0.35,0.35)
    explosion.animations.add('boom', [0,1],5)
    explosion.animations.play('boom')
    if (bullet_kill == 1){
        bullet.kill()
        bullet_kill = 0
    }
    enemy_bomb.kill()
    if (destroyed4 < 7){
        if (destroyed4 == 1){
            bunker4.frame = 2
        }
        else if (destroyed4 == 2){
            bunker4.frame = 3
        }
        else if (destroyed4 == 3){
            bunker4.frame = 4
        }
        else if (destroyed4 == 4){
            bunker4.frame = 5
        }
        else{
            bunker4.frame = 6
            bunker4.destroy()
            enemy_bomb.kill()
        }
        // console.log(4, destroyed4);

        destroyed4 = destroyed4 + 1
    }

}
function revive_player(){

    player.reset(400,900)
    player_dead = 0
}

function clearGameCache () {
    game.cache = new Phaser.Cache(game);
    game.load.reset();
    game.load.removeAll();
    

    
}

function KillAllSprites(){
    if (display_once == 1){
        game.world.removeAll()
        display_once = 0
        input = game.add.inputField(100, 375, {
        width: 600,
        height: 130,
        font: '32px Arial',
        placeHolder: "Enter your name for score to be logged and space to finish",
        fill: "#00FF00",
        cursorColor:"#00FF00",
        backgroundColor: "#000000",
        forceCase: "upper"
        });
        
    }
        if (ExitOut.isDown){
            console.log(input.value)
            ScoreName = input.value
            continue_onwards = 1
            console.log("Enter Pressed down")
        }
}


function you_win(){
    var winscreen = game.add.text(160, 250, "Congratulations, you won", {fontSize: '50px', fill: '#00FF00'}); 
    var winscreen_2 = game.add.text(210,650, "ctrl + r to restart i guess", {fontSize: '50px', fill: '#00FF00'});
    setTimeout(KillAllSprites(),1000)


    if (continue_onwards == 1){
        if (send_only_1 == 1)
        {
            send_only_1 = 0
            console.log(ScoreName)
            var mongojs = require('mongojs');
            var MongoClient = require('mongodb').MongoClient;
            var assert = require('assert');
            var url = 'mongodb://172.31.5.64:27017/scoreboard';
            MongoClient.connect(url, function(err, db) {
                assert.equal(null, err);
                console.log("Connected correctly to server.");
                var myobj = {score:score}
                console.log(score)
                db.collection("scoreboard_new").insertOne(myobj, function(err, res){
                if (err) throw err;{
                    console.log("all good");
                    db.close();
                }})})
        }
    }
    
}

function you_lose(){
    var winscreen = game.add.text(160, 250, "you lose", {fontSize: '50px', fill: '#00FF00'}); 
    var winscreen_2 = game.add.text(210,650, "ctrl + r to restart i guess", {fontSize: '50px', fill: '#00FF00'});
    setTimeout(KillAllSprites(),1000)

    if (continue_onwards == 1){
        if (send_only_1 == 1)
        {
            send_only_1 = 0
            var mongojs = require('mongojs');
            var MongoClient = require('mongodb').MongoClient;
            var assert = require('assert');
            var url = 'mongodb://172.31.5.64:27017/scoreboard';
            MongoClient.connect(url, function(err, db) {
                assert.equal(null, err);
                console.log("Connected correctly to server.");
                var myobj = {score:score,name:ScoreName}
                db.collection("scoreboard_new").insertOne(myobj, function(err, res){
                if (err) throw err;{
                    console.log("all good");
                    db.close();
                }})})
        }
    }



}



})
