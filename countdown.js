var WINDOW_WIDTH = 1024;
var WINDOW_HEIGHT = 768;
var RADIUS = 8;
var MARGIN_TOP = 60;
var MARGIN_LEFT = 30;

const endTime = new Date(2018, 3, 12, 18, 47, 52); // 坑啊！！！！new Date，月份是从0开始，0表示1月，3表示4月
var curShowTimeSeconds = 0;

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

function getCurrentShowTimeSeconds(){
    let curTime = new Date();
    let ret = endTime.getTime() - curTime.getTime(); // 毫秒。getTime()返回距 1970 年 1 月 1 日之间的毫秒数。
    ret = Math.round(ret/1000);  // 秒。Math.round(x)，与x最接近的整数。对于0.5，该方法将进行上舍入。
    
    return ret >= 0 ? ret : 0;
}

function update(){
    let nextShowTimeSeconds = getCurrentShowTimeSeconds();

    let nextHours = parseInt(nextShowTimeSeconds / 3600);
    let nextMinutes = parseInt((nextShowTimeSeconds - nextHours*3600)/60);
    let nextSeconds = nextShowTimeSeconds%60;

    let curHours = parseInt(curShowTimeSeconds / 3600);
    let curMinutes = parseInt((curShowTimeSeconds - curHours*3600)/60);
    let curSeconds = curShowTimeSeconds%60;
    
    if(nextSeconds!=curSeconds){
        curShowTimeSeconds = nextShowTimeSeconds;
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

