import { IAchievementState } from './IAchievementState';
import { IAnnouncementState } from './IAnnouncementState';
import { INewsFeedState } from './INewsFeedState';
import { ISliderState } from './ISliderState';

export interface IHomeState extends IAchievementState, IAnnouncementState, INewsFeedState, ISliderState {}