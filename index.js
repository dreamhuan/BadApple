$(() => {
    const bgm = document.getElementById('bgm');
    const canvas = document.getElementById('canvas');
    const context = canvas.getContext("2d");
    canvas.width = 900;
    canvas.height = 560;
    let animationFrame;
    let frame = 0;
    let arr = [];

    $.get('BadApple.txt')
        .then((str) => {
            arr = str.split('\n');
            animationFrame = requestAnimationFrame(AnimationFrame); //前台显示加载页面，进入加载帧
        });

    // 页面失去焦点时AnimationFrame会自动停止所以停止播放音乐
    window.onblur = function (e) {
        bgm.pause();
    };

    // 每一帧的函数，按行绘制一帧的字符图像
    function AnimationFrame() {
        frame++;
        let pos = frame * 60;
        context.clearRect(0, 0, canvas.width, canvas.height);
        context.fillStyle = "#000000";
        context.fillRect(0, 0, canvas.width, canvas.height);
        context.fillStyle = "#FFFFFF";
        context.font = "12px simsun";
        for (let i = pos; i < pos + 60; i++) {
            context.fillText(arr[i], 0, 10 * (i - pos));
        }
        animationFrame = requestAnimationFrame(AnimationFrame);
        if(frame>10){
            bgm.play();
        }
        if (frame > 1743) {
            cancelAnimationFrame(animationFrame);
        }
        sleep(115);
    }

    // 模拟Thread.sleep
    function sleep(numberMillis) {
        let now = new Date();
        let exitTime = now.getTime() + numberMillis;
        while (true) {
            now = new Date();
            if (now.getTime() > exitTime)
                return;
        }
    }
});


