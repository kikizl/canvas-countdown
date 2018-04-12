var WINDOW_WIDTH = 1024;
var WINDOW_HEIGHT = 768;
var RADIUS = 8;
var MARGIN_TOP = 60;
var MARGIN_LEFT = 30;

const endTime = new Date(2018, 3, 12, 18, 47, 52); // 坑啊！！！！new Date，月份是从0开始，0表示1月，3表示4月
var curShowTimeSeconds = 0;

// 设计一个数据结构，存储小球
var balls = [];
const colors = ["#33b5e5","#0099cc","#aa66cc","#9933cc","#99cc00","#669900","#ffbb33","ffbb8800","#ff4444","#cc0000"];

window.onload = function(){
    let canvas = document.getElementById('tutorial');
    let ctx = canvas.getContext('2d');

    canvas.width = WINDOW_WIDTH;
    canvas.height = WINDOW_HEIGHT;

    curShowTimeSeconds = getCurrentShowTimeSeconds();
    setInterval(
        function(){
            render(ctx);
            update();
        }
        ,
        50
    );
}

// 获取时间距离（以秒为单位）
function getCurrentShowTimeSeconds(){
    let curTime = new Date();
    let ret = endTime.getTime() - curTime.getTime(); // 毫秒。getTime()返回距 1970 年 1 月 1 日之间的毫秒数。
    ret = Math.round(ret/1000);  // 秒。Math.round(x)，与x最接近的整数。对于0.5，该方法将进行上舍入。
    
    return ret >= 0 ? ret : 0;
}

// 定时更新
function update(){
    // 获取当前时间距离
    let nextShowTimeSeconds = getCurrentShowTimeSeconds();

    // 下一步要显示的时间
    let nextHours = parseInt(nextShowTimeSeconds / 3600);
    let nextMinutes = parseInt((nextShowTimeSeconds - nextHours*3600)/60);
    let nextSeconds = nextShowTimeSeconds%60;

    // 现在显示的时间
    let curHours = parseInt(curShowTimeSeconds / 3600);
    let curMinutes = parseInt((curShowTimeSeconds - curHours*3600)/60);
    let curSeconds = curShowTimeSeconds%60;
    
    // 秒数如果不同，则球要散落，并且时间要更新
    if(nextSeconds!=curSeconds){
        if(parseInt(curHours/10) != parseInt(nextHours/10)){
            addBalls(MARGIN_LEFT+0, MARGIN_TOP, parseInt(curHours/10));
        }
        if(parseInt(curHours%10) != parseInt(nextHours%10)){
            addBalls(MARGIN_LEFT+15*(RADIUS+1), MARGIN_TOP, parseInt(curHours%10));
        }
        if(parseInt(curMinutes/10) != parseInt(nextMinutes/10)){
            addBalls(MARGIN_LEFT+39*(RADIUS+1), MARGIN_TOP, parseInt(curMinutes/10));
        }
        if(parseInt(curMinutes%10) != parseInt(nextMinutes%10)){
            addBalls(MARGIN_LEFT+54*(RADIUS+1), MARGIN_TOP, parseInt(curMinutes%10));
        }
        if(parseInt(curSeconds/10) != parseInt(nextSeconds/10)){
            addBalls(MARGIN_LEFT+78*(RADIUS+1), MARGIN_TOP, parseInt(curSeconds/10));
        }
        if(parseInt(curSeconds%10) != parseInt(nextSeconds%10)){
            addBalls(MARGIN_LEFT+93*(RADIUS+1), MARGIN_TOP, parseInt(curSeconds%10));
        }
        curShowTimeSeconds = nextShowTimeSeconds;
    }

    updateBalls();

}

// 
function updateBalls(){
    for(let i = 0; i < balls.length; i++){
        balls[i].x += balls[i].vx;
        balls[i].y += balls[i].vy;
        balls[i].vy += balls[i].g;

        if(balls[i].y >= WINDOW_HEIGHT-RADIUS){
            balls[i].y = WINDOW_HEIGHT-RADIUS;
            balls[i].vy = -balls[i].vy*0.75;
        }  
    }
}

function addBalls(x,y,num){
    console.log(digit[num]);
    
    for(let i = 0; i < digit[num].length; i++){
        console.log(digit[num][i]);
        
        for(let j = 0; j < digit[num][i].length; j++){
            console.log(digit[num][i]);
            
            if(digit[num][i][j] == 1){
                let aBall = {
                    x: x + j*2*(RADIUS+1)+(RADIUS+1),
                    y: y + i*2*(RADIUS+1)+(RADIUS+1),
                    g: 1.5 + Math.random(), // 1.5 - 2.5
                    vx: Math.pow(-1, Math.ceil(Math.random()*1000))*4, // Math.ceil()向上取整，速度为-4或者4。 
                    vy: -5,
                    color: colors[ Math.floor(Math.random()*colors.length) ] // Math.floor()向下取整
                }
                console.log(aBall);
                balls.push(aBall);
            }
        }
    }
}

function render(ctx){

    ctx.clearRect(0,0,WINDOW_WIDTH,WINDOW_HEIGHT);

    let hours = parseInt(curShowTimeSeconds / 3600);
    let minutes = parseInt((curShowTimeSeconds - hours*3600)/60);
    let seconds = curShowTimeSeconds%60;

    renderDigit(MARGIN_LEFT, MARGIN_TOP, parseInt(hours/10), ctx);
    renderDigit(MARGIN_LEFT + 15*(RADIUS+1), MARGIN_TOP, parseInt(hours%10), ctx);
    renderDigit(MARGIN_LEFT + 30*(RADIUS+1), MARGIN_TOP, 10, ctx);
    renderDigit(MARGIN_LEFT + 39*(RADIUS+1),MARGIN_TOP,parseInt(minutes/10),ctx);
    renderDigit(MARGIN_LEFT + 54*(RADIUS+1),MARGIN_TOP,parseInt(minutes%10),ctx);
    renderDigit(MARGIN_LEFT + 69*(RADIUS+1), MARGIN_TOP, 10, ctx);
    renderDigit(MARGIN_LEFT + 78*(RADIUS+1),MARGIN_TOP,parseInt(seconds/10),ctx);
    renderDigit(MARGIN_LEFT + 93*(RADIUS+1),MARGIN_TOP,parseInt(seconds%10),ctx);

    for(let i = 0; i < balls.length; i++){
        ctx.fillStyle = balls[i].color;

        ctx.beginPath();
        ctx.arc(balls[i].x, balls[i].y, RADIUS, 0, 2*Math.PI, true);
        ctx.closePath();
        ctx.fill();
    }
    
}

function renderDigit(x,y,num,ctx){
    ctx.fillStyle = "rgb(0,102,153)";

    for(let i = 0; i < digit[num].length; i++){ // 行数
        for(let j = 0; j < digit[num][i].length; j++){ // 列数
            if(digit[num][i][j] == 1) {
                ctx.beginPath();
                ctx.arc(x+j*2*(RADIUS+1)+(RADIUS+1), y+i*2*(RADIUS+1)+(RADIUS+1), RADIUS, 0, 2*Math.PI);
                ctx.closePath();

                ctx.fill();
            }
        }
    }
}

