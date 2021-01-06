開始日期：2020/06/15
結束日期：2020/07/07
影片網址：https://www.youtube.com/watch?v=Uyei2iDA4Hs
教程主題：Full Stack React & Django
教程作者：Traversy Media

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

用 postman 測試 get，應該會跑出個[]，但是卻跑出一堆 html 程式碼，原來在 leadmanager.urls 底下的 urlpatterns 中，path('', include(leads.urls))要放在第一個索引，這樣 lead 的 urls.py 中 router.urls 才能夠順利附加上去/api/leads。

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

在 App.js 輸入完\<Provider>後，然後重新整理頁面，頁面內容變空白，控制台底下跳出 error:Cannot read property 'shape' of undefined。在 redux dev tool 也看不到 store。

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

Register 流程：
postman POST (headers, body)-> RegisterAPI -> data serializer 化 -> serializer 驗證後.save() -> 使用者資訊註冊在後台的 db。

# loginAPI

接下來，就要進入到 login 登入的流程。

這裡跟 registerAPI 很像，只差在 registerAPI 有 save()這個存 data 的動作。透過 loginAPI 主要要獲得 user 的 data，以及透過取得 token 來分辨 state 中是否有 authenticated。透過 true，來導入可存取的頁面。

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

在 urls.py 新增 logout endpoint，在 postman 使用 post，在 Header 輸入 login 後的 token， 就可以登出，回傳 204，no content 但請求成功。這時再用一樣的 token 去 get User，會被回傳 401，Unauthorized 未授權，。也就是之前 login 回傳舊的 token 已無法使用，回傳訊息{
"detail": "Invalid token."
}，要重新 login 一次，才能夠拿到新的 token 去 get User。

knox_views.LogoutView 的登出機制就是，使無法驗證 token，我們將這舊的 token 破壞，或是說改變當初 LoginAPI 設定的 token，你所持有舊的 token 將對照不起來，而取消授權，所以只能再次登入才能夠得到新的 token。
有些人的做法是清除前端的 local storage，但這並不是真正的登出，因為只要重新輸入原本登入的 token，一樣可以使用。

# 回到前端 component，針對認證和登入狀況進行 coding

安裝 react route dom version4

> npm i react-router-dom@4.3.1

在 App.js 進行 import { BrowserRouter }

一般來說，我們點了連結會載入到 login 頁面，但是當我們重新載入瀏覽器時，系統將會向 server 尋找叫做"login"的頁面，這是我們不希望發生的，為了避免這樣的狀況發生，可以去部署 patchy 補丁等。

在這裡我們改 import {HashRouter}，另外 import {Route, Switch, Redirect } from 'react-route-dom'

然後用\<Router>將\<Fragment>包起來

# event.preventDefault()的概念

event.preventDefault()，顧名思義就是事件產生了，預防預設行為，任何有 DOM 本身的功能都會取消。比如\<a href="xxx" id="click">點擊其文字，他的 DOM 功能就是跳轉到連結頁面，但是如果只是想執行 onClick 點擊來觸發事件，不想要進入連結，就可以在 document.getElementById('click').onClick = (event) => { event.preventDefault() }，加入此方法來取消 DOM 預設行為。

# 增加 Login 和 Register 兩 component

分別在 components 的 accounts 的新增 Login.js 和 Register.js，所要做的事情跟 Form.js 很像，就是有輸入框要輸入，按 submit 按鈕。

另外，在 Header 中加入此這兩個組件的 link，就能在 nav bar 右上角浮現 Register 和 Login 兩連結。然後 navbar 用\<div classNmae='contaner'>包住。

最後在 App.js 中，在\<Switch>內使用\<Route exact link="/xxx" component={yyy}>，使組件之間透過不同的 link 來作切換。

# 新增 authReducer 加入到 Redux 底下的 state

 新增 authReducer，裡面創建初始 stateinnitialState={ token:localStorage.getItem("token"), isAuthenticated:null，isLoading:false, user:null
}
然後輸出函式，做法跟 leadReducer 很像，一樣進行對於 action.type 的 switch case。

# 隱藏 Dashboard 組件

我們並不想在還沒有登入的情況下，讓使用者一進首頁就看到 Dashboard 組件，也就是直接 Forms(Add Lead)和 Leads 組件。要用 private route。

在 components 底下新增 folder "common"，其底下新增 file "PrivateRoute.js"。對於標準的 route，有點像是某種 proxy，但除了我們想去檢查 user 是否登入。

PrivateRoute，是一種 functional component，其參數是一個物件，物件內首先參 1 是我們要隱藏的 component 就是 Dashboard，參 2 是從 Redux 中的 state 帶入的，參 3 是...rest。

# 檢查 user 是否認證過

我們想要去 check user 是否是 authenticated，如果有 token，我們取得 token 並發送 USER_LOADED action，如果沒有 token 則發送 GET_ERRORS action，回傳 error state，也就是 error message(ex:"Authentication credentials were not provided.")和 error status(ex:401)。

另外，發送 AUTH_ERROR action。目的是要將 auth state 的狀態更新成初始狀態。

而一開始的 action 都有個 USER_LOAING。

最後在 App.js 中，透過生命週期 componentDidMount()去觸發，從 store 去 dispatch()函式 loadUser()。一旦載入到頁面，就觸發 loadUser()。

可以在 Redux 的 Actions 中看到。

# 進行 login

在 authAction 中，新增函式新增 login()，其參數 username, password。另外，要帶入前端提交到後台的格式，如 config 中的 headrs 和 body，前者是內容型態 application/json，後者是要帶入的字串化 JSON，也就是我們所輸入的參數包成 JSON 後字串化。

再來就是透過 axios 使用 post HTTP 方法經由 urls 到我們所提供的 api:"api/auth/login"，這才是真正 login 的動作，在 api 中的 LoginAPI 進行名稱和密碼的驗證，如果合格，就會回應經由序列化 User 的 data 得到 user 和從 knox 模組中的 AuthToken 取得 token，{"user", "token"}

得到參數 res，發送 LOGIN_SUCCESS 狀態，也發送 res.data。如果接收到錯誤，發送 GET_ERROR(400，"Incorrect Credentials")和 LOGIN_FAIL 狀態(因為使用者名稱和密碼驗證不過，拿不到 token，isAuthticated = false，無法順利進去 PrivateRoute 的 Dashboard)

 然後在 Login component 調用 login()，然後將 state map to props，將兩者透過 connect 連結到 Redux 內的 state。透過 login 這個按鈕的 submit 互叫 this.props.login()來觸發 login 行為。

觸發 login()這 action 後會進行 tpyes 和 payload 的發送，會由 authReducer 去分辨 action 的類型進行 switch case，重新包裝整理 payload 資料，重新回傳新的 state 到 Redux 上。

Redux 分辨哪些是更新後的 state，再經由 Login 這 component 中 render()函式，帶入條件式(this.isAuthenticatedProp)，也就是 Redux 將更新後的 state 掛載 Login 組件的 props 上，透過 props 的變更，去觸發重新導向 Dashboard 頁面的動作\<Redirect to="/" />，這種方式和網頁生命週期的 componentDidMount()很像，但是後者是先 props 更新，才觸發 componentDidMount()掛載組件。前者則是在 render()下條件被觸發，進行條件式。

# 反推回去

至於 isAuthticatedProps(state.authReducer.isAuthenticated)在哪個地方時就被轉換成 true 呢？

state 狀態是前端處理，在 authReducer 就回傳 true，是由於得到的 action.type === LOGIN_SUCCESS。

至於為什麼 authAction 的 login()能發送出登入成功的 type?

是由於成功得到 response，否則就是得到 catch error。

從哪裡來得到的 response 呢?

login()函式內的 axios.post()發送 headers 內 Content_Type、body 中的使用者名稱和密碼經由"api/auth/login"路徑，傳送至我們設定的 LoginAPI 內，這傳送的 data 就是 request 的 data。經由序列化後，進行驗證，驗證合格後，就會 Response 回應指定 user 的 data 和專屬於此 user 的 token。

# 登出後的機制

能在 LoginAPI 得到 token 代表，state.authReducer.isAuthenticated = true，透過此條件式，讓我們能夠順利進去 Dashboard 此私人路徑。如果要登出，就要在 postman 輸入路徑"api.auth/logout"，方法 post，並且要輸入此 user 的 token，才能夠順利登出，回傳 204。

由於我還沒設計登出時跳轉回去 Login 頁面，所以我必須手動重新整理頁面，由於後台對照 token 的值被 logout()給改變，就算持有原本的 token 也無效。當重新導向"/"時，首先會呼叫 App 中的 loadUser()這個 action，會發送原本的 token 及 headers 的參數經由"api/auth/user"進入 UserAPI。如果要存取 User 內的物件是要 Authenticated，表示要對照 token。但由於 db 內部的 token 被 knox 模組的 LogoutView()改變，拿舊有的 token 就對照不起來，此時就 get 不到 user 物件。

loadUser()就不會發送 USER_LOADED，改 catch 到 error，然後發送 GER_ERROR 和 AUTH_ERROR，此時 authReducer 就同時接收到這兩個 type，前者回傳 error status(401)和 error message("detail": "Authentication credentials were not provided.")；後者就會將 state.authReducer 重置 null 跟 false 狀態，isAuthenticated = false，導致無法進入 PrivateRoute 的 Dashboard，跳轉至 Login 頁面。

# Diff 的差異

這邊有個小細節：重新導向後，authState 的 Diff，並非從登入後 isAuthenticated:true 變成登出後 isAuthenticated:false，而是又會重新跑流程一遍，也就是從起始 initialState 的 isAuthenticated:null，驗證 user 不過， 在 AUTH_ERROR 被設置為 isAuthenticated:false。

# 沒登出的 reload

而 token 在 initialState 中是再次去取得原本的 token，起始值並沒有設定為 null，這代表沒有登出後的重新導向，isAuthticated 雖然被初始化成 null，但後台的 token 的值並沒有改變，一樣能夠在 UserAPI 對照起來，所以 loadUser()就會發送 USER_LOADED type 的 action，因為 USER_LOAED 的 type，在 authReducer 中 isAuthenticated 被設置成 true，所以 Diff 中 isAuthenticated:null -> true，user 也是從 null -> {id:xx, username:'yyy',... }。

# LOGIN_SUCCESS 和 USER_LOADED 還是會 GET_ERRORS

在成功登入後和重新導向後順利載入 USER，還是會跳出 GET_ERROR，{401,"Authentication credentials were not provided."}。
發現這個 error 是從 api/leads/而來。所以判斷這個 GET_ERROR 是從 leadsAction 的 getLead()發送的，原因是當初在設定 Leads 的 API，LeadViewSet，要做 Leads 的物件的存取，也有個 permissions，必須要 isAuthenticated = True 才行。

透過取得 LoginAPI 或 RegisterAPI 得到 Response，action.type 就會傳遞 LOGIN_SUCCESS 或 REGISTER_SUCCESS，回傳新的 state，透過 isAuthenticated 轉 true，進行一開始進入頁面的授權，使用者身份就被允許進入到 Dashboard 此頁面。實際並沒有傳遞 token 這動作，來取得授權。

然而，get,add,delete leads 的存取需要授權。這些授權必須再經由後端的認證才能夠對後台的 database 進行資料的存取。這個時候真的需要傳遞 token，來進行驗證，驗證通過得到授權。這個步驟留到最後在新增。

# 登入後隱藏 Register 和 Login

因為已經登入了，我們要將 Header 右上角 Register 和 Login 連結隱藏，在 render()函式內宣告常數 authLink 和 guestLink，authLink 是登入後右上角顯示出按鈕 Logout，而 guestLink 顯示 Register 和 Login，透過條件式，判斷 isAuthenticated，來決定顯示哪個連結。

# 註記:PropTypes

由於 javasrcipt 是若型別，在編輯時不會跳出錯誤，而是在編譯時會跳出錯誤。PropTypes 是用來輔助開發的工具，我們將 props 附加上型別，如果我們輸入的型別有誤，在 console 就會顯示出錯誤

# 新增 logout() action

這裡面的 code 基本上和 loadUser()或 login()很類似，就不贅述了。
他的觸發條件是，在\<button onClick={this.props.logout}>這邊要注意的是，在標籤內的變數{}中的函式不用去加()，我猜想是因為 onClick 本身是個觸發條件，觸發後就會主動去呼喚 logout，像是 onSubmit 也是。

最後，登出成功後，發送 action.type = LOGOUT_SUCCESS，將所有狀態設成 false, null，token 移除。同時後台也將 token 摧毀。

# 登入錯誤，alert 提醒

在登入時，輸入不對的帳密，在 console 會丟出 400 bad request，"Incorrect Credentials"，而在 Redux 的 Action 會顯示 LOGIN_FAIL，但是使用者都看不見，需要用 alert 提醒使用者。

在 Alerts component 新增 if 條件式，登入錯誤時 error.msg.non_field_errors 多出這個字串屬性。

特別開創個 Alerts component 有個好處，就是 alerts 集中管理，不需要在需要的 component 到處設 alert，而且還從 Redux 撈 error state 的 data 上來，轉換成訊息。

# 登入成功，顯示使用者名稱

我們可以使用 Header 的 authLink，在右上角顯示 username。

# 實作註冊 Register 功能

在 authAction 新增 register()，基本上和 login 大同小異。

在 authReducer，REGISTER 型態的 case 也是和 LOGIN 型態一樣，

首先，在 Register 中的 onSubmit 進行 password 和 password2 檢查是否相等，若不相等 createMessage，製造訊息物件，然後在 Alerts 內，透過訊息是否出現作為判斷式，來 alert error。

另外，如果註冊 username 但已經註冊過了，也在 Alerts 附加 error.msg.username。

註冊成功後，會回傳 200。而我們要直接跳轉到 Dashboard，做法跟 login 一樣，透過 connect，將 state.authReducer.isAutheticated 連結到 Redux，透過掛載到 Register 的 props，if 判斷 isAuthenticatedProp 為 true，回傳 component \<Redirect to="/">，跳轉到 Dashboard。

# 解決 leads 授權的問題

其實很簡單，問題在於存取 leads，並沒有在 axios 帶入 headers,token 的 config，沒有 token，就一樣無法 get, delete, post 等 HTTP 方式存取 leads。所以調用 tokenConfig 並帶入到 axios。要注意的是，getLeads, deleteLeads, addLeads 函式中裡參數除了有帶入 dispatch 方法，還有 getState 方法。在 tokenConfig()內要帶入 getState，要透過 getState 來取得 state 中 authReducer 的 token。
有了 token，就可以被授權存取 leads。

透過 knox 此模組來管理 token，我們能夠透過 token，就都能夠存取 permission.isAuthenticated。

# 結束

# 後續：串接 MySQL

參考自：https://www.youtube.com/watch?v=0IKuKk8ubf0
影片主題：Django 如何連結 MySQL (docker) - PART 1
影片作者：沈弘哲

安裝 PyMySQL 這個 Library，請執行以下指令

> pip install PyMySQL

PyMySQL 版本：0.9.3

以及 mysqlclient 這個 Library，請執行以下指令

> pip install mysqlclient

mysqlcient: 2.0.1

# docker -> mysql root password:

123456

# 重開 vs code 記得重新建立虛擬環境

> pipenv shell

# 在 setting 改完 mysql 前，要安裝 mysqlclient

> pipenv install mysqlclient
