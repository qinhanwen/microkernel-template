import Core from '@/core/index';

let plugin1 = function(){
    // TODO
    // do something
    console.log('plugin1 do something');

    // 在插件的整个声明周期中，添加监听主题，在某个时机点触发
    this.on('event', ()=>{
        // TODO
    })

    // 插件销毁的时候可以主动销毁 setTimeout、setInterval 等等
    this.once('destroy', ()=>{
        // TODO
    })
}

// 安装插件
Core.install('plugin1', plugin1);