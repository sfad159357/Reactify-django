開始日期：06/15
影片網址：https://www.youtube.com/watch?v=Uyei2iDA4Hs

# 安裝套件

開始指令 \$

> pip3 install pipenv

用來管理套件安裝、虛擬環境、資料庫 CLI 關聯，丟棄了 requirements.txt 環境配置，取而代之的是 pipfile，如果透過 pipenv install 任何套件，就會被自動修改在 pipfile 當中。

> pipenv shell，在自己的資料夾創建 pipfile。會直接在你的 folder 底下創建虛擬環境。

> p pipenv install django djangorestframework django-rest-knox

安裝這三個項目，最後一項是用來 django 做驗證。安裝完後，會將這個項目的套件自動更新在 pipfile。同時也創建 pipfile.lock，底下有紀錄其套件在版本中的依賴性。

# 建立專案和 app

建立專案:leadmanager -> 建立 app:leads -> 到 settings 的 installed app 新增'leads','rest_framework'

建立 lead 之 model.py 中相關的 fields 後，這只是建立 file，然後要做 makemigrations，將變更的記錄下來類似 commit -> migrate，在資料庫建立 model，其他相關 permission 或 user 也會被 migrate 到 sql 中。

# 建立 serializers.py

serializer，能將複雜的 data 像是 qurey sets 和 model instances 轉換成 python data 型態，就可以容易被 render 成 JSON 和 XML。就會變成一種 JSON API。

建立類別 LeadSerializer，調用 rest_framework 的模組 serializers，繼承 serializers.ModelSerializer，將 Lead model 序列化

# 建立 api.py

調用 rest_framework 中模組 viewsets, permission，建立 api view:LeadViewSet 繼承 viewsets 中的 ModelViewSet，新增屬性 queryset, permission_classes, serializer_class

# 建立 urls.py

首先在 leadmanager.urls.py 新增 path，include(leads.urls")，在 leads 下創建 urls.py，這裡不用 path，而是用 router，調用 rest_framework 中模組 routers
，先預設化 router，進行 router resgister 註冊要附加 url 路徑，哪個 viewset 做虛列化運算，name。

再來新稱 urlpattern = router.urls。

到這邊已經有基本的 CRUD 的基本功能。

# error1:That port is already in use.

當我要 runserver，跳出 error:That port is already in use.的訊息，因為http://127.0.0.1:8000/

這個網址原本是我上一個 django 專案的網址，所以 port 需要改成不一樣，或是要把原本的 port 砍掉。

我用 port8080 來更換，python manage.py runserver 8080 來變更

# postman 測試

用 postman 測試 get，應該會跑出個[]，但是卻跑出一堆 html 程式碼，原來在 leadmanager.urls 底下的 urlpatterns 中，path('', include(leads.urls))要放在第一個索引，這樣 lead 的 prls.py 中 router.urls 才能夠順利附加上去/api/leads。

用 post，記得http://localhost:8080/api/leads/

最後面要記得加/。

## 補充: IDE 小問題

code 在 api.py 的 Lead 底下出現紅頗浪線，訊息：Class 'Lead' has no 'objects' member。在 vs code 底下的 setting.json 物件內新增:

> "python.linting.pylintArgs": [

        "--load-plugins=pylint_django"

]

# 建立前端 app 和資料夾

創建 app frontend

> python manage.py startapp frontend

 新增資料夾

> mkdir -p ./frontend/src/components

等於同時創建 static 和 templates 資料夾

> mkdir -p ./frontend/{static,templates}/frontend

-p，還不明瞭是啥意思

components 負責 react app 和 redux, template ｓ負責處理 index.html, static 負責放置被編譯的 javasrcipt。

index.js 會在 components 作為 entry point，然後會編譯 compile 成 main.js 在 static

\$ cd ..，

創建 package.json 來看自己的 javasrcipt 依賴性

> npm init -y

使用 node.js 安裝 webpack 和 webpack-cli。-D，dev dependency

> npm i -D webpack webpack-cli

安裝完後在 package.json 就可以看到 webpack 和 webpack-cli 的 dependency。

babel，用來負責轉譯 javasrcipt，像是 ES5 2015 較新的特徵 feature 和之後。

安裝 babel

> npm i -D @babel/core babel-loader @babel/preset-env @babel/preset-react babel-plugin-transform-class-properties

@babel/core，是一個 package，使用 webpack 必須使用 babel loader 來轉譯 code。

接下來要安裝 react,react-dom,prop-types

> npm i react react-dom prop-types

react-dom 負責展示我們的 app 到瀏覽器上。

為了要能使用兩組 preset 和 plugin，在專案目錄底下新增.babelrc 檔，裡頭是 json 格式，將套件輸入到裡面。

接下來要創建 webpack config file，在專案目錄底下新增 webpack.config.js，然後進行編程。

在 package.json 要有一組 srcipts 腳本，因為需要去編譯 complie 在前端的 react app。將"scripts"下的"test"換成"dev"，內容改成"webpack --mode development ./leadmanager/frontend/src/index.js --output ./leadmanager/frontend/ststic/frontend/main.js"

這樣 main.js 會變成實際編譯後的 javasrcipt，也就是在 inde.html 的 template

再來複製整段"dev"，然後再貼上，將"dev"改成"build"，內容裡將"development"改成"production"

當我們想要為了開發去編譯 react app，我們可以在瀏覽器去檢視可以下$ npm run dev，當我們準備好部署deploy，可以下$ npm run build，就像是你 create react app。

接下來創建 index.js 和 main.js

在 leadmanager/frontend/src/components 創建 App.js，而在 leadmanager/frontend/src/下創建 index.js，記住，不要搞錯位置，會有問題，分別進行編程

接下來在 templates 底下創建 index.html，之後 main.js 是在 static 底下，之後會在 npm run build 的時候生成。

去到 bootswatch 找尋客製化的 CSS 檔，複製網址到 index.html。再去到 getbootstrap 中的 JS 複製三行 code。

接下來去，setting.py 的 installed app 新增'frontend'，然後去 frontend/views.py coding。之後創建 urls.py 去連結 views.index()的 view，在去到 main urls.py 進行 include()。

# npm run

接下來，開始 run

> npm run dev

沒有出現 error 後，npm 就會在 static/frontend 底下 output 出 main.js，這就是我們所編譯出的 app。

去到 settings 的 template 的 DIR=[]，新增相對路徑 os.path.join(BASE_DIR, 'frontend/templates/frontend'))

## 小插曲

輸入網址http://127.0.0.1:8080/跑看看，結果只有title有換成Lead Manager，但頁面卻沒有跑出 React App 文字。原來是我還沒把 template 中 DIR 設定好，我就去 npm run dev，output 會參考 template 的 index.html 作為 entry(我在 package.json 的 script 下設定的)，但是在 setting 路徑沒設定好，而 index.html 將 main.js 作為樣板標籤，所以頁面沒顯示出來。

後來，重新設定 settings 樣板參考路徑，砍掉原本的 main.js，再 run 一次 npm run dev，這是 output 出來的 main.js 才是正確的。

# 進入 redux

在 components 下創建 layout(佈局)資料夾，然後再底下創建 header.js，安裝擴充套件:ES7 React/Redux/GraphQL/React-Native snippets

去到 bootstrap－> Components -> navbar -> Toggler 複製 code 到 header.js，標籤內的 class 無法使用，因為我們使用的是 JSX，要改成 className，其他 form,li 的標籤拿掉，其他作微調。更改後 export Header，在 APP.js import Header，由於 index.js 是調用 App.js，而 main.js 又受到 index.js entry 影響，index.html 使用 main.js 的樣板標籤，所以必須要再 npm run dev，重新 output 更改後的 main.js。

## 無法更新頁面問題

重 run dev 後，重新導向網頁，發現頁面內容一樣是 React App，怎麼改都一樣。後來試試用別的 port 改 8087，終於產生新的頁面內容。

如果再 package.json 的 scripts 下的 dev 那行 code：... development 新增--watch，就又變成動態監測你更改的內容，不用更改後一直要 npm run dev 了。

# 創建 leads 資料夾

在 lm/ft//src/cpn/底下創建 leads 資料夾，分別創建 Dashboard, Form, Leads 的 js 檔。

Dashboard，儀表板。用來展現其他 js 的狀態，屬於功能組件 functional component，

分別對三個 js 檔進行 coding，Dashboard 調用 Leads, Form，最後 App.js 再調用 Dashboard，進行 coding。

最後重新載入頁面，新增 Leads 和 Form 內容。

## 安裝擴充套件：Prettier-Code formatter

到 vs code 的 settings，搜尋 format on save，將選項勾選，這樣排版跑掉的，一旦 cmd+s 後就可以自動幫忙排版。

## 備註：重開起 IDE，記得要重啟虛擬環境

> pipenv shell

()裡面是要你的專案資料夾

可能會沒反應，就要重安裝套件

> pipenv install django djangorestframework django-rest-knox

好了，之後就能夠 runserver 了

## 安裝 google 擴充套件：Redux DevTools

# 開發 redux

安裝 redux 和 react-redux 套件：

> npm i redux react_redux

安裝 redux-thunk，是一種 middleware，可以從 action 發出異的請求。

> npm i redux-thunk

安裝 redux-devtools-extension

> npm i redux-devtools-extension

applyMiddleware 來自於 redux-thunk

## 小插曲 2

在 App.js 輸入完<Provider>後，然後重新整理頁面，頁面內容變空白，控制台底下跳出 error:Cannot read property 'shape' of undefined。在 redux dev tool 也看不到 store。

答案：要安裝 react-redux@5.0.6 ，是版本問題，導致 Provider 無法新增 store 到 props 中

> npm i react-redux@5.0.6

## 安裝產生 HTTP method 請求的套件

> npm i axios

# Redux 有一半搞不懂在幹嘛，大部分按照教程帶過

# postman 在 api 輸入 post 的 error

在終端機出現 django.db.utils.IntegrityError，後來才發現我在 model 刪掉沒有用到的 field，沒有馬上進行 makemigrations 和 migrate，做完之後就能夠 post 了

# 處理 error，下載第三方套件叫 react alert
