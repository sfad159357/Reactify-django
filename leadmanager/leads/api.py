from .models import Lead
from rest_framework import viewsets, permissions
from .serializers import LeadSerializer

# Lead viewsets，在功能上來看，擁有full crud api, create, retrieve, update, delete


class LeadViewSet(viewsets.ModelViewSet):
    # queryset = Lead.objects.all()
    permission_classes = [
        # permissions.AllowAny
        permissions.IsAuthenticated
        # 當進入網頁時，終端機和console噴403
    ]

    serializer_class = LeadSerializer

    # 只會提供給屬於user自己的leads的物件，不會是全部的leads
    def get_queryset(self):
        return self.request.user.leads.all()

    # 這個方法當create lead時，讓我們可以儲存lead owner
    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)
