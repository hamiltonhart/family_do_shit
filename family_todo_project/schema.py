import graphene
import graphql_jwt
from graphene_django import DjangoObjectType

# import app schemas
import users.schema
import todo_lists.schema
import todo_items.schema


class Query(
    todo_items.schema.Query,
    todo_lists.schema.Query,
    users.schema.Query,
    graphene.ObjectType
):
    pass


class Mutation(
    todo_items.schema.Mutation,
    todo_lists.schema.Mutation,
    users.schema.Mutation,
    graphene.ObjectType
):
    token_auth = graphql_jwt.ObtainJSONWebToken.Field()
    verify_token = graphql_jwt.Verify.Field()
    refresh_token = graphql_jwt.Refresh.Field()


schema = graphene.Schema(query=Query, mutation=Mutation)
