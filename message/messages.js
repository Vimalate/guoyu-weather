let messages = () => {
  let hour = new Date().getHours()
  switch(hour) {
    case 6:
    case 7:
      return '早上好，今天地铁不挤吧'
    case 8:
    case 9:
      return '反正都要迟到，还是睡一天吧'
    case 10:
    case 11:
      return '刚到公司？歇会儿吧，等会就该吃饭了'
    case 12:
    case 13:
      return '中午好，如果工作太忙，那就不要吃饭了'
    case 14:
    case 15:
    case 16:
    case 17:
      return '下午好，老板说了，今天加班没跑了'
    case 18:
    case 19:
      return '还没下班？要和公司共存亡呢'
    case 20:
    case 21:
      return '晚上好，赶不上末班车？那就在公司加班到天明吧'
    case 22:
    case 23:
      return '扑你個街啊，这么晚还不睡'
    case 0:
    case 1:
      return '熬夜不好，所以我建议通宵'
    case 2:
    case 3:
      return '这个点儿了还在看手机？单身狗就是好啊'
    case 4:
    case 5:
      return '对不起，我实在是编不下去了...'
  }
};
let lyrics=()=>{
  let hour = new Date().getHours()
  switch (hour) {
    case 6:
    case 7:
      return '早上好，今天地铁不挤吧'
    case 8:
    case 9:
      return '反正都要迟到，还是睡一天吧'
    case 10:
    case 11:
      return '刚到公司？歇会儿吧，等会就该吃饭了'
    case 12:
    case 13:
      return '中午好，如果工作太忙，那就不要吃饭了'
    case 14:
    case 15:
    case 16:
    case 17:
      return '下午好，老板说了，今天加班没跑了'
    case 18:
    case 19:
      return '还没下班？要和公司共存亡呢'
    case 20:
    case 21:
      return '晚上好，赶不上末班车？那就在公司加班到天明吧'
    case 22:
    case 23:
      return '滩上的乱石，述说生不由己之事'
    case 0:
      return '忽然想念，雨落如天'
    case 1:
      return '熬夜不好，所以我建议通宵'
    case 2:
    case 3:
      return '这个点儿了还在看手机？单身狗就是好啊'
    case 4:
    case 5:
      return '对不起，我实在是编不下去了...'
  }
}
module.exports = {
  messages,
  lyrics
}