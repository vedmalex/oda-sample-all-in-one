// tslint:disable:no-unused-variable
import * as dotenv from 'dotenv';
dotenv.config({ silent: true });
import * as  path from 'path';
import { validate } from 'oda-gen-graphql';
// import * as schema from './../compiledModel.json';
import schema from './schema';
import * as modelHooks from './model/hooks';

validate({
  pack: schema,
  rootDir: path.join(__dirname, '../src', 'graphql-gen'),
  hooks: [
    // entities
    modelHooks.adapter,
    // fields
    // fix default visibility
    modelHooks.accessFixEntities,
    modelHooks.defaultVisibility,
    modelHooks.linkEntitiesVisibility,
    // secure fields without default
    modelHooks.securityFields,
    modelHooks.ownerFields,
    // metadata
    modelHooks.securityAcl,
    modelHooks.ownerAcl,
    // mutations
    modelHooks.accessFixMutations,
    modelHooks.defaultMutationAccess,
    // id is visible by default to all
    modelHooks.defaultIdVisibility, // user
    modelHooks.publicVisibility, // public
  ] as any,
  config: {
    graphql: true,
    ts: true,
    ui: false,
    packages: true, ///['system'],
  },
  context: {
    typeMapper: {
      enums: {
        ItemStatus: ['ItemStatus'],
        ItemViewStatus: ['ItemViewStatus'],
        ItemOptionViewStatus: ['ItemOptionViewStatus'],
        ProjectType: ['ProjectType'],
      },
    }
  },
  logs: ['error', 'fixable', 'warning', 'critics']
  // acl: {
  //   system: 1000,
  //   all: 100,
  // }
});
