import { BehaviorSubject, Observable } from 'rxjs';
import { MetadataKeyEnum } from './enums';
import { MetadataStorage } from './helpers';
import {
	NgxBaseStateDevtoolsMetadata as Metadata,
	NgxBaseStateDevtoolsConfig as Config
} from './interfaces';

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
	protected readonly _data$: BehaviorSubject<T | null>;

	constructor(private initialData: T | null = null) {
		this._data$ = new BehaviorSubject<T | null>(this.initialData);

		this.updateMetadata();
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
	 * 	Protected method for set data functionality. May be expanded.
     */
	protected setNewValue(value: T | null): void {
		this._data$.next(value);
		this.updateMetadata();
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

	private updateMetadata(): void {
		const config = MetadataStorage.get<Config>(MetadataKeyEnum.Config);

		if (config?.isEnabled) {
			const self: Object = this;
			const className = self.constructor.name;
			const metadata$ = MetadataStorage.get<BehaviorSubject<Metadata>>(MetadataKeyEnum.Data);
			const metadata = { ...metadata$.value };
			metadata[className] = this._data$.getValue();

			metadata$.next(metadata);
		}
	}
}
