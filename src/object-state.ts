import { BehaviorSubject, Observable } from 'rxjs';
import { BaseState } from './base-state';

export abstract class ObjectState<T> extends BaseState<T> {}
