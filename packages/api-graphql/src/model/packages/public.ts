// tslint:disable:no-unused-variable
import { common } from 'oda-gen-graphql';
import { PublicPackage } from '../../graphql-gen/public';
import { pubsub } from './../pubsub';
import { withFilter } from 'graphql-subscriptions';
const { deepMerge } = common.lib;

import { CommonExtends } from '../common';
import { Overrides } from '../override';

export class PublicSchema extends common.types.GQLModule {
  protected _name = 'PublicSchema';
  protected _extend = [
    new PublicPackage({}),
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
        }),
      },
    );
  }

  public get resolvers() {
    return this.applyHooks(this.resolver);
  }
}
