
let points = [[3,0],[4,1],[5,3],[4,4],[4,5],[3,6],[0,6],[1,5],[1,4],[2,3],[1,2], [1,1], [0,0],[-3,0],[-2,1],[-2,2],[-1,3],[-2,4],[-2,5],[-3,6],
[-4,7],[2,8],[0,8],[0,9],[3,9],[6,7],[8,4],[9,5],[9,4],[8,3],[9,3], [9, 2], [8,2], [5, -1],[3,-1],[3,-2],[-1,-2],[1,-1],[-2,-1],[-3,0],[-5,2],[-6,0],[-9,-2],[-9,1],[-7,3],[-9,5],[-9,9], [-6,6], [-5, 4],[-3,6],[-4,7],
[-3,6],[-2,5],[-2,4],[-1,3],[-2,2],[-2,1],[-3,0],[0,0],[1,1],[1,2],[2,3], [1,4], [1,5],[0,6],[3,6],[4,5],[4,4],[5,3],[4,1],[3,0]]; //list資料，
var stroke_colors = "fffbff-ffb7c3-034078-d282a6-bad7f2".split("-").map(a=>"#"+a)
 var fill_colors = "edede9-d6ccc2-f5ebe0-e3d5ca-d5bdaf".split("-").map(a=>"#"+a)

function preload(){  //最早執行的程式碼
  //音樂
  elephant_sound = loadSound("sound/elephant.wav")
  bullet_sound = loadSound("sound/Launching wire.wav")
  // bg_sound = loadSound("sound/574197.wav")

}

var fish  //魚魚物件(代表單一個物件，利用這個變數來做正在處理的物件)
var fishhh =[]  //陣列(放所有的物件資料，物件倉庫，裡面儲存所有的物件資料)
var bullet  //飛彈物件
var bullets=[]
var monster   //怪物物件
var monsters=[]
var score = 0
var shipP   //設定砲台的位置
function setup() {  //設定魚魚物件倉庫內的資料
  createCanvas(windowWidth, windowHeight);
  shipP = createVector(width/2,height/2)  //預設砲台的位置為視窗的中間(使用向量座標)
  //產生幾個物件
  for(var j=0;j<10;j=j+1)
  {
    fish = new Obj({})  //產生一個新的物件，"暫時"放入到ball變數中
    fishhh.push(fish)  //把fish物件放入到fishhh物件倉庫(陣列)中
  }
  for(var j=0;j<20;j=j+1)
  {
    monster = new Monster({})  //產生一個新的物件，"暫時"放入到monster變數中
    monsters.push(monster)  //把monster物件放入到monsters物件倉庫(陣列)中
  }

  // bg_sound.play()
}

function draw() {  //每秒會執行60次次
  background(0);
  
  if(keyIsPressed){  //鍵盤是否被按下，如果有鍵盤被按下，keyPressed的值為true
    if(key=="ArrowLeft" || key=="a"){  //按下鍵盤的往左鍵
      shipP.x = shipP.x-5
    }
    if(key=="ArrowRight" || key=="d"){  //按下鍵盤的往右鍵
      shipP.x = shipP.x+5
    }
    if(key=="ArrowUp" || key=="w"){  //按下鍵盤的往上鍵
      shipP.y = shipP.y-5
    }
    if(key=="ArrowDown" || key=="s"){  //按下鍵盤的往下鍵
      shipP.y = shipP.y+5
    }    
  }
  for(let fish of fishhh){  //針對陣列變數，取出陣列內一個一個的物件
    fish.draw()
    fish.update()
    //由此判斷，每隻魚魚有沒有接觸每一個飛彈
    for(let bullet of bullets){
      if(fish.isBallInRanger(bullet.p.x,bullet.p.y))  //判斷魚魚與bullet有沒有碰觸
      {
        score = score - 1     //分數扣一
        //elephant_sound.play()
        fishhh.splice(fishhh.indexOf(fish),1)         //讓魚魚從魚魚倉庫內移除
        bullets.splice(bullets.indexOf(bullet),1)   //讓飛彈從飛彈倉庫內移除
      }
    }
    // ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

  }


  for(let bullet of bullets){  //針對飛彈倉庫內的資料，一筆一筆的顯示出來
    bullet.draw()
    bullet.update()
  }

  for(let monster of monsters){  //針對怪物倉庫內的資料，一筆一筆的顯示出來
    if(monster.IsDead && monster.timenum>=6){
      monsters.splice(monsters.indexOf(monster),1) //讓怪物從怪物資料倉庫內移除
    }
    monster.draw()
    monster.update()
    //+++++++++++++++由此判斷，每隻怪物有沒有接觸每一個飛彈++++++++++++++++++++++
    for(let bullet of bullets){
      if(monster.isBallInRanger(bullet.p.x,bullet.p.y))  //判斷monster與bullet有沒有碰觸
      {
        score = score + 1     //分數加一
        // monsters.splice(monsters.indexOf(monster),1)   //讓怪物從怪物資料倉庫內移除
        monster.IsDead = true //已經被打到了，準備執行爆炸後的畫面
        bullets.splice(bullets.indexOf(bullet),1)   //讓飛彈從飛彈倉庫內移除
      }
    }

    //
  }

  textSize(50)
  fill("caf0f8")
  text(score,50,50)
  //劃出中間三角形的砲台
  push()
    let dx = mouseX-width/2  //滑鼠座標到中心點座標的x軸距離
    let dy = mouseY-height/2 //滑鼠座標到中心點座標的y軸距離
    let angle = atan2(dy,dx)   //利用反tan算出角度


    //translate(width/2,height/2)  //砲台的位置  
    translate(shipP.x,shipP.y) //砲台的位置 ，使用shipP的向量值
    rotate(angle)    //讓三角形翻轉一個angle角度       
    //noStroke()
    fill("#ffd6ff")
    ellipse(0,0,60)  //劃出中間的圓
    fill("#ff8fab")
    triangle(50,0,-25,-25,-25,25)  //劃出三角形
  pop()
  //

}

function mousePressed(){
  
  // //按下滑鼠產生一個物件程式碼
  // ball = new Obj({
  //   // p:{x: mouseX, y:mouseY }
  //   p:createVector(mouseX,mouseY)
  // })  //產生一個新的物件，"暫時"放入到ball變數中
  // fishhh.push(fish)

  // //按下滑鼠後，刪除該物件
  // for(let fish of fishhh){
  //   if(fish.isBallInRanger(mouseX,mouseY)){
  //     //把倉庫的這個物件刪除
  //     score = score + 1
  //     fish.splice(fishhh.indexOf(fish),1)   //把倉庫內編號第幾個刪除，只刪除1個(indexOf()找出ball的編號)
  //   }
  // }

  // 新增(產生)一筆飛彈資料(還沒有顯示)
  bullet  = new Bullet({})
  bullets.push(bullet)  //把這一筆資料放入飛彈倉庫
  bullet_sound.play()
}

function keyPressed(){
  if(key==" "){
    //新增(產生)一筆飛彈資料(還沒有顯示)
    bullet  = new Bullet({})
    bullets.push(bullet)  //把這一筆資料放入飛彈倉庫
    bullet_sound.play()
  }  

}
