from django.db import models
from django.contrib.auth import get_user_model

import datetime


class TodoList(models.Model):
    title = models.CharField(max_length=75)
    created_by = models.ForeignKey(get_user_model(), on_delete=models.CASCADE)
    created_date = models.DateField(default=datetime.date.today)

    # Worth relates to worth assigned to each item.
    # Setting calculate_worth to true indicates the worth of the items should be calculated for review
    calculate_worth = models.BooleanField(default=False)

    def __str__(self):
        return self.title
