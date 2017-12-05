import han from 'han';

// Function to compare if two characters are pinyin-equivalent
export function charactersPinyinEquivalent(char1, char2) {
  // Get list of possible pinyin representations for char1
  const pinyin1 = han.pinyin(char1)[0];

  // Get list of possible pinyin representations for char2
  const pinyin2 = han.pinyin(char2)[0];

  // Two characters are pinyin-equivalent if they share at least one
  // pinyin representation
  return pinyin1.some((x) => pinyin2.indexOf(x) >= 0)
}


// Function to compare if two words are pinyin-equivalent
export function wordPinyinEquivalent(word1, word2) {
  // Two words are pinyin-equivalent if all characters are pinyin-equivalent
  if (word1.length !== word2.length) {
    // If words are not of the same length, they can't be pinyin-equivalent
    return false;
  } else {
    const charlist1 = word1.split('');
    const charlist2 = word2.split('');

    return charlist1.every(
        (char1, index) => charactersPinyinEquivalent(char1, charlist2[index])
    );
  }
}

// Web Speech API
const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const SpeechGrammarList = window.SpeechGrammarList || window.webkitSpeechGrammarList;
const SpeechRecognitionEvent = window.SpeechRecognitionEvent || window.webkitSpeechRecognitionEvent;
const SpeechSynthesis = window.speechSynthesis;


// Function to get chinese voice
function getVoice() {
  const voices = SpeechSynthesis.getVoices();

  const betterVoice = voices.find(
    (voice) => voice.lang == 'zh-CN' && !voice.default
  );

  const fallbackVoice = voices.find(
    (voice) => voice.lang == 'zh-CN' && voice.default
  );

  return (!!betterVoice) ? betterVoice : fallbackVoice;
}


// Function to say words
export function say(word) {
  const voice = getVoice();
  const utterance = new SpeechSynthesisUtterance(word);
  utterance.voice = voice;
  utterance.rate = 0.7;
  return SpeechSynthesis.speak(utterance)
}



// Promise to transcribe from voice
export function transcribeVoice(language='zh-cn') {
  const recognition = new SpeechRecognition();
  const speechRecognitionList = new SpeechGrammarList();

  recognition.lang = language;
  recognition.interimResults = false;
  recognition.maxAlternatives = 1;

  return new Promise((resolve, reject) => {
    recognition.onresult = (event) => {
      const last = event.results.length - 1;
      const word = event.results[last][0].transcript;
      resolve(word);
    };

    recognition.onspeechend = () => {
      recognition.stop();
    };

    recognition.onnomatch = (event) => {
      reject('Sound not recognized');
    };

    recognition.onerror = (event) => {
      reject(event.error);
    };


    recognition.start();
  });
}


export const topics = [{
  name: 'HSK Level 1',
  lexicon: [
    "爱", "八", "爸爸", "杯子", "北京", "本", "不", "不客气", "菜", "茶", "吃",
    "出租车", "打电话", "大", "的", "点", "电脑", "电视", "电影", "东西", "都",
    "读", "对不起", "多", "多少", "儿子", "二", "饭店", "飞机", "分钟", "高兴", "个",
    "工作", "狗", "汉语", "好", "号", "喝", "和", "很", "后面", "回", "会", "几",
    "家", "叫", "今天", "九", "开", "看", "看见", "块", "来", "老师", "了", "冷",
    "里", "六", "妈妈", "吗", "买", "猫", "没关系", "没有", "米饭", "名字", "明天",
    "哪", "哪儿", "那", "呢", "能", "你", "年", "女儿", "朋友", "漂亮", "苹果", "七",
    "前面", "钱", "请", "去", "热", "人", "认识", "三", "商店", "上", "上午", "少",
    "谁", "什么", "十", "时候", "是", "书", "水", "水果", "睡觉", "说", "四", "岁",
    "他", "她", "太", "天气", "听", "同学", "喂", "我", "我们", "五", "喜欢", "下",
    "下午", "下雨", "先生", "现在", "想", "小", "小姐", "些", "写", "谢谢", "星期",
    "学生", "学习", "学校", "一", "一点儿", "衣服", "医生", "医院", "椅子", "有",
    "月", "再见", "在", "怎么", "怎么样", "这", "中国", "中午", "住", "桌子", "字",
    "昨天", "坐", "做"
  ]
}, {
  name: 'HSK Level 2',
  lexicon: [
    "吧", "白", "百", "帮助", "报纸", "比", "别", "宾馆", "长", "唱歌",
    "出", "穿", "次", "从", "", "打篮球", "大家", "到", "得", "等", "弟弟", "第一",
    "懂", "对", "对", "房间", "非常", "服务员务", "高", "告诉", "哥哥", "给",
    "公共汽车", "公司", "贵", "过", "还", "孩子", "好吃", "黑", "红",
    "火车站", "机场", "鸡蛋", "件", "教室", "姐姐", "介绍", "进", "近", "就",
    "觉得", "咖啡", "开始", "考试", "可能", "可以", "课", "快", "快乐", "累", "离",
    "两", "零", "路", "旅游", "卖", "", "忙", "每", "妹妹", "门", "面条", "男",
    "您", "牛奶", "女", "旁边", "跑步", "便宜", "票", "妻子", "起床", "千", "铅笔",
    "晴", "去年", "让", "日", "上班", "身体", "生病", "生日", "时间", "", "手表",
    "手机", "说话", "送", "虽然", "但是", "它", "踢足球", "题", "跳舞", "外", "完",
    "玩", "晚上", "往", "为什么", "问", "问题", "西瓜", "希望", "洗", "小时", "笑",
    "新", "姓", "休息", "雪", "颜色", "眼睛", "羊肉", "药", "要", "也", "一起",
    "一下", "已经", "意思", "因为", "所以", "阴", "游泳", "右边", "鱼", "远", "运动",
    "再", "早上", "丈夫", "找", "着", "真", "正在", "知", "准备", "走", "最", "左边"
  ]
}, {
  name: 'HSK Level 3',
  lexicon: [
    "阿姨", "啊", "矮", "爱好", "安静", "把", "班", "搬", "办法", "办公室", "半",
    "帮忙", "包", "", "北方", "被", "鼻子", "比较", "比赛", "笔记本", "必须", "变化",
    "别人", "冰箱", "不但", "而且而", "菜单", "参加", "草", "层", "差", "超市",
    "衬衫", "成绩", "城市", "迟到", "除了", "船", "春", "词典", "聪明", "打扫",
    "打算", "带", "担心", "蛋糕", "当然", "地", "灯", "地方", "地铁", "地图",
    "电梯", "电子邮件", "东", "冬", "动物", "短", "段", "锻炼", "多么", "饿", "耳朵",
    "发", "", "发现", "方便", "放", "放心", "分", "附近", "复习", "干净", "感冒",
    "感兴趣", "刚才", "个子", "根据", "跟", "更", "公斤", "公园", "故事", "刮风",
    "关", "关系", "关心", "关于", "国家", "过", "过去", "还是", "害怕",
    "黑板", "后来", "护照", "花", "花", "画", "坏", "欢迎", "还", "环境", "换",
    "黄河", "回答", "会议", "或者", "几乎", "机会", "极", "记得", "季节", "检查",
    "简单", "", "健康", "讲", "教", "角", "脚", "接", "街道", "节目", "节日",
    "结婚", "结束", "解决", "借", "经常", "经过", "经理", "久", "旧", "句子",
    "决定", "可爱", "渴", "刻", "客人", "空调", "口", "", "裤子", "筷子", "蓝",
    "老", "离开", "礼物", "历史", "脸", "练习", "辆", "聊天", "了解", "邻居邻",
    "留学", "楼", "绿", "马", "马上", "满意", "帽子", "米", "面包", "明白", "拿",
    "奶奶", "南", "难", "难过", "年级", "年轻", "鸟", "努力", "爬山", "盘子", "胖",
    "皮鞋", "啤酒", "瓶子", "其实其", "其他", "奇怪", "骑", "起飞", "起来", "清楚",
    "请假", "秋", "裙子", "然后", "热情", "认为", "认真", "容易", "如果", "伞",
    "上网", "生气", "声音", "世界", "试", "瘦", "叔叔", "舒服", "树", "数学",
    "刷牙", "双", "水平", "司机", "太阳", "特别", "疼", "提高", "体育", "甜", "条",
    "同事", "同意", "头发", "突然", "图书馆", "腿", "完成", "碗", "万", "忘记",
    "为", "为了", "位", "文化文", "西", "习惯", "洗手间", "洗澡", "夏", "先",
    "相信", "香蕉", "向", "像", "小心", "校长", "新", "新鲜", "信用卡", "行李箱",
    "熊猫", "需要", "选择", "要求", "爷爷", "一般", "一边", "一定", "一共", "一会儿",
    "一样", "一直", "以前", "音乐", "银行", "饮料", "应该", "影响", "用", "游戏",
    "有名", "又", "遇到", "元", "愿意", "月亮", "越", "站", "张", "长", "着急",
    "照顾", "照片", "照相机", "只", "只", "只有", "才", "中间", "中文", "终于",
    "种", "重要", "周末", "主要", "注意", "自己", "自行车", "总是", "嘴", "最后",
    "最近", "作业"
  ]
}];
