import graphene
from graphene_django import DjangoObjectType
from graphql import GraphQLError
from graphql_jwt.decorators import login_required, superuser_required

from .models import TodoList

# Queries


class TodoListType(DjangoObjectType):
    class Meta:
        model = TodoList


class Query(graphene.ObjectType):
    todo_lists = graphene.List(TodoListType)
    todo_list = graphene.Field(TodoListType, id=graphene.Int(required=True))

    def resolve_todo_lists(self, info):
        return TodoList.objects.all()

    def resolve_todo_list(self, info, id):
        try:
            return TodoList.objects.get(id=id)
        except:
            return GraphQLError("A valid TodoList ID was not provided.")

# Mutations


class CreateTodoList(graphene.Mutation):
    todo_list = graphene.Field(TodoListType)

    class Arguments:
        title = graphene.String(required=True)
        calculate_worth = graphene.Boolean()

    @login_required
    def mutate(self, info, title, calculate_worth=False):
        user = info.context.user
        if user.is_anonymous:
            raise GraphQLError("Login to create a Todo List.")
        todo_list = TodoList(title=title, created_by=user,
                             calculate_worth=calculate_worth)
        todo_list.save()
        return CreateTodoList(todo_list=todo_list)


class UpdateTodoList(graphene.Mutation):
    todo_list = graphene.Field(TodoListType)

    class Arguments:
        id = graphene.Int(required=True)
        title = graphene.String(required=True)
        calculate_worth = graphene.Boolean()

    @login_required
    def mutate(self, info, id, title, calculate_worth=None):
        try:
            todo_list = TodoList.objects.get(id=id)
        except:
            raise GraphQLError("A valid Todo List ID was not provided.")

        todo_list.title = title

        if calculate_worth != None:
            todo_list.calculate_worth = calculate_worth

        todo_list.save()
        return UpdateTodoList(todo_list=todo_list)


class DeleteTodoList(graphene.Mutation):
    id = graphene.Int()

    class Arguments:
        id = graphene.Int(required=True)

    @login_required
    def mutate(self, info, id):
        try:
            todo_list = TodoList.objects.get(id=id)
        except:
            raise GraphQLError("A valid Todo List ID was not provided.")

        todo_list.delete()
        return DeleteTodoList(id=id)


class Mutation(graphene.ObjectType):
    create_todo_list = CreateTodoList.Field()
    update_todo_list = UpdateTodoList.Field()
    delete_todo_list = DeleteTodoList.Field()
