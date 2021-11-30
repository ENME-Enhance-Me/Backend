import { registerEnumType } from "@nestjs/graphql";

export enum PeopleGroupEnum {
    All = 'ALL',
    Vips = 'VIPS',
    Top10all = 'TOP10ALL',
    Top10month = 'TOP10MONTH',
    Top10week = 'TOP10WEEK'
  }
  registerEnumType(PeopleGroupEnum, {
    name: 'PeopleGroupEnum',
  });