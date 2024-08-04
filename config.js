// config.js
const surveyConfig = {
    title: "您的問卷標題",
    questions: [
        {
            text: "您最喜歡的水果是什麼？",
            maxSelect: 2,
            options: [
                { text: "蘋果", image: "apple.jpg" },
                { text: "香蕉", image: "banana.jpg" },
                { text: "橘子", image: "orange.jpg" },
                { text: "草莓", image: "strawberry.jpg" }
            ]
        },
        {
            text: "您平常使用哪些交通工具？",
            maxSelect: 3,
            options: [
                { text: "汽車", image: "car.jpg" },
                { text: "公車", image: "bus.jpg" },
                { text: "自行車", image: "bicycle.jpg" },
                { text: "捷運", image: "metro.jpg" },
                { text: "步行", image: "walk.jpg" }
            ]
        }
    ]
};