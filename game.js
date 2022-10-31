window.onload = function () {
    let btn = document.querySelector('.btn')
    let main = document.querySelector('.main')
    let nums = document.querySelector('.num')
    let grades = document.querySelector('.grades')
    let bigstop = document.querySelector('.big_stop')
    let history = document.querySelector('.history')
    big_history = document.querySelector('.big_history')
    let history_num = document.querySelector('.history-num')
    let btn_clear = document.querySelector('.clear')
    let btn_back = document.querySelector('.back')
    let start_game = document.querySelector('.start-game')
    let start = document.querySelector('.start')
    // 开始游戏
    start.onclick = function () {
        start_game.style.display = 'none';
        fd()
    }
    // 敌方模型
    let str1 = 'imgs/1.png'
    // 控制产生不同的敌方小飞机
    setInterval(() => {
        let x = Math.floor(Math.random() * 5 + 1)
        str1 = `imgs/${x}.png`
    }, 1000)
    //飞机移动速度
    let num1 = 10;
    //飞机创建速度
    let num11 = 1000;
    // 子弹模型
    let str2 = 'imgs/01.png'
    // 自己的模型
    let str3 = 'imgs/boss.png'
    // 自己移动的速度
    let num3 = 15;

    function fd() {
        let SmallPlanArr = []
        //创建敌方小飞机
        /*
        属性：
            图片的节点
            图片
            x坐标
            y坐标
            速度
        行为：
            移动
            初始化 把图片节点添加到main里面
        */
        function SmallPlan(imgSrc, x, y, speed) {
            this.imgNode = document.createElement('img');
            this.imgSrc = imgSrc;
            this.x = x;
            this.y = y;
            this.speed = speed;
            this.init = function () {
                this.imgNode.src = imgSrc;
                this.imgNode.style.position = 'absolute';
                this.imgNode.style.left = this.x + 'px';
                this.imgNode.style.top = this.y + 'px';
                this.imgNode.style.className = 'foe';
                main.appendChild(this.imgNode);
            }
            this.init();
            //飞机移动
            this.move = function () {
                //每次都拿到自己距离顶部的值加上移动速度
                this.imgNode.style.top = parseInt(this.imgNode.style.top) + this.speed + 'px';
            }
        }
        // 传递参数 创建小飞机
        function createsmallPlan() {
            let x = parseInt(Math.random() * 350);
            let y = -parseInt(Math.random() * 40);
            let z = parseInt(Math.random() * 10);
            let smallplan = new SmallPlan(str1, x, y, num1);
            SmallPlanArr.push(smallplan)
        }
        //调用小飞机创建函数  (敌方飞机创建的速度)
        let time1 = setInterval(() => {
            createsmallPlan()
        }, num11);
        //小飞机移动函数
        function smallmove() {
            for (let i = 0; i < SmallPlanArr.length; i++) {
                SmallPlanArr[i].move();
                // 超出边界后销毁(移除)
                if (parseInt(SmallPlanArr[i].imgNode.style.top) >= 640) {
                    main.removeChild(SmallPlanArr[i].imgNode);
                    SmallPlanArr.splice(i, 1);
                }
            }
        }
        //调用小飞机移动函数 (敌方飞机移动的速度)
        let time2 = setInterval(() => {
            smallmove()
        }, 50);






        // 玩家飞机
        /*
        属性：
            图片的节点
            图片
            x坐标
            y坐标
            速度
        行为：
            移动 上下左右
            发射子弹
            初始化
        */
        //自己的小飞机函数    
        function playerPlaneProto(imgSrc, x, y, speed) {
            this.imgNode = document.createElement('img')
            this.imgSrc = imgSrc;
            this.x = x;
            this.y = y;
            this.speed = speed;
            this.init = function () {
                this.imgNode.className = 'myself'
                this.imgNode.src = this.imgSrc;
                this.imgNode.style.position = 'absolute';
                this.imgNode.style.left = this.x + 'px';
                this.imgNode.style.top = this.y + 'px';
                main.appendChild(this.imgNode);
            }
            this.init();
            this.moveL = function () {
                //根据玩家按键移动小飞机
                if (parseInt(this.imgNode.style.left) <= 0) {
                    this.imgNode.style.left = 360 + 'px'
                } else {
                    this.imgNode.style.left = parseInt(this.imgNode.style.left) - this.speed + 'px';
                }
            }
            this.moveR = function () {
                //根据玩家按键移动小飞机
                if (parseInt(this.imgNode.style.left) >= 360) {
                    this.imgNode.style.left = 0 + 'px'
                }
                else {
                    this.imgNode.style.left = parseInt(this.imgNode.style.left) + this.speed + 'px';
                }
            }
            this.moveU = function () {
                //根据玩家按键移动小飞机
                if (parseInt(this.imgNode.style.top) <= 10) {
                    this.imgNode.style.top = 10 + 'px';
                }
                this.imgNode.style.top = parseInt(this.imgNode.style.top) - this.speed + 'px';
            }
            this.moveD = function () {
                //根据玩家按键移动小飞机
                if (parseInt(this.imgNode.style.top) >= 630) {
                    this.imgNode.style.top = 630 + 'px'
                }
                this.imgNode.style.top = parseInt(this.imgNode.style.top) + this.speed + 'px';
            }
            // this.shoot = function () {
            //根据按键执行发射子弹
            // let newBull = new bulletProto('imgs/子弹.png', parseInt(this.imgNode.style.left), parseInt(this.imgNode.style.top) - 50, 12)
            // bullArr.push(newBull);
            // }
        }
        let player = new playerPlaneProto(str3, 50, 500, num3);
        //键盘按下事件 监听用户按下的是哪个键
        window.onkeypress = function (e) {
            switch (e.key) {
                case 'w':
                    return player.moveU();
                case 's':
                    return player.moveD();
                case 'a':
                    return player.moveL();
                case 'd':
                    return player.moveR();
            }
        }


        // 发射子弹函数
        function bulletProto(imgSrc, x, y, speed) {
            let imgNode = document.createElement('img');
            this.imgSrc = imgSrc;
            this.x = x;
            this.y = y;
            this.speed = speed;
            this.init = function () {
                imgNode.className = 'zd';
                imgNode.src = this.imgSrc;
                imgNode.style.position = 'absolute';
                imgNode.style.left = this.x + 'px';
                imgNode.style.top = this.y + 'px';
                main.appendChild(imgNode)
            }
            this.init();
        }
        //控制子弹调用 (控制子弹移动的速度)
        let time3 = setInterval(bullMove, 10)
        //控制子弹产生的速度
        let myself = document.querySelector('.myself')
        let time4 = setInterval(function () {
            let newBull = new bulletProto(str2, parseInt(myself.style.left), parseInt(myself.style.top) - 50, 12)
        }, 500)
        //循环所有的子弹 进行调用
        function bullMove() {
            //获取到所有的子弹
            let arr = document.querySelectorAll('.zd')
            //伪数组转换成数组 以便调用数组方法
            arr = Array.from(arr)
            for (let i = 0; i < arr.length; i++) {
                //子弹移动速度 
                arr[i].style.top = parseInt(arr[i].style.top) - 5 + 'px';
                // 超出边界移除 并 清楚数组的数据
                if (parseInt(arr[i].style.top) <= 10) {
                    arr[i].remove()
                    arr.splice(i, 1)
                }
            }
        }


        // 首次打开时调用本地存储的历史记录渲染页面
        if (localStorage.getItem('history') != null) {
            history_num.innerText = localStorage.getItem('history');
        }
        // 
        history.onclick = function () {
            big_history.style.display = 'block';
            if (flag) {
                stops.innerHTML = '▶';
                flag = false;
                clearInterval(time1)
                clearInterval(time2)
                clearInterval(time3)
                clearInterval(time4)
                clearInterval(time5)
            }
            btn_back.onclick = function () {
                big_history.style.display = 'none';
                Game()
            }
        }
        //碰撞函数
        let num = 0;
        function crashCheck() {
            let myself = document.querySelector('.myself')
            //获取到所有的子弹
            let arr = document.querySelectorAll('.zd')
            //伪数组转换成数组 以便调用数组方法
            arr = Array.from(arr);
            for (let i = 0; i < SmallPlanArr.length; i++) {
                for (let j = 0; j < arr.length; j++) {
                    //子弹左边和顶部
                    let zdLeft = parseInt(arr[j].style.left)
                    let zdTop = parseInt(arr[j].style.top)
                    //地方小飞机左边和顶部
                    let smLeft = parseInt(SmallPlanArr[i].imgNode.style.left)
                    let smTop = parseInt(SmallPlanArr[i].imgNode.style.top)
                    if (zdLeft > smLeft - 20 && zdLeft <= smLeft + 50 && zdTop >= smTop && zdTop < smTop + 20) {
                        num++;
                        console.log(localStorage.getItem('history'));
                        nums.innerText = `击杀数量：${num}`
                        grades.innerText = `总 积 分：${num * 5}`
                        //判断本地存储的历史记录是否为空
                        if (localStorage.getItem('history') != null) {
                            // 判断本地存储的历史记录是否大于当前的分数
                            // 小于当前分数时替换本地存储
                            if (parseInt(localStorage.getItem('history')) < num * 5) {
                                localStorage.setItem('history', num * 5)
                                history_num.innerText = num * 5;
                            }
                        } else {
                            // 为空的话进行第一次存储记录
                            localStorage.setItem('history', num * 5)
                        }
                        arr[j].remove()
                        arr.splice(j, 1)
                        main.removeChild(SmallPlanArr[i].imgNode);
                        SmallPlanArr.splice(i, 1);
                    }
                }
            }
        }
        // 清楚历史记录
        btn_clear.onclick = function () {
            localStorage.removeItem('history')
            history_num.innerText = 0;
        }




        // 暂停游戏
        let time5 = setInterval(crashCheck, 10)
        let stops = document.querySelector('.stop')
        let flag = true;
        stops.onclick = function () {
            if (flag) {
                stops.innerHTML = '▶';
                flag = false;
                bigstop.style.display = 'block';
                clearInterval(time1)
                clearInterval(time2)
                clearInterval(time3)
                clearInterval(time4)
                clearInterval(time5)
            }
        }
        // 继续游戏
        let btn1 = document.querySelector('.btn1');
        btn1.onclick = function () {
            Game()
        }

        //继续 or 新游戏函数
        function Game() {
            stops.innerHTML = '| |';
            flag = true;
            bigstop.style.display = 'none';
            time1 = setInterval(() => {
                createsmallPlan()
            }, 1000);
            time2 = setInterval(() => {
                smallmove()
            }, 50);
            time3 = setInterval(bullMove, 10)
            time4 = setInterval(function () {
                let newBull = new bulletProto(str2, parseInt(myself.style.left), parseInt(myself.style.top) - 50, 12)
            }, 500)
            time5 = setInterval(crashCheck, 10)
        }



        let btn = document.querySelector('.btn');
        btn.onclick = function () {
            SmallPlanArr = []
            // 获取所有图片
            // 重置碰撞计数
            num = 0;
            nums.innerText = `击杀数量：0`
            grades.innerText = ` 总 积 分 ：0`
            let foes = document.querySelectorAll('.main img')
            // 移除处自己以外的所有图片
            for (let i = 1; i < foes.length; i++) {
                foes[i].remove()
            }
            Game()
        }
    }
}