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

# Redux 略懂而已，大部分按照教程帶過

# postman 在 api 輸入 post 的 error

在終端機出現 django.db.utils.IntegrityError，後來才發現我在 model 刪掉沒有用到的 field，沒有馬上進行 makemigrations 和 migrate，做完之後就能夠 post 了

# 處理 error

處理 error，就是當輸入訊息不 valid 時，在網頁上會跳出 error 視窗，而不是單只有在 console.log 出現。我們要做的事跟處理 leads 很像，如果有 error 因為被觸發事件而產生，這會首先在 leadsActions 在 addlead 時附帶去產生的 error 訊息，一樣要進行 dispatch 發送，由 errorReducer 進行屬於 error state 的宣告，並進行將 error data 儲存於 state 中，也就是 state.errorReducer。

然後在 Alerts component 一樣透過 redux 負責將 state 放在 store 中，跟 Leads component 一樣將 state 轉化成 props，透過 connect 將 redux 中的 state 和 Alerts 連結起來。

當網頁進入生命週期 did mount 或 did update 被觸發時，觸發 Alerts props 當中的 alert.xxx()方法，這是 Alerts import withAlert 來的方法。另外， 已經將 state 投映成 props 中的 error,props.error，用 if 條件式來區分 error 中不同的 msg，來警示不同的文字訊息。

# 下載第三方套件

> npm i react-alert react-alert-template-basic react-transition-group

所在前端頁面輸入的 data，包含 error data，先辨識是何種 action 型態，是 get,post 還 delete?然後透過 reducer 來做 state 增添刪減，有點算是後台做 data 儲存，只是 redux 是用來分辨 state 哪些 data 進行增添和刪減。

如此一來，我們要隨之變動的前端頁面的組件 component，不管是 Leads 還是 errors 呈現，都是透過儲存在 state 中的 data 去撈，state 裡是什麼隨之而呈現什麼。由於 redux 的 state 中，裡頭有完整的 state，但是 redux 可以顯示 Diff，也就是只顯示有變更的 state。讓頁面重新的載入不用全部 state 都要編譯呈現，而是只要重新編譯更改過的部位，在效能上可以減少不必要的浪費。

# error:connect 和 withAlert

在 Alert.js 中，在 export default withAlert()(Alerts)要加上 connect，看底下網友留言用"export default connect(mapStateToProps)(withAlert()(Alerts))"，但是 console.log 噴出錯誤 Invaration Violation:You must pass a component to the function returned by connect. Instead received {}.用原作者的方法也不行。

後來要用 compose()來合併解決。

> import { compose } form 'redux';

> export default compose(withAlert(),connect(mapStateToProps))(Alerts)

用 compose 先將 withAlert()和 connect(mapStateToProps)合併在一起，最後才加上自己的 component (Alerts)。

compose()也稱為巢狀函式，()包裹的是函式，從右邊的函式的回傳值作為左邊函式的參數，如此一來，此函式又產生回傳值，做為更左邊函式的參數。

我認為 connect()和要輸出的 component Alerts 沒關係，要 connect 的是 mapStateToprops，然後也要輸出。

# 處理 add 後 error 的 alert，接下來處理 add 和 delete 成功後的 alert

在 reducer 新增新 file，messagesReducer。
操作方法跟 errorsReducer 類似，可以先複製裡面的內容進行修改。

在 actions 新增 file，messagesAction。

這裡的邏輯也是很像，定義 type 的名稱->定義 messagesAction 中的 createMessage(msg)函式->leadsAction 順便 dispatch createMessage(msg)，這 msg 就是我們想要跳出現的文字訊息->messagesReducer(要被 combined)->messagesReducer 的 state 改變->在 Alert 組件將 state 投映 map 成 props->在 compoentDidUpdate 因 props 改變而被觸發->定義函式，將 state 裡的 msg 拿出來 alert.success()

# part5:django token authentication

我們想要新增 login 帳號，才能進行 delete 和 create 和 update。

重新回到 project leadmanager，/leadmannger/leads/models.py。

從 django 的模組調用 User

> from django.contrib.auth.models import User

新稱 owner model，然後 makemigrations 和 migrate

到 leads/api.py

更改底下 LeadViewSet 的參數 queryset

並且修改 permissions

> permissions.IsAuthenticated

這時候進入網頁時，終端機和 console 就會噴 403，底下的 lead 物件都看不到

我們想要將 403 的 error 訊息儲存到 state 中，並且 alert error 出來，所以暫回到前端 coding

在 messageAction 新增 returnErrors 並輸出，type 使用 GET_ERROR

在 leadsAction 改掉 addLead 底下 error 處理，改用函式 returnErrors 替換，這樣就不用看到一大串的 code，在維護上面可以直接到 messageAction 的 returnErrors 修改就好。除了 addLead 的 err 處理以外，getLead 也是

改完之後，err 的訊息就會被儲存在 state，而 state 會被放在 redux 的 store 中

# register User

接下來要創建 register API，而能註冊使用者，註冊後我們會提供 login API，一旦我們登入進去會給予 token，這 token 會傳送到 headers，使有權限能夠 getLeads 和 addLeads。

接下來，要使用到已經安裝好的套件 django-rest-knox

到 leadmanager/settings.py，到 installed_apps 新增'knox'。

新增 REST_FRAMEWORK = { ... }。

之後要進行 migrate 的操作。

接下來要對於建立 user 和註冊 logging 來創建 serializers，我們不想要再 leads 這原有的 app 建立，而是另外創建 app 叫 accounts 帳戶，startapp 後一樣要到 installed_apps 新增。

# coding accounts

新增 serializers.py

首先先 focus 在 register 上，然後再搞定 logging，這裡會用 postman 來測試

新增 api.py，coding 後新增 endpoint，最後要到 leadmanager 的 urls.py 去 include

接下來，就用 postman 測試。

結果，噴 500 error，TypeError: 'type' object is not iterable

到 settings.py 的 REST_FRAMEWORK 在(xxx,)後面要多加一個,，因為輸入的是一個 tuple，若沒輸入,會被視為單一的值包()而已，就會被視為 string。

在 postman post 成功後，會得到回傳的 data，一個 user 的 data，另一個是 token，代表我們已經完成了 register 的流程。

接下來，就要進入到 login 登入的流程。

回到 serializers.py 新增 LoginSerializer，再來就是 api.py 新增 login 的部分

# 備註：user1 和 user2 後面的數字沒有什麼關係，只想區分不同的變數

# 儲存 user 在 database 是否成功

由於在 serializers.py 的 RegisterSerializer，裡面方法 create()我不小心放在 class Meta 底下，正確放的位置是是 class RegisterSerializer 底下。

所以，雖然也可以在 postman 透過 HTTP post 在我的 RegisterAPI 進行 post 來去將參數，也就是傳過來的物件 request 裡的 data，首先進行取得列器，再來將序列器進行驗證 valid，驗證符合格式就 save()到 database。

然而，因為我在 RegisterSerializer 的 create()方法放錯 class，導致沒有實際做 create()的動作。真正創建 user 這物件，要帶入已驗證的 data，將 data 的 value 值 create 成 User 物件，這個過程會將密碼雜湊化。所以沒有經過 create()的，並沒有將密碼給雜湊化。

所以，透過 HTTP post request 物件進到 LoginAPI 進行驗證?還是進到 LoginSerializer 的 validate 驗證?這邊我還不是很懂。我猜想 LoginAPI 的 serializer.is_valid()應該看使用者輸入的格式是否空白，或是輸入非英文數字，而在 LoginSerializer 的 validate()中 authenticate()方法，才是主要去辨認 username 和經過雜湊的 password，若符合 database 中的 data，就會回傳此物件；若不符合這跳出 ValidError。

# 小 error：AttributeError

在上面的程序都符合後，一樣 login，但卻跳出 500，error 訊息 AttributeError: 'function' object has no attribute 'context'。後來我將 UserSerializer()內的 context=self.get_serializer_context()此屬性刪掉，就 ok 了。

# 存取 User

coding UserAPI，然後增加 endpoint。

在 postman 用 HTTP get 去存取 User，得到 401，{ "detail": "Authentication credentials were not provided."
}

所以，要存取特定的 user，就要使用到那 User 的 token。

在 postman 的 Header 的 key 增加 Authorization 授權，並在 value 中輸入 token "金鑰密碼"

# 登出

在 urls.py 新增 logout endpoint，在 postman 使用 post，在 Header 輸入 login 後的 token， 就可以登出，回傳 204，no content 但請求成功。這時再用一樣的 token 去 get User，會被回傳 401，Unauthorized 未授權。也就是之前 login 回傳舊的 token 已無法使用，要重新 login 一次，才能夠到新的 token 去 get User。

knox_views.LogoutView 的登出機制就是，使無法驗證 token，我們將這舊的 token 破壞，所以只能再次登入才能夠得到 token。
有些人的做法是清除前端的 local storage，但這並不是真正的登出，因為登入的 token 一樣可以使用。
