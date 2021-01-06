from .settings import * # 含入原本的settings.py所有設定

import dj_database_url

# heroku使用的資料庫為PostgreSQL，所以要修改資料庫設定
DATABASES = {
    'default': dj_database_url.config(),
}

# Static asset configuration.
# 設定網站正式上線時靜態檔案目錄位置
STATIC_ROOT = os.path.join(BASE_DIR, 'frontend/static')

# Honor the 'X-Forwarded-Proto' header for request.is_secure().
# 設定HTTP連線方式
SECURE_PROXY_SSL_HEADER = ('HTTP_X_FORWARDED_PROTO', 'https')

# Allow all host headers.
# 讓所有的網域都能瀏覽本網站
ALLOWED_HOSTS = ['*']

# Turn off DEBUG mode.
# 關閉除錯模式
DEBUG = False