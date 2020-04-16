from django.db import models
from django.contrib.auth import get_user_model

import datetime

from todo_lists.models import TodoList


class TodoItem(models.Model):
    item_name = models.CharField(max_length=100)
    todo_list = models.ForeignKey(
        TodoList, on_delete=models.CASCADE, related_name="todo_items")
    item_worth = models.IntegerField(default=1)
    created_by = models.ForeignKey(
        get_user_model(), on_delete=models.CASCADE, related_name="created_items")
    created_date = models.DateField(default=datetime.date.today)
    completed_by = models.ForeignKey(
        get_user_model(), on_delete=models.CASCADE, related_name="completed_items", null=True)
    completed_date = models.DateField(null=True)

    def __str__(self):
        return self.item_name

    @property
    def is_completed(self):
        if not self.completed_by and not self.completed_date:
            return False
        else:
            return True
