// tslint:disable:no-unused-variable
import * as dotenv from 'dotenv';
dotenv.config({ silent: true });
import * as  path from 'path';
import { generator } from 'oda-gen-graphql';
// import * as schema from './../compiledModel.json';
import schema from './schema';
// import * as modelHooks from './model/hooks';

generator({
  pack: schema,
  // hooks: [
  //   // entities
  //   modelHooks.adapter,
  //   modelHooks.userCollectionName,
  //   // fields
  //   // fix default visibility
  //   modelHooks.accessFixEntities,
  //   modelHooks.defaultVisibility,
  //   modelHooks.dictionariesVisibility,
  //   // secure fields without default
  //   modelHooks.securityFields,
  //   modelHooks.ownerFields,
  //   // metadata
  //   modelHooks.securityAcl,
  //   modelHooks.ownerAcl,
  //   // mutations
  //   modelHooks.accessFixMutations,
  //   modelHooks.defaultMutationAccess,
  //   // id is visible by default to all
  //   modelHooks.defaultIdVisibility, // user
  //   modelHooks.userIsModerator,
  //   modelHooks.userIsAdmin,
  //   modelHooks.userIsSystem,
  // ] as any,
  rootDir: path.join(__dirname, '../src', 'graphql-gen'),
  config: {
    graphql: true,
    ts: true,
    ui: false,
    packages: ['system'],
  },
  context: {
    // typeMapper: {
    //   enums: {
    //     ItemStatus: ['ItemStatus'],
    //     ItemViewStatus: ['ItemViewStatus'],
    //     ItemOptionViewStatus: ['ItemOptionViewStatus'],
    //     ProjectType: ['ProjectType'],
    //   },
    // }
  },
  logs: ['error', 'fixable', 'warning', 'critics']
});