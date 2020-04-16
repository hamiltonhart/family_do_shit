import graphene
import datetime
from graphene_django import DjangoObjectType
from graphql import GraphQLError
from graphql_jwt.decorators import login_required, superuser_required

from .models import TodoItem
from todo_lists.models import TodoList

# Queries


class TodoItemType(DjangoObjectType):
    is_completed = graphene.Boolean()

    class Meta:
        model = TodoItem


class Query(graphene.ObjectType):
    todo_items = graphene.List(TodoItemType)
    todo_item = graphene.Field(TodoItemType, id=graphene.Int(required=True))

    def resolve_todo_items(self, info):
        return TodoItem.objects.all()

    def resolve_todo_item(self, info, id):
        try:
            return TodoItem.objects.get(id=id)
        except:
            return GraphQLError("A valid TodoItem ID was not provided.")

# Mutations


class CreateTodoItem(graphene.Mutation):
    todo_item = graphene.Field(TodoItemType)

    class Arguments:
        item_name = graphene.String(required=True)
        todo_list_id = graphene.Int(required=True)
        item_worth = graphene.Int()

    @login_required
    def mutate(self, info, item_name, todo_list_id, item_worth=1):
        user = info.context.user
        if user.is_anonymous:
            raise GraphQLError("Login to create a Todo Item.")

        try:
            todo_list = TodoList.objects.get(id=todo_list_id)
        except:
            GraphQLError("Must specify a TodoList ID.")

        todo_item = TodoItem(item_name=item_name, todo_list=todo_list,
                             created_by=user, item_worth=item_worth)
        todo_item.save()
        return CreateTodoItem(todo_item=todo_item)


class UpdateTodoItem(graphene.Mutation):
    todo_item = graphene.Field(TodoItemType)

    class Arguments:
        id = graphene.Int(required=True)
        title = graphene.String()
        todo_list_id = graphene.Int()
        item_worth = graphene.Int()

    @login_required
    def mutate(self, info, id, title=None, todo_list_id=None, item_worth=None):
        try:
            todo_item = TodoItem.objects.get(id=id)
        except:
            raise GraphQLError("A valid Todo Item ID was not provided.")

        user = info.context.user
        if user.is_anonymous:
            raise GraphQLError("Must be logged in to edit a Todo Item.")

        if title:
            todo_item.title = title
        if todo_list_id:
            try:
                todo_list = TodoList.objects.get(id=todo_list_id)
            except:
                GraphQLError(f"{todo_list_id} is not a valid Todo List ID.")
        if item_worth:
            todo_item.item_worth = item_worth

        todo_item.save()
        return UpdateTodoItem(todo_item=todo_item)


class DeleteTodoItem(graphene.Mutation):
    id = graphene.Int()

    class Arguments:
        id = graphene.Int(required=True)

    @login_required
    def mutate(self, info, id):
        try:
            todo_item = TodoItem.objects.get(id=id)
        except:
            raise GraphQLError("A valid Todo Item ID was not provided.")

        todo_item.delete()
        return DeleteTodoItem(id=id)


class MarkTodoItemCompleteIncomplete(graphene.Mutation):
    todo_item = graphene.Field(TodoItemType)

    class Arguments:
        id = graphene.Int(required=True)

    @login_required
    def mutate(self, info, id):
        try:
            todo_item = TodoItem.objects.get(id=id)
        except:
            GraphQLError("A valid Todo Item ID was not provided.")

        user = info.context.user
        if user.is_anonymous:
            raise GraphQLError(
                "Must be logged in to mark and item complete or incomplete.")

        if todo_item.completed_by and todo_item.completed_date:
            todo_item.completed_by = None
            todo_item.completed_date = None
        elif not todo_item.completed_by and not todo_item.completed_date:
            todo_item.completed_by = user
            todo_item.completed_date = datetime.date.today

        todo_item.save()
        return MarkTodoItemCompleteIncomplete(todo_item=todo_item)


class Mutation(graphene.ObjectType):
    create_todo_item = CreateTodoItem.Field()
    update_todo_item = UpdateTodoItem.Field()
    delete_todo_item = DeleteTodoItem.Field()
    mark_todo_item_complete_incomplete = MarkTodoItemCompleteIncomplete.Field()
