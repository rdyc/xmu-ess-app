import { IAchievementState } from './IAchievementState';
import { IAnnouncementState } from './IAnnouncementState';
import { INewsFeedState } from './INewsFeedState';

export interface IHomeState extends IAchievementState, IAnnouncementState, INewsFeedState {}