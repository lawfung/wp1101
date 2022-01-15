# WebProgramming Final Project Readme

[110-1] Web Programming Final
(Group 24) 模擬交易系統

* 影片連結
    * https://www.youtube.com/watch?v=-xZ90oEKjb8
* 服務簡介:
    * 這個網站以虛擬貨幣為例，以過去的真實資料模擬交易的環境。使用者可以選定過去的一段時間、時間的尺度大小，以及要模擬的市場來進行回測。回測時會依序給出當時的市場價格，使用者可以選擇以買或賣的方式模擬做多、做空市場，回測結束後也可以去記錄區檢視自己的交易獲利的情況。
* Deployed link:
    * http://35.201.222.54/
    * 網管聯絡方式：
        * b07902136 楊子平 (可寄信或以 Facebook 聯繫)
* 使用/操作方式：
    1. 先於右上角 Register 註冊帳號
    2. Login 進入網站
    3. 選擇畫面上方的 MONITER & BACKTEST 可以檢視過去的回測歷史與開啟新的回測結果。
        * 可以於畫面左邊開啟一個新的 MONITER 或是 BACKTEST
        * 兩者都需要設定以下的參數：
            * 名稱：項目名稱。
            * 時間間距：可以選擇要模擬的最小時間刻度，有 1min, 5min, 15min, 1hr, 4hr, 1day 可供選擇。
            * 市場名稱：支援所有 FTX 交易所有有上線的美金現貨交易對，具體可以參考 https://ftx.com/markets/ ，可輸入完整的交易對名稱，或是以幣種來進行表示。舉例來說可以輸入 BTC, ETH, BNB, MATIC, DOGE, SHIB, BTC/USD, ETH/USD, SOL/USD 等。
            * 要觀測/回測的時間範圍，時間範圍要滿足在該時間段 FTX 交易所已經上線完畢。
            * 舉例來說，可以輸入：
                1. Name: BTC_Test, Start time: 2021/01/01 00:00, End Time: 2021/01/31 00:00, Asset type: BTC, Time Scale: 1 min。
                2. Name: ETH_Test, Start time: 2021/01/01 00:00, End Time: 2021/03/31 00:00, Asset type: ETH, Time Scale: 15 min。
                3. Name: XRP_Test, Start time: 2021/01/01 00:00, End Time: 2021/02/02 01:34, Asset type: XRP/USD, Time Scale: 1 day。
                4. Name: DOGE_Test, Start time: 2021/03/01 00:00, End Time: 2021/12/01 00:00, Asset type: DOGE, Time Scale: 4 hr。
                5. Name: SHIB_Test, Start time: 2021/07/07 12:00, End Time: 2021/12/31 12:00, Asset type: SHIB, Time Scale: 1 min。
        * MONITER：依照選定的時間，MONITER 會展示出時間內的指定市場的價格走勢。
        * BACKTEST：依照選定的時間回測，從選定的時間開始，可以通過按 Jump 來前進時間軸。並通過右上方的買賣按鍵來模擬交易行為。結束之後可以儲存 Record 。
   4. 選擇畫面上方的 User 可以檢視儲存的紀錄與策略
        * 於畫面左方選擇 Record，可以檢視所有交易紀錄。
            * 點擊刪除圖示可以刪除交易紀錄。
        * 於畫面左方選擇 Strategy，可以檢視所有策略名稱。
            * 點擊 Strategy 名稱，可以檢視該 Strategy 下的所有紀錄。
            * 可以點擊 Strategy 欄位的編輯/刪除圖示來編輯 Strategy 名稱或刪除該 Strategy。
        * 於畫面左方選擇 Setting 可以修改密碼。
* 使用之框架/模組/套件/程式碼
    * 前端：
        - React
        - Ant Design
        - Apollo
        - Material-UI
        - echarts-for-react
        - graphql
        - react-router-dom
        - react-cookie
        - react-sidebar-web (複製原始碼做修改，非直接 install )
    * 後端：
        - Axios
        - Bcrypt
        - MongoDB
        - Graphql-yoga
        - nodemon
        - dotenv-defaults
        - uuid
* Directory Tree
    ```
    Final
    ├── frontend
    |   ├── ......
    |   └── src
    |       ├── graphql
    |       |   └── ......
    |       ├── pages
    |       |   ├── root
    |       |   |   └── ......
    |       |   ├── home
    |       |   |   └── ......
    |       |   ├── trade
    |       |   |   └── ......
    |       |   ├── login
    |       |   |   └── ......
    |       |   ├── register
    |       |   |   └── ......
    |       |   └── switch.js
    |       └── tools
    ├── backend
    |   ├── .env.defaults
    |   └── src
    |       ├── models
    |       |   ├── cookie.js
    |       |   ├── record.js
    |       |   ├── strategy.js
    |       |   └── user.js
    |       ├── resolvers
    |       |   ├── Mutation.js
    |       |   ├── Query.js
    |       |   └── Subscription.js
    |       |── ......
    |       └── schema.graphql
    ├── eval.txt
    └── README.md
    ```
* 如何在 localhost 安裝與測試：
    * Development setting:
        * `npm version: v8.3.0`
        * `node version: v14.18.1`
        * `yarn version: v1.22.17`
    1. 於 `./backend` 底下新增 `.env` 並依造 `.env.defaults` 的格式填入 MongoDB 的 link。
    2. 在 `./` 目錄底下：
        * `npm install nodemon -g`
    3. 開啟後端，於 `./backend` 底下：
        * 先以 `yarn install` 安裝所需的套件
        * 接下來以 `yarn start` 開啟服務
    4. 開啟前端，於 `./frontend` 底下：
        * 先以 `yarn install` 安裝所需的套件
        * 接下來以 `yarn start` 開啟服務
* 每位組員之負責項目：
    * b07902136 楊子平：前端 trade page, register page, login page, header, sidebar 
    * b07902133 彭道耘：整理使用套件、後端、部署網站
    * b07902141 林庭風：前端 Homepage、後端
* 專題製作心得
    * b07902136 楊子平：對於學期最後的這個 Final Project ，我真的花費了很多時間與心力，其中最花費時間的部分就是找合適的套件並學習使用，以及調整前端的 layout 。雖然這兩個部分都真的非常耗費時間，但是完成之後會非常有成就感。另外，完整的做一個 Project 也有幫助我自己學著建立一個良好的架構，因此我覺得這學期的網路服務程式設計真的是讓我受益良多。
    * b07902133 彭道耘：完成一個前後端的服務是個蠻有趣的過程，從開發到部署整個完整的應用，也可以讓使用者體驗我們寫的網站。生活中經常使用到網站的服務，在實際製作的過程中，才發現許多使用上不會注意到的小細節，在前後端的溝通中，也還需要考慮安全性的問題，確保會不會有惡意的使用者以不當的方式向後端索取或試圖篡改資料等等，很高興修了這門相當扎實的課程。
    * b07902141 林庭風：這學期修網路服務程式設計是我第一次接觸前後端相關的領域，從一開始連 javascript 都不會寫，經過這學期多次作業、黑客松、以及 final project 的歷練，讓我學到很多架設網路服務所需要的基本技術，透過 final project 與隊友們互相合作也更加體會到溝通的重要性，以及設計網路頁面與前後端溝通的困難度，很高興有花時間修這們課，感覺收穫良多。
