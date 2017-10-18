Laya.init(1920,1080);
Laya.stage.scaleMode=Laya.Stage.SCALE_SHOWALL;
var point=[];//声明一个集合，用于记录鼠标的位置
var img1=new Laya.Sprite();//声明第一个老婆
var img2=new Laya.Sprite();//声明第二个老婆
var lines=new Laya.Sprite();//声明全彩老婆的遮罩层
var times=800;//持久时间
Laya.stage.on(Laya.Event.MOUSE_MOVE,this,mousemove);//事件绑定，当鼠标移动时触发mousemove事件
//把声明的第一个老婆变成灰色老婆（通过添加灰色的色彩滤镜）
var grayscaleMat = [0.3086, 0.6094, 0.0820, 0, 0, 0.3086, 0.6094, 0.0820, 0, 0, 0.3086, 0.6094, 0.0820, 0, 0, 0, 0, 0, 1, 0];
var grayscaleFilter = new Laya.ColorFilter(grayscaleMat);
img2.filters=[grayscaleFilter];
//把声明的第一个老婆变成灰色老婆（通过添加灰色的色彩滤镜）
img1.mask=lines;//使全彩老婆获得遮罩层
//给两个老婆穿上衣服，并出现在舞台上
img1.loadImage("bg.jpg");
img2.loadImage("bg.jpg");
Laya.stage.addChild(img2);
Laya.stage.addChild(img1);
//给两个老婆穿上衣服，并出现在舞台上
//鼠标移动时触发的mousemove事件
function mousemove(){
	point.push({
		x:Laya.stage.mouseX,
		y:Laya.stage.mouseY,
		time:Date.now(),
	});//给point集合添加一个object，带有当前的鼠标位置和当前的时间

};
//鼠标移动时触发的mousemove事件
//帧事件
Laya.stage.frameLoop(1,this,draw);
//帧响应事件
function draw(){
	lines.destroyChildren();//清除遮罩层中所有子精灵，进行
	point=point.filter(function(val){
		return (Date.now()-val.time<times);
	});
	for(var i=1;i<point.length;i++){
		var line= new Laya.Sprite();
		var last=point[i-1];
		var first=point[i];
		var speed=Math.min(400,Math.max(distance(last,first),200));
		line.graphics.drawPath(0,0,[["moveTo",last.x,last.y],["lineTo",first.x,first.y]],{}, {strokeStyle: "rgba(12,434,34,"+(1-(Date.now()-first.time)/times)+")",lineCap: "round",lineWidth: speed});
		lines.addChild(line);
}
};
//帧响应事件
//帧事件
function distance(last,first){
	return Math.sqrt(Math.pow(first.x-last.x,2)+Math.pow(first.y-last.y,2));
}//用于计算距离