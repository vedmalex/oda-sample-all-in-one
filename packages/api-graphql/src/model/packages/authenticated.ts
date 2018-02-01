// tslint:disable:no-unused-variable
import { common } from 'oda-gen-graphql';
import { AuthenticatedPackage } from '../../graphql-gen/authenticated';
import { pubsub } from './../pubsub';
import { withFilter } from 'graphql-subscriptions';
const { deepMerge } = common.lib;

import { CommonExtends } from '../common';
import { Overrides } from '../override';

export class AuthenticatedSchema extends common.types.GQLModule {
  protected _name = 'AuthenticatedSchema';
  protected _extend = [
    new AuthenticatedPackage({}),
    new CommonExtends({}),
    new Overrides({}),
  ];

  public get typeDefs() {
    return `
      ${this.typeDef.join('\n  ')}

      type Viewer implements Node {
        id: ID!
        ${this.viewerEntry.join('\n  ')}
      }

      type RootQuery {
        ${this.queryEntry.join('\n  ')}
      }

      type RootMutation {
        ${this.mutationEntry.join('\n  ')}
      }

      type RootSubscription {
        ${this.subscriptionEntry.join('\n  ')}
        login: User
      }

      schema {
        query: RootQuery
        mutation: RootMutation
        subscription: RootSubscription
      }
      `;
  }

  public build() {
    super.build();
    this._resolver = deepMerge(
      this.resolver,
      this.viewer,
      {
        RootQuery: this.query,
        RootMutation: this.mutation,
        RootSubscription: deepMerge(this.subscription, {
          login: {
            subscribe: () => pubsub.asyncIterator('login'),
          },
        }),
      },
    );
  }

  public get resolvers() {
    return this.applyHooks(this.resolver);
  }
}
