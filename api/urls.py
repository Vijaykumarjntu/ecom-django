from django.urls import path,include 
from rest_framework.routers import DefaultRouter
from .views import MenuItemViewSet,OrderViewSet,api_root

router = DefaultRouter()
router.register(r'menu', MenuItemViewSet,basename="menu")
router.register(r'orders', OrderViewSet,basename="order")


urlpatterns = [
    # We'll add the actual paths in Step 7
    path('', api_root, name='api-root'),   # temporary
    path('', include(router.urls)),
]