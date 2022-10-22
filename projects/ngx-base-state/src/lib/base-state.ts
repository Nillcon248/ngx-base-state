import { Inject, Injectable, OnDestroy, Optional, inject, InjectionToken } from '@angular/core';
import { ReplaySubject, BehaviorSubject, Observable } from 'rxjs';
import { ɵInitialConfig, ɵMetadataOperation } from './interfaces';
import { ɵMetadataKeyEnum, ɵMetadataOperationTypeEnum } from './enums';
import { ɵMetadataStorage, ɵStackTrace } from './helpers';
import { NGX_BASE_STATE_DEVTOOLS_CONFIG } from './tokens';
import { ɵAction as Action } from './decorators';
import { ɵNGX_STATE_DECORATOR_METADATA_FIELD } from './constants';

const INITIAL_DATA = new InjectionToken('__NGX_BASE_STATE_INITIAL_DATA');
const INITIAL_CONFIG = new InjectionToken('__NGX_BASE_STATE_INITIAL_CONFIG');
const CLASS_ID_FIELD = '_ɵID';

/**
 *	@class
 *	@classdes This is a base class that used for creating hight level state classes
 */
@Injectable()
export abstract class BaseState<T> implements OnDestroy {
	/**
	 * 	Get `Observable` with state data.
	 *  @public
     *	@return {Generic} Observable with the state data.
     */
	public get data$(): Observable<T | null> {
		return this._data$.asObservable();
	}

	/**
	 * 	Get state data.
	 *  @public
     *	@return {Generic} State data.
     */
	public get data(): T | null {
		return this._data$.value;
	}

	/**
	 * 	Main `BehaviorSubject` with state data.
	 *  @private
     */
	private readonly _data$: BehaviorSubject<T | null>;

	private readonly _devtoolsConfig = inject(NGX_BASE_STATE_DEVTOOLS_CONFIG);
	private readonly _metadataStorage = inject(ɵMetadataStorage);

	private _currentlyInvokedAction: string | null = null;
	private _stackTraceOfCurrentlyInvokedAction: string[] | null = null;

	private get self(): Object {
		return (this as Object);
	}

	private get selfConstructor(): any {
		return this.self.constructor;
	}

	constructor(
		/** Initial data should be passed via the `super` method call. */
		@Inject(INITIAL_DATA) @Optional() protected readonly initialData: T | null = null,
		/** Initial config should be passed via the `super` method call. */
		@Inject(INITIAL_CONFIG) @Optional() private readonly initialConfig: ɵInitialConfig | null = null
	) {
		this._data$ = new BehaviorSubject(this.initialData);

		this.initClassIdIfAbsent();
		this.showConsoleWarningIfClassHaveNotDecorator();
		this.emitMetadataOperation(ɵMetadataOperationTypeEnum.Init);
	}

	/**
	 *  Base implementation of `ngOnDestroy`.
	 *  Don't forget to call `super.ngOnDestroy` in case of override.
	 *  @public
	 */
	public ngOnDestroy(): void {
		this.emitMetadataOperation(ɵMetadataOperationTypeEnum.Destroy);
	}

	/**
	 *  Set new value to state
	 *  @public
     *	@param {Generic} value - the value that should be set to update `BehaviorSubject`.
	 */
	@Action
	public set(value: T): void {
		this.setNewValue(value);
	}

	/**
	 *  Clear state value. (Will be set `null`)
	 *  @public
	 */
	@Action
	public clear(): void {
		this.setNewValue(null);
	}

	/**
	 *  Restore initial data from constructor.
	 *  @public
	 */
	@Action
	public restoreInitialData(): void {
		this.setNewValue(this.initialData);
	}

	/**
	 *  Method for set data functionality. It may be expanded.
	 *  The idea is to process the creation of new instances of complex structures.
	 *  @protected
     *	@param {Generic | null} value - the value that should be set to update `BehaviorSubject`.
	 */
	protected setNewValue(value: T | null): void {
		this._data$.next(value);
		this.emitMetadataOperation(ɵMetadataOperationTypeEnum.Update);
	}

	/**
	 * 	Method used for try to work out any method
	 *  @protected
     *	@param {string} actionName - Action you try to fire. Used to show in Error text when something went wrong.
     *	@param {Function} actionFunc - Callback with logic. When something goes wrong - Error will be created.
     *	@return {Generic} result of the callback call.
     */
	protected tryDoAction<V>(actionName: string, actionFunc: () => any): V | undefined {
		if (this._devtoolsConfig.isEnabled && !this._currentlyInvokedAction) {
			this._currentlyInvokedAction = actionName;
			this._stackTraceOfCurrentlyInvokedAction = ɵStackTrace.capture();
		}

		try {
			return actionFunc();
		} catch (error) {
			this.catchError(error as Error, actionName);

			return undefined;
		}
	}

	/**
	 *  Method that	processed error for user friendly error messages
	 *  @protected
     *	@param {Error} error - Error.
     *	@param {string} actionName - Name of the action where error happened.
	 */
	protected catchError(error: Error, actionName: string): void {
		throw new Error(`\n${this.selfConstructor.name} [${actionName}]: ${error.message}`);
	}

	private showConsoleWarningIfClassHaveNotDecorator(): void {
		const self = (this as any);

		if (this._devtoolsConfig.isEnabled && !self[ɵNGX_STATE_DECORATOR_METADATA_FIELD]) {
			console.warn(`${this.selfConstructor.name} class is missed @NgxState() decorator. Some features of DevTools will work incorrectly!`);
		}
	}

	private initClassIdIfAbsent(): void {
		if (!this.selfConstructor[CLASS_ID_FIELD]) {
			this.selfConstructor[CLASS_ID_FIELD] = Math.random();
		}
	}

	/**
	 *  Emits information about state changes into `ReplaySubject` at the `window`.
	 *  Extension use this information to visually represent current state and history of states changes.
	 *  @private
	 */
	private emitMetadataOperation(type: ɵMetadataOperationTypeEnum): void {
		if (this._devtoolsConfig.isEnabled) {
			const operationEmitter$ = this._metadataStorage
				.get<ReplaySubject<ɵMetadataOperation>>(ɵMetadataKeyEnum.MetadataOperation);

			operationEmitter$.next({
				type,
				classId: this.selfConstructor[CLASS_ID_FIELD],
				className: this.selfConstructor.name,
				classContext: this.initialConfig?.context,
				actionName: this._currentlyInvokedAction!,
				date: new Date().toJSON(),
				data: this.data,
				stackTrace: this._stackTraceOfCurrentlyInvokedAction!
			});

			this._currentlyInvokedAction = null;
			this._stackTraceOfCurrentlyInvokedAction = null;
		}
	}
}
