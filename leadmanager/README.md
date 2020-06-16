開始日期：06/15
影片網址：https://www.youtube.com/watch?v=Uyei2iDA4Hs

# 安裝套件

開始指令 $
>pip3 install pipenv

用來管理套件安裝、虛擬環境、資料庫CLI關聯，丟棄了requirements.txt環境配置，取而代之的是pipfile，如果透過pipenv install任何套件，就會被自動修改在pipfile當中。

>pipenv shell，在自己的資料夾創建pipfile。會直接在你的folder底下創建虛擬環境。

>pipenv install django djangorestframework django-rest-knox

安裝這三個項目，最後一項是用來django做驗證。安裝完後，會將這個項目的套件自動更新在pipfile。同時也創建pipfile.lock，底下有紀錄其套件在版本中的依賴性。

# 建立專案和app

建立專案:leadmanager -> 建立app:leads -> 到settings的installed app新增'leads','rest_framework' 

建立lead之model.py中相關的fields後，這只是建立file，然後要做makemigrations，將變更的記錄下來類似commit -> migrate，在資料庫建立model，其他相關permission或user也會被migrate到sql中。

# 建立serializers.py

serializer，能將複雜的data像是qurey sets和model instances轉換成python data型態，就可以容易被render成JSON和XML。就會變成一種JSON API。

建立類別LeadSerializer，調用rest_framework的模組serializers，繼承serializers.ModelSerializer，將Lead model序列化

# 建立api.py

調用rest_framework中模組viewsets, permission，建立api view:LeadViewSet繼承viewsets中的ModelViewSet，新增屬性queryset, permission_classes, serializer_class

# 建立urls.py

首先在leadmanager.urls.py新增path，include(leads.urls")，在leads下創建urls.py，這裡不用path，而是用router，調用rest_framework中模組routers
，先預設化router，進行router resgister註冊要附加url路徑，哪個viewset做虛列化運算，name。

再來新稱urlpattern = router.urls。

到這邊已經有基本的CRUD的基本功能。

# error1:That port is already in use.

當我要runserver，跳出Ｅrror:That port is already in use.的訊息，因為http://127.0.0.1:8000/，這個網址原本是我上一個django專案的網址，所以port需要改成不一樣，或是要把原本的port砍掉。

我用port8080來更換，python manage.py runserver 8080來變更

# postman測試

用postman測試get，應該會跑出個[]，但是卻跑出一堆html程式碼，原來在leadmanager.urls底下的urlpatterns中，path('', include(leads.urls))要放在第一個索引，這樣lead的prls.py中router.urls才能夠順利附加上去/api/leads。

用post，記得http://localhost:8080/api/leads/，最後面要記得加/。

## 補充: IDE小問題

code在api.py的Lead底下出現紅頗浪線，訊息：Class 'Lead' has no 'objects' member。在vs code底下的setting.json物件內新增:
>"python.linting.pylintArgs": [
        "--load-plugins=pylint_django"
   ]



# 建立前端app

>python manage.py startapp frontend




