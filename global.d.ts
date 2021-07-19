declare module NodeJS {
	interface Global {
		driverService: import('./driver.service').DriverService
	}
}
