import RootEnv from 'jest-environment-node'
import type {Circus, Config} from '@jest/types'
import { DriverService } from './driver.service'


class MyEnv extends RootEnv {

	constructor(config: Config.ProjectConfig, context: any) {
		super(config)
		this.global.driverService = new DriverService()
	}


	async setup() {
		await this.global.driverService.setup()
		super.setup()
	}

	async teardown() {
		super.teardown()
		await this.global.driverService.teardown()
	}

	async handleTestEvent(event: Circus.AsyncEvent | Circus.SyncEvent, state: Circus.State) {
		switch (event.name) {
			case 'test_done':
				this.global.driverService.clean()
				break
			default:
				/**
				 * @privateRemarks
				 * Haven't found a good example of when this is emitted yet.
				 */
				// console.log('UNHANDLED EVENT:', event);
				break
		}
	}
}

module.exports = MyEnv
