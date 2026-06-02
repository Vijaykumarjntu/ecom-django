from django.shortcuts import render
from django.http import JsonResponse
from rest_framework.response import Response
from rest_framework.decorators import api_view
from .models import MenuItem, Order
from .serializers import MenuItemSerializer, OrderSerializer
from rest_framework import viewsets
from rest_framework.decorators import action    
from django.db.models import Sum, F 

@api_view(['GET'])
def api_root(request):
    return JsonResponse({
        "message": "Restaurant Admin API is running!",
        "endpoints": {
            "menu": "/api/menu/",
            "orders": "/api/orders/"
        }
    })

class MenuItemViewSet(viewsets.ModelViewSet):
    queryset = MenuItem.objects.all()
    serializer_class = MenuItemSerializer
    permission_classes = []
    def get_queryset(self):
        queryset = MenuItem.objects.all()
        category = self.request.query_params.get('category', None)
        available = self.request.query_params.get('available', None)
        
        if category:
            queryset = queryset.filter(category=category)
        if available is not None:
            queryset = queryset.filter(is_available=available.lower() == 'true')
        
        return queryset
    
    # Custom action: Toggle availability of a menu item
    @action(detail=True, methods=['patch'])
    def toggle_availability(self, request, pk=None):
        menu_item = self.get_object()
        print(menu_item)
        menu_item.is_available = not menu_item.is_available
        menu_item.save()
        print(menu_item)
        return Response({
            "id": menu_item.id,
            "name": menu_item.name,
            "is_available": menu_item.is_available
        })

class OrderViewSet(viewsets.ModelViewSet):
    queryset = Order.objects.all()
    serializer_class = OrderSerializer
    permission_classes = []

    def get_queryset(self):
        queryset = Order.objects.all()
        status = self.request.query_params.get('status')
        if status:
            queryset = queryset.filter(status=status)
        return queryset.order_by('-created_at')

    def perform_create(self, serializer):
        """Automatically calculate total_amount when creating order"""
        items = serializer.validated_data.get('items', [])
        total = 0
        
        for item in items:
            total += item.get('price', 0) * item.get('quantity', 1)
        
        serializer.save(total_amount=total)

    # Custom action: Update order status (very useful for restaurant)
    @action(detail=True, methods=['patch'])
    def update_status(self, request, pk=None):
        order = self.get_object()
        new_status = request.data.get('status')
        
        if new_status in dict(Order.STATUS_CHOICES):
            order.status = new_status
            order.save()
            return Response({"message": f"Order status updated to {new_status}"})
        else:
            return Response({"error": "Invalid status"}, status=status.HTTP_400_BAD_REQUEST)
    # Custom action: Update order status (very useful for restaurant)

    @action(detail=True, methods=['patch'])
    def update_customer(self, request, pk=None):
        order = self.get_object()
        new_name = request.data.get('name')
        
        if new_name:
            order.customer_name = new_name 
            order.save()
            return Response({"message": f"Order customer name changed to{new_name}"})
        else:
            return Response({"error": "Invalid name"}, status=400)