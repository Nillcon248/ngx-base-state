import { ReplaySubject, BehaviorSubject, Observable } from 'rxjs';
import { ɵMetadataOperation } from './classes';
import { MetadataKeyEnum, ɵMetadataOperationTypeEnum } from './enums';
import { MetadataStorage } from './helpers';
import { NgxBaseStateDevtoolsConfig as Config } from './interfaces';

/**
 *	@class
 *	@classdes This is a base class that used for creating hight level state classes
 */
export abstract class BaseState<T> {
	/**
	 * 	Get Observable with state data.
     *	@return {Generic} Observable with the state data.
     */
	public get data$(): Observable<T | null> {
		return this._data$.asObservable();
	}

	/**
	 * 	Get state data.
     *	@return {Generic} State data.
     */
	public get data(): T | null {
		return this._data$.value;
	}

	/**
	 * 	Main `Observable` with state data. Must be isolated to avoid possible issues.
     *	@return {BehaviorSubject<Generic>} BehaviorSubject with state data.
     */
	private readonly _data$: BehaviorSubject<T | null>;

	constructor(private initialData: T | null = null) {
		this._data$ = new BehaviorSubject<T | null>(this.initialData);

		this.emitMetadataOperation(ɵMetadataOperationTypeEnum.Init);
	}

	/**
	 *	Set new value to state
	 */
	public set(value: T): void {
		this.setNewValue(value);
	}

	/**
	 * 	Clear state value. (Will be set `null`)
	 */
	public clear(): void {
		this.setNewValue(null);
	}

	/**
	 * 	Restore initial value from constructor.
	 */
	public restoreInitialValue(): void {
		this.setNewValue(this.initialData);
	}

	/**
	 * 	Protected method for set data functionality. May be expanded.
     */
	protected setNewValue(value: T | null): void {
		this._data$.next(value);
		this.emitMetadataOperation(ɵMetadataOperationTypeEnum.Update);
	}

	/**
	 * 	Method used for try to work out any method
     *	@return {Generic} the x value.
     */
	protected tryDoAction<V>(actionName: string, actionFunc: () => any): V | undefined {
		try {
			return actionFunc();
		} catch (error) {
			this.catchError(error as Error, actionName);

			// Quick fix of this issue 'not all code paths return a value'
			return undefined;
		}
	}

	/**
	 *	Method that	processed error for user friendly error messages
     */
	protected catchError(error: Error, actionName: string): void {
		if (error instanceof TypeError) {
			throw new Error(`Can not ${actionName}. Firstly set array.`);
		}

		throw new Error(`Error: '${error.message}' in action '${actionName}'`);
	}

	private emitMetadataOperation(type: ɵMetadataOperationTypeEnum): void {
		const config = MetadataStorage.get<Config>(MetadataKeyEnum.Config);

		if (config?.isEnabled) {
			const self: Object = this;
			const className = self.constructor.name;
			const metadataOperation = new ɵMetadataOperation(className, this.data, type);
			const operationEmitter$ = MetadataStorage.get<ReplaySubject<ɵMetadataOperation>>(MetadataKeyEnum.MetadataOperation);

			operationEmitter$.next(metadataOperation);
		}
	}
}

// FIXME: Investigate better approach
(BaseState.prototype as any)['ngOnDestroy'] = function() {
	this['emitMetadataOperation'](ɵMetadataOperationTypeEnum.Destroy);
}
